import { Schema, model } from "mongoose";

const plantsSchema = new Schema(
  {
    PlantName: { type: String, require: true, trim: true, lowercase: true },
    PlantSub: { type: String, require: true, trim: true, lowercase: true },
    about: { type: String },
    price: { type: Number, require: true },
    fullImage: { type: String },
    cropImage: { type: String },
    forSell: { type: String },
    noOnStorage: { type: Number },
  },
  { timestamps: true }
);

export const Plants = model("Plants", plantsSchema);
