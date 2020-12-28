import { cleanEnv, port, str } from 'envalid';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

export function validateEnv() {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port()
  });
}
