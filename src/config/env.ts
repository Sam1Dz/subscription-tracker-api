import { config } from 'dotenv';
config({ path: ['.env.local', '.env'] });

export const { PORT, BASE_URL, DB_URL } = process.env;
