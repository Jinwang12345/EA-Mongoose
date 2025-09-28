import { Schema, Types, model } from "mongoose";

export interface IOrder {
  userId: string | Types.ObjectId;     
  product: string;
  qty: number;
  price: number;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: String,
  qty: Number,
  price: Number,
});

export const OrderModel = model<IOrder>("Order", orderSchema);
