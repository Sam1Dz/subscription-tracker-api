import { config } from 'dotenv';
config({ path: ['.env.local', '.env'] });

interface Env {
  PORT: number;
  BASE_URL: string;
  DB_URL: string;
}

const getEnv = (): Env => {
  const { PORT, BASE_URL, DB_URL } = process.env;

  if (!PORT) throw new Error('PORT is not defined in .env');
  if (!BASE_URL) throw new Error('BASE_URL is not defined in .env');
  if (!DB_URL) throw new Error('DB_URL is not defined in .env');

  return { BASE_URL, DB_URL, PORT: parseInt(PORT, 10) };
};

export const { PORT, BASE_URL, DB_URL } = getEnv();
