import axios from 'axios';

import { generateOrderXML } from './generate-order-xml';
import { WonDeals } from '../pipedrive/won-deals.interface';
import orderModel from '../../database/models/order/order.model';

export class BlingService {
  private apiKey = process.env.BLING_API_API_KEY;
  private order = orderModel;

  public async createOrders(wonDeals: WonDeals[]): Promise<boolean> {
    for (const wonDeal of wonDeals) {
      const apiURL = `https://bling.com.br/Api/v2/pedido/json?apikey=${
        this.apiKey
      }&xml=${generateOrderXML(wonDeal.title, wonDeal.date)}`;
      const response = await axios.post(`${apiURL}`, {
        headers: {
          Accept: 'application/json'
        }
      });
      if (response.data.retorno.pedidos) {
        this.updateOrdersReport(wonDeal);
      }
    }
    return true;
  }

  private async updateOrdersReport(wonDeal: WonDeals) {
    try {
      await this.order.findOneAndUpdate(
        { date: wonDeal.date },
        [
          {
            $set: {
              salesValue: { $sum: ['$salesValue', wonDeal.salesValue] },
              orderQuantity: {
                $sum: ['$orderQuantity', 1]
              }
            }
          }
        ],
        {
          new: true,
          upsert: true
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
