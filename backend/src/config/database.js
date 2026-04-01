const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'pacotinho_de_amor',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Banco de dados conectado com sucesso!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no banco de dados:', err.message);
  });

module.exports = pool;
