import { config } from 'dotenv';
config({ path: ['.env.local', '.env'] });

interface Env {
  PORT: number;
  BASE_API: string;
  DB_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const getEnv = (): Env => {
  const { DB_URL, JWT_SECRET } = process.env;

  const PORT = process.env.PORT || '5500';
  const BASE_API = process.env.BASE_API || '/api/v1';
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

  if (!DB_URL) throw new Error('DB_URL is not defined in .env');
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in .env');

  return {
    BASE_API,
    DB_URL,
    PORT: parseInt(PORT, 10),
    JWT_SECRET,
    JWT_EXPIRES_IN,
  };
};

export const { PORT, BASE_API, DB_URL, JWT_SECRET, JWT_EXPIRES_IN } = getEnv();
