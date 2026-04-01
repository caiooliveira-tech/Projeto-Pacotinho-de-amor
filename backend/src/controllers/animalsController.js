const db = require('../config/database');
const path = require('path');
const fs = require('fs');

// GET /api/animals - Listar animais (público, com filtros)
const getAll = async (req, res) => {
  try {
    const {
      species, gender, size, status = 'disponivel',
      page = 1, limit = 12, featured,
    } = req.query;

    const conditions = [];
    const params = [];

    if (status && status !== 'todos') {
      conditions.push('status = ?');
      params.push(status);
    }
    if (species) { conditions.push('species = ?'); params.push(species); }
    if (gender) { conditions.push('gender = ?'); params.push(gender); }
    if (size) { conditions.push('size = ?'); params.push(size); }
    if (featured) { conditions.push('featured = 1'); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const [rows] = await db.execute(
      `SELECT * FROM animals ${where} ORDER BY featured DESC, created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM animals ${where}`,
      params
    );

    res.json({ data: rows, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais.' });
  }
};

// GET /api/animals/:id - Detalhes de um animal
const getById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Animal não encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar animal.' });
  }
};

// POST /api/animals - Cadastrar animal (admin)
const create = async (req, res) => {
  try {
    const {
      name, species, gender, size, age_years, age_months, age_label,
      breed, color, vaccinated, neutered, dewormed, microchipped,
      description, personality, special_needs, location, status, featured,
    } = req.body;

    if (!name || !species || !gender) {
      return res.status(400).json({ error: 'Nome, espécie e gênero são obrigatórios.' });
    }

    const photo_main = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.execute(
      `INSERT INTO animals
        (name, species, gender, size, age_years, age_months, age_label,
         breed, color, vaccinated, neutered, dewormed, microchipped,
         description, personality, special_needs, location, status, featured, photo_main)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name, species, gender, size || null,
        age_years || null, age_months || null, age_label || null,
        breed || null, color || null,
        vaccinated ? 1 : 0, neutered ? 1 : 0, dewormed ? 1 : 0, microchipped ? 1 : 0,
        description || null, personality || null, special_needs || null,
        location || null, status || 'disponivel', featured ? 1 : 0, photo_main,
      ]
    );

    const [animal] = await db.execute('SELECT * FROM animals WHERE id = ?', [result.insertId]);
    res.status(201).json(animal[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar animal.' });
  }
};

// PUT /api/animals/:id - Atualizar animal (admin)
const update = async (req, res) => {
  try {
    const {
      name, species, gender, size, age_years, age_months, age_label,
      breed, color, vaccinated, neutered, dewormed, microchipped,
      description, personality, special_needs, location, status, featured, adoption_date,
    } = req.body;

    const [existing] = await db.execute('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Animal não encontrado.' });

    let photo_main = existing[0].photo_main;
    if (req.file) {
      // Remove foto antiga
      if (photo_main) {
        const oldPath = path.join(__dirname, '../../', photo_main);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      photo_main = `/uploads/${req.file.filename}`;
    }

    await db.execute(
      `UPDATE animals SET
        name=?, species=?, gender=?, size=?, age_years=?, age_months=?, age_label=?,
        breed=?, color=?, vaccinated=?, neutered=?, dewormed=?, microchipped=?,
        description=?, personality=?, special_needs=?, location=?, status=?,
        featured=?, photo_main=?, adoption_date=?
       WHERE id=?`,
      [
        name, species, gender, size || null,
        age_years || null, age_months || null, age_label || null,
        breed || null, color || null,
        vaccinated ? 1 : 0, neutered ? 1 : 0, dewormed ? 1 : 0, microchipped ? 1 : 0,
        description || null, personality || null, special_needs || null,
        location || null, status || 'disponivel', featured ? 1 : 0,
        photo_main, adoption_date || null, req.params.id,
      ]
    );

    const [updated] = await db.execute('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar animal.' });
  }
};

// DELETE /api/animals/:id - Remover animal (admin)
const remove = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Animal não encontrado.' });

    if (rows[0].photo_main) {
      const filePath = path.join(__dirname, '../../', rows[0].photo_main);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.execute('DELETE FROM animals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Animal removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover animal.' });
  }
};

// GET /api/animals/stats - Estatísticas (público)
const getStats = async (req, res) => {
  try {
    const [[{ disponivel }]] = await db.execute(
      "SELECT COUNT(*) as disponivel FROM animals WHERE status = 'disponivel'"
    );
    const [[{ adotados }]] = await db.execute(
      "SELECT COUNT(*) as adotados FROM animals WHERE status = 'adotado'"
    );
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM animals');
    res.json({ disponivel, adotados, total, historico: 1700 });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
};

module.exports = { getAll, getById, create, update, remove, getStats };
