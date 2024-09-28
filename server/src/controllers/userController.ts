import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { passwordService } from "../serwices/passwordService";
import { userService } from "../serwices/userService";
import { Token } from "../models/tokenModels";
import { AdminTable } from "../models/adminModel";
import { TokenAdmin } from "../models/tokeAdminModel";
import { tokenService } from "../serwices/tokenService";
import { emailService } from "../serwices/emailService";

class UserController {
  public async post(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await req.body;
      const { email, password, name, userName, replayEmail, replayPassword } =
        user;
      const hashedPassword = await passwordService.hash(password);
      // const hashedUserName = await passwordService.hash(userName);
      const emailF: any = await User.findOne({ email: email });
      const userNameF: any = await User.findOne({ userName: userName });
      if (emailF || userNameF) {
        return res.json({
          error: "користувач або емейл вже існує",
        });
      }
      if (email === replayEmail && password === replayPassword) {
        await User.create({
          name,
          userName: userName,
          email: email,
          password: hashedPassword,
          activate: 0,
        });
      } else if (email != replayEmail || password != replayPassword) {
        return res.json({
          error: "не співпадає емейл або пароль, повторіть спробу!!",
        });
      }

      const userF: any = await User.findOne({ email: email });
      await userService.activate(userF);

      return res.json({ respons: "Дякую що приєднались до нас!" });
    } catch (e) {
      next(e);
    }
  }

  // public async addAdmin(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const user = await req.body;
  //     const { email, password, name, userName } = user;
  //     const hashedPassword = await passwordService.hash(password);
  //     await AdminTable.create({
  //       name,
  //       userName: userName,
  //       email: email,
  //       password: hashedPassword,
  //     });
  //     return res.json({ respons: "created new admin!" });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const userAuth = await req.body;
      const { email, password } = userAuth;
      const user: any = await User.findOne({ email: email });
      if (!user) {
        const admin: any = await AdminTable.findOne({ email: email });
        if (admin) {
          const tokenPair = await userService.logInAdmin(admin, password);
          await emailService.sendInForAdmin(`${email}`, tokenPair);
          return res.json({ message: "ти знаєш що робити" });
        }
        return res.json({ message: "не правильні дані авторизації" });
      }
      const tokenPair = await userService.logIn(user, password);
      if (tokenPair === undefined) {
        return res.json({
          message: "введіть свій емейл та пароль",
        });
      }
      return res.json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;
      const checkToken = await Token.findOne({ accessToken: token });
      if (checkToken) {
        const checkedToken = await tokenService.checkToken(
          `${token}`,
          "access"
        );
        if (!checkedToken) {
          return res.json({ message: "токен не дійсний!" });
        }
        return res.json({ user: "vereficated" });
      }
      if (!checkToken) {
        const checkedToken = await tokenService.checkToken(
          `${token}`,
          "access"
        );
        if (!checkedToken) {
          return res.json({ message: "токен не дійсний!" });
        }
        if (checkedToken) {
          const adminToken = await TokenAdmin.findOne({ accessToken: token });
          if (adminToken !== undefined) {
            return res.json({ admin: "vereficated" });
          }
        }
        return res.json({ user: "not_vereficated" });
      }
    } catch (e) {
      next(e);
    }
  }

  public async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;

      await tokenService.checkActionToken(`${token}`, "activate");
    } catch (e) {
      next(e);
    }
  }

  public async checkAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenA } = await req.query;
      const checkToken = await TokenAdmin.findOne({ accessToken: tokenA });
      if (checkToken !== undefined) {
        const checkedToken = await tokenService.checkToken(
          `${tokenA}`,
          "access"
        );
        if (!checkedToken) {
          return res.json({ message: "вхід не можливий A!" });
        }
        return res.json({ ATokenA: 1 });
      }

      if (checkToken === undefined || !checkToken) {
        return res.json({ message: "вхід не можливий Б!" });
      }
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = await req.query;
        const user = await User.findOne({ _id: userId });
        return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      await User.deleteOne({ _id: userId });
      return res.json({ message: "користувач був видалений" });
    } catch (e) {
      next(e);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.find();
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async forceActivate(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await req.body;
      await User.updateOne({ _id: body.id }, { activate: 1 });
    } catch (e) {
      next(e);
    }
  }

  public async forceNoActivate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = await req.body;
      await User.updateOne({ _id: body.id }, { activate: 0 });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
