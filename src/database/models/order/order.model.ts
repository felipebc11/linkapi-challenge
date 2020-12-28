import mongoose from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new mongoose.Schema({
  date: String,
  orderQuantity: Number,
  salesValue: Number
});

const orderModel = mongoose.model<Order & mongoose.Document>(
  'Order',
  orderSchema
);
export default orderModel;
