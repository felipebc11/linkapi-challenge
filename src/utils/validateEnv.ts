import { cleanEnv, port, str } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port()
  });
}
