import { createPool } from "mysql2/promise";

// Crea la piscina de conexiones
export const pool = createPool({
  /* Configuración de tu base de datos: host, usuario, contraseña, etc. */
    host: process.env.DB_HOST ||'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password:process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tasksbd',
});