import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    messageU: {
      type: String,
      required: [true, "messageU is required"],
      trim: true,
      lowercase: true,
    },
    messageA: {
      type: String,
      required: [true, "messageA is required"],
      trim: true,
      lowercase: true,
    },
    red: {
      type: Number,
    },
    isUser: {
      type: Number,
    },
      userName: {
          type: String,
          required: [true, "userName is required"],
          trim: true,
          lowercase: true,
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Message = model("message", messageSchema);
