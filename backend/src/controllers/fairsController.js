const db = require('../config/database');
const path = require('path');
const fs = require('fs');

// GET /api/fairs - Listar feirinhas (público)
const getAll = async (req, res) => {
  try {
    const { status, upcoming } = req.query;

    const conditions = [];
    const params = [];

    if (status) { conditions.push('status = ?'); params.push(status); }
    if (upcoming === 'true') {
      conditions.push("date >= CURDATE() AND status = 'agendada'");
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [rows] = await db.execute(
      `SELECT * FROM fairs ${where} ORDER BY date DESC`,
      params
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar feirinhas.' });
  }
};

// GET /api/fairs/:id - Detalhes de uma feirinha
const getById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM fairs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Feirinha não encontrada.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar feirinha.' });
  }
};

// POST /api/fairs - Cadastrar feirinha (admin)
const create = async (req, res) => {
  try {
    const {
      title, description, date, start_time, end_time,
      location_name, address, city, state, maps_link, status,
    } = req.body;

    if (!title || !date || !start_time || !location_name) {
      return res.status(400).json({ error: 'Título, data, horário e local são obrigatórios.' });
    }

    const cover_photo = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.execute(
      `INSERT INTO fairs
        (title, description, date, start_time, end_time,
         location_name, address, city, state, maps_link, status, cover_photo)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        title, description || null, date, start_time, end_time || null,
        location_name, address || null, city || null, state || null,
        maps_link || null, status || 'agendada', cover_photo,
      ]
    );

    const [fair] = await db.execute('SELECT * FROM fairs WHERE id = ?', [result.insertId]);
    res.status(201).json(fair[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar feirinha.' });
  }
};

// PUT /api/fairs/:id - Atualizar feirinha (admin)
const update = async (req, res) => {
  try {
    const {
      title, description, date, start_time, end_time,
      location_name, address, city, state, maps_link, status,
    } = req.body;

    const [existing] = await db.execute('SELECT * FROM fairs WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Feirinha não encontrada.' });

    let cover_photo = existing[0].cover_photo;
    if (req.file) {
      if (cover_photo) {
        const oldPath = path.join(__dirname, '../../', cover_photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      cover_photo = `/uploads/${req.file.filename}`;
    }

    await db.execute(
      `UPDATE fairs SET
        title=?, description=?, date=?, start_time=?, end_time=?,
        location_name=?, address=?, city=?, state=?, maps_link=?, status=?, cover_photo=?
       WHERE id=?`,
      [
        title, description || null, date, start_time, end_time || null,
        location_name, address || null, city || null, state || null,
        maps_link || null, status || 'agendada', cover_photo, req.params.id,
      ]
    );

    const [updated] = await db.execute('SELECT * FROM fairs WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar feirinha.' });
  }
};

// DELETE /api/fairs/:id - Remover feirinha (admin)
const remove = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM fairs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Feirinha não encontrada.' });

    if (rows[0].cover_photo) {
      const filePath = path.join(__dirname, '../../', rows[0].cover_photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.execute('DELETE FROM fairs WHERE id = ?', [req.params.id]);
    res.json({ message: 'Feirinha removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover feirinha.' });
  }
};

module.exports = { getAll, getById, create, update, remove };
