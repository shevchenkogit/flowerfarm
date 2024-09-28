import { Schema, model } from "mongoose";

const returnerSchema = new Schema({
  value: { type: Object },
  image: { type: String },
});

export const ReturnerModel = model("returner", returnerSchema);
