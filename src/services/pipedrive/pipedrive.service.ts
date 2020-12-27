import axios from 'axios';
import { WonDeals } from './won-deals.interface';

export class PipedriveService {
  private apiEndpoint = process.env.PIPEDRIVE_API_ENDPOINT;
  private token = process.env.API_TOKEN_PIPEDRIVE;
  private url =
    `${this.apiEndpoint}/deals?status=won&start=0&api_token=` + this.token;

  public async getWonDeals(): Promise<WonDeals[]> {
    const response = await axios.get(this.url, {
      headers: {
        Accept: 'application/json'
      }
    });
    let wonDeals: WonDeals[] = [];
    if (response.data.success == true && response.data.data) {
      wonDeals = this.clearWonDeals(response.data.data);
      return wonDeals;
    }
    return wonDeals;
  }

  private clearWonDeals(wonDeals: any[]): WonDeals[] {
    const clearedWonDeals: WonDeals[] = [];
    wonDeals.map((deal: any) => {
      clearedWonDeals.push({
        title: deal['title'],
        date: deal['close_time']
      });
    });
    return clearedWonDeals;
  }
}
