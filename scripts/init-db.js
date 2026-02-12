const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Manually load .env
const envPath = path.join(__dirname, '..', '.env');
console.log('Loading .env from:', envPath);
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2 && !line.trim().startsWith('#')) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            process.env[key] = value;
        }
    });
    console.log('Environment variables loaded manually.');
} catch (e) {
    console.error('Failed to load .env file:', e);
}

async function initDb() {
    console.log('Debug: Checking environment variables...');
    console.log('Host:', process.env.MYSQL_HOST);
    console.log('Port:', process.env.MYSQL_PORT);
    console.log('User:', process.env.MYSQL_USER);
    console.log('Database:', process.env.MYSQL_DATABASE);

    if (!process.env.MYSQL_HOST) {
        console.error('Error: MYSQL_HOST is not defined.');
        process.exit(1);
    }

    console.log('Connecting to database...');
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || '3306'),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            multipleStatements: true,
            connectTimeout: 20000
        });

        console.log('Connected! Reading schema...');
        const schemaPath = path.join(__dirname, '..', 'src', 'lib', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await connection.query(schema);

        console.log('Database initialized successfully!');
        await connection.end();
    } catch (err) {
        console.error('Database initialization failed:', err);
        process.exit(1);
    }
}

initDb();
