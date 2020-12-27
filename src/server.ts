import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import { App } from './app';
import { MainController } from './api-routes/main.controller';

validateEnv();

const app = new App([new MainController()]);

app.listen();
