import { Request, Response, NextFunction } from "express";
import { orderService } from "../serwices/orderService";
import { emailService } from "../serwices/emailService";
import { Order } from "../models/orderModel";
import { configs } from "../configs/configs";

class OrderController {
  public async saveOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await req.body;
      await orderService.SaveOrder(order);
      await emailService.sendMail(`${configs.NO_REPLY_EMAIL}`, order);
      return res.json("done");
    } catch (e) {
      next(e);
    }
  }
  public async getAllOrdersForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.query;
      const ordersByUser = await Order.find({ userId: userId });
      return res.json({ ordersByUser });
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
