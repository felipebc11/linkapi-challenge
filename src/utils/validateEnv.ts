import { cleanEnv, port, str } from 'envalid';
import path from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../config/.env') });

export function validateEnv(): void {
  cleanEnv(process.env, {
    API_TOKEN_PIPEDRIVE: str(),
    BLING_API_API_KEY: str(),
    BLING_API_ENDPOINT: str(),
    JWT_SECRET: str(),
    PIPEDRIVE_API_ENDPOINT: str(),
    MONGO_URI: str(),
    PORT: port()
  });
}
