import { model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "UserName is required"],
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const AdminTable = model("adminTable", adminSchema);
