import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface DbConfig {
  user: string | undefined;
  host: string | undefined;
  database: string | undefined;
  password: string | undefined;
  port: number | undefined;
}


const dbConfig: DbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, // Convert string to number
};

const client = new Client(dbConfig);

client.connect()
  .then(() => console.log('Connected to the database ⚡⚡⚡'))
  .catch(err => console.error('🚫 Database connection error:', err.stack));

export default client;
