import { config } from 'dotenv';
config({ path: ['.env.local', '.env'] });
export const { PORT, DB_URL } = process.env;
