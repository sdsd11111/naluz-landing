const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manually load .env
const envPath = path.join(__dirname, '..', '.env');
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        if (line.includes('=')) {
            const [key, value] = line.split('=');
            process.env[key.trim()] = value.trim();
        }
    });
} catch (error) {
    console.error('Error loading .env file:', error);
    process.exit(1);
}

async function migrate() {
    console.log('Connecting to database for migration...');
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || '3306', 10),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    try {
        console.log('Adding image_filename column...');
        await connection.execute('ALTER TABLE announcements ADD COLUMN image_filename VARCHAR(255) AFTER description');
        console.log('Migration successful: image_filename column added.');
    } catch (error) {
        if (error.code === 'ER_DUP_COLUMN') {
            console.log('Column image_filename already exists.');
        } else {
            console.error('Migration failed:', error);
        }
    } finally {
        await connection.end();
    }
}

migrate();
