import { model, Schema, Types } from "mongoose";

import { AdminTable } from "./adminModel";

const tokensAdminSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: AdminTable,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const TokenAdmin = model("tokenAdmin", tokensAdminSchema);
