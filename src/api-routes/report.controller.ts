import express from 'express';
import passport from 'passport';

import { Report } from '../report/report';

export class ReportController {
  public path = '/report';
  public router = express.Router();
  private report = new Report();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      this.path,
      passport.authenticate('jwt', { session: false }),
      this.getAll
    );
  }

  private getAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const report = await this.report.fetchReport();
      response.send(report);
    } catch (error) {
      console.log('Database error', error);
      return response.status(403).send({ error: 'request failed' });
    }
  };
}
