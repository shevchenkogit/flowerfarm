import { emailService } from "./emailService";
import { Message } from "../models/messageModel";
import { User } from "../models/userModel";
import {configs} from "../configs/configs";

class MessageService {
  public async newMessage(message) {
    try {
      await Message.create({ ...message });
      if (message.isUser === 1) {
        const user: any = await User.findOne({ email: message.email });
        await emailService.sendMessageFromUserToAdmin(
            `${configs.NO_REPLY_EMAIL}`,
          `${message.messageU}`,
          user
        );
      }
      if (message.isUser === 0) {
        await emailService.sendMessageFromGuestToAdmin(
            `${configs.NO_REPLY_EMAIL}`,
          `${message.messageU}`,
          `${message.email}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const messageService = new MessageService();
