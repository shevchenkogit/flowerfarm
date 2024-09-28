import { CronJob } from "cron";
import Dayjs from "dayjs";
import { Token, TokenActivate } from "../models/tokenModels";
import { TokenAdmin } from "../models/tokeAdminModel";
import { Message } from "../models/messageModel";
import { Order } from "../models/orderModel";

const tokensRemover = async (): Promise<void> => {
  const day = await Dayjs().startOf("day").subtract(3, "day").toJSON();
  const dayActivate = await Dayjs().startOf("day").subtract(7, "day").toJSON();
  const dayAdmin = await Dayjs().startOf("day").subtract(1, "day").toJSON();
  const messages = await Dayjs().startOf("day").subtract(15, "day").toJSON();
  const order = await Dayjs().startOf("day").subtract(30, "day").toJSON();

  await Token.deleteMany({ createdAt: { $lte: day } });
  await TokenActivate.deleteMany({ createdAt: { $lte: dayActivate } });
  await TokenAdmin.deleteMany({ createdAt: { $lte: dayAdmin } });
  await Message.deleteMany({ createdAt: { $lte: messages } });
  await Order.deleteMany({ createdAt: { $lte: order } });
};

export const removeOldTokens = new CronJob("0 0 * * *", tokensRemover);
