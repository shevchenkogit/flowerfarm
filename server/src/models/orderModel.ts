import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: String },
    city: { type: String },
    adress: { type: String },
    deliveryMethod: { type: String },
    payMethod: { type: String },
    personWhoOrder: { type: Object },
    personWhoWillTAke: { type: Object },
    order: { type: Object },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Order = model("Orders", orderSchema);
