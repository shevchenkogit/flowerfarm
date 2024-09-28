import nodemailer, { Transporter } from "nodemailer";
import EmailTempletes from "email-templates";
import * as path from "path";
import { template } from "../templetes/template";
import { IUser } from "../typs/userTipes";
import { configs } from "../configs/configs";

class EmailService {
  public transporter: Transporter;
  public templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      secure: false,
      service: configs.EMAIL_SERVICE,
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_EMAIL_PASSWORD,
      },
    });
    this.templateParser = new EmailTempletes({
      views: {
        root: path.join(process.cwd(), "dist", "templetes"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "dist", "templetes", "css"),
        },
      },
    });
  }
  public async sendMail(email: string, order) {
    const Html = await template.getHtml(order);
    return this.transporter.sendMail({
      from: "service",
      to: email,
      subject: "Nev Order",
      html: Html,
    });
  }

  public async sendMailActivate(email: string, activateToken: string, user) {
    const Html = await template.activate(activateToken, user);
    return this.transporter.sendMail({
      from: "service",
      to: email,
      subject: "activation",
      html: Html,
    });
  }

  public async sendInForAdmin(email: string, tokenPair) {
    const Html = await template.inToSite(tokenPair);
    return this.transporter.sendMail({
      from: "system",
      to: email,
      subject: "logIn",
      html: Html,
    });
  }
  public async sendMessageFromUserToAdmin(
    email: string,
    message: string,
    user: IUser
  ) {
    const Html = await template.sendMessageToAdmin(message, user);
    return this.transporter.sendMail({
      from: `${user.name}`,
      to: email,
      subject: "userMessage",
      html: Html,
    });
  }

  public async sendMessageFromGuestToAdmin(
    email: string,
    message: string,
    guestEmail: string
  ) {
    const Html = await template.sendMessageGuestToAdmin(message, guestEmail);
    return this.transporter.sendMail({
      from: "Guest",
      to: email,
      subject: "userMessage",
      html: Html,
    });
  }
}

export const emailService = new EmailService();
