import mongoose, { Schema, models, model } from "mongoose";

export interface ISubscriber {
  email: string;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true },
);

export const SubscriberModel =
  models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);
