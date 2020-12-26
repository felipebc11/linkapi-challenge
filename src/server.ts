import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import { App } from './app';

validateEnv();

const app = new App([]);

app.listen();
