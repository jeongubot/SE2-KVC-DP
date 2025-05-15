const mysql = require("mysql2/promise");
require("dotenv").config();
const { URL } = require("url");

if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set in environment variables.");
    process.exit(1);
}

const dbUrl = new URL(process.env.DATABASE_URL);

const db = mysql.createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    port: dbUrl.port || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true
    }
});

console.log("Database Config:", {
    host: dbUrl.hostname,
    user: dbUrl.username,
    database: dbUrl.pathname.slice(1)
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ Successfully connected to MySQL database.");
        connection.release();
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
})();

module.exports = db;
