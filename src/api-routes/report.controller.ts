import express from 'express';
import { Report } from '../report/report';

export class ReportController {
  public path = '/report';
  public router = express.Router();
  private report = new Report();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll);
  }

  private getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const report = await this.report.fetchReport();
    response.send(report);
  };
}
