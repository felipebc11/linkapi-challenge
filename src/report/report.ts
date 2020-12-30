import orderModel from '../database/models/order/order.model';

export class Report {
  private order = orderModel;

  public async fetchReport() {
    return await this.order.find().limit(365);
  }
}
