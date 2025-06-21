import mysql from 'mysql2/promise';

// Puedes usar variables de entorno para mayor seguridad
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'control-nomina-db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { db };
