import { Request, Response, NextFunction } from "express";
import { Message } from "../models/messageModel";
import { messageService } from "../serwices/messageService";

class MessageController {
  public async newMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await req.body;
      await messageService.newMessage(message);
      return res.send("повідомлення було надіслане");
    } catch (e) {
      next(e);
    }
  }
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await Message.find().sort({ createdAt: -1 });
      return res.json(message);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const message = await Message.find({ _user_id: id });
      return res.json(message);
    } catch (e) {
      next(e);
    }
  }

  public async messageFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = await req.query;
      const message = await Message.find({ red: params });
      return res.json(message);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      await Message.deleteOne({ _id: id });
      return res.send("повідомлення видалено");
    } catch (e) {
      next(e);
    }
  }

  public async becomeToRed(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      await Message.updateOne({ _id: id }, { red: 1 });
      return res.send(id);
    } catch (e) {
      next(e);
    }
  }
  public async replay(req: Request, res: Response, next: NextFunction) {
    try {
      const replay = await req.body;
      await Message.updateOne({ _id: replay.id }, { messageA: replay.message });
    } catch (e) {
      next(e);
    }
  }
  public async getMessageByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = await req.query;
      const messages = await Message.find({ email: email });
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  }
}

export const messageController = new MessageController();
