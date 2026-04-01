const db = require('../config/database');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM success_stories WHERE active = 1 ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar histórias.' });
  }
};

const create = async (req, res) => {
  try {
    const { adopter_name, animal_name, animal_id, story, adoption_date } = req.body;
    if (!adopter_name || !animal_name || !story) {
      return res.status(400).json({ error: 'Nome do adotante, animal e história são obrigatórios.' });
    }
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await db.execute(
      'INSERT INTO success_stories (adopter_name, animal_name, animal_id, story, photo, adoption_date) VALUES (?,?,?,?,?,?)',
      [adopter_name, animal_name, animal_id || null, story, photo, adoption_date || null]
    );
    const [row] = await db.execute('SELECT * FROM success_stories WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar história.' });
  }
};

const update = async (req, res) => {
  try {
    const { adopter_name, animal_name, animal_id, story, adoption_date, active } = req.body;
    const [existing] = await db.execute('SELECT * FROM success_stories WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'História não encontrada.' });
    const photo = req.file ? `/uploads/${req.file.filename}` : existing[0].photo;
    await db.execute(
      'UPDATE success_stories SET adopter_name=?, animal_name=?, animal_id=?, story=?, photo=?, adoption_date=?, active=? WHERE id=?',
      [adopter_name, animal_name, animal_id || null, story, photo, adoption_date || null, active !== undefined ? active : 1, req.params.id]
    );
    const [updated] = await db.execute('SELECT * FROM success_stories WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar história.' });
  }
};

const remove = async (req, res) => {
  try {
    await db.execute('DELETE FROM success_stories WHERE id = ?', [req.params.id]);
    res.json({ message: 'História removida.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover história.' });
  }
};

module.exports = { getAll, create, update, remove };
