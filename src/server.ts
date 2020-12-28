import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import { App } from './app';
import { ReportController } from './api-routes/report.controller';

validateEnv();

const app = new App([new ReportController()]);

app.listen();
