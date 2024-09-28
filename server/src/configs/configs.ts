import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL || "j",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "a",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "b",

  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

  BUCKET_GOOGLE_SERVICE_NAME: process.env.BUCKET_GOOGLE_SERVICE_NAME,
  BUCKET_GOOGLE_SERVICE_FILE: process.env.BUCKET_GOOGLE_SERVICE_FILE,
  GOOGLE_URL_FOR_FILES: process.env.GOOGLE_URL_FOR_FILES,
  NOVA_POSHTA_API_KAY: process.env.NOVA_POSHTA_API_KAY,

  GOOGLE_API_FOLDER_ID: process.env.GOOGLE_API_FOLDER_ID,

  FRONT_URL: process.env.FRONT_URL,
};
