import express from 'express';
import { PipedriveService } from '../services/pipedrive/pipedrive.service';

export class MainController {
  public path = '/';
  public router = express.Router();
  private pipeDriveService = new PipedriveService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.runQuest);
  }

  private runQuest = async (
    request: express.Request,
    response: express.Response
  ) => {
    const res = await this.pipeDriveService.getWonDeals();
    response.send(res);
  };
}
