import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import Compression from 'compression';
import { CronJob } from 'cron';

import { Controller } from './interfaces/controller.interface';
import { PipedriveService } from './services/pipedrive/pipedrive.service';
import { BlingService } from './services/bling/bling.service';
import './auth/auth';

export class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initatilizeMiddlewares();
    this.initatilizeControllers(controllers);
    this.initializeCronRoutine();
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initatilizeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(Compression());
  }

  private initatilizeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeCronRoutine() {
    const pipedriveService = new PipedriveService();
    const blingService = new BlingService();
    const cronJob = new CronJob(
      '1 * * * * *',
      async () => {
        console.log('running cron routine');
        const wonDeals = await pipedriveService.getWonDeals();
        await blingService.createOrders(wonDeals);
      },
      null,
      true,
      'America/Sao_Paulo'
    );
  }

  private connectToTheDatabase() {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(`${MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
}
