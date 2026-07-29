import mongoose, { Schema, models, model } from "mongoose";

export interface IOrderItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  stripeSessionId: string;
  email?: string;
  items: IOrderItem[];
  amountTotal: number;
  currency: string;
  status: "pending" | "paid" | "failed";
}

const OrderSchema = new Schema<IOrder>(
  {
    stripeSessionId: { type: String, required: true, unique: true, index: true },
    email: String,
    items: [
      {
        slug: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    amountTotal: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const OrderModel = models.Order || model<IOrder>("Order", OrderSchema);
