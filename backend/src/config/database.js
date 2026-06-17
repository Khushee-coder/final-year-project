const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    connectTimeout: 10000, // IMPORTANT

    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});

const promisePool = pool.promise();

// TEST CONNECTION ON START (IMPORTANT DEBUG)
promisePool.getConnection()
    .then(conn => {
        console.log("✅ DB CONNECTED SUCCESSFULLY");
        conn.release();
    })
    .catch(err => {
        console.error("❌ DB CONNECTION FAILED:", err.message);
    });

module.exports = promisePool;