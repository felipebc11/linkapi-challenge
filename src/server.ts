import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';

import { App } from './app';
import { ReportController } from './api-routes/report.controller';
import { UserController } from './api-routes/user.controller';

validateEnv();

const app = new App([new ReportController(), new UserController()]);

app.listen();
