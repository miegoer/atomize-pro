const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'atomizedb',
  password: 'admin',
  port: 5432,
});

client.connect()
    .then(() => console.log('Connected to the database ⚡⚡⚡'))
    .catch(err => console.error('🚫 Database connection error:', err.stack));

module.exports = client;

// NOTE: Complete. Just need to create database.