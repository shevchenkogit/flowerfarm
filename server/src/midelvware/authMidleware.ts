import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";
import { tokenService } from "../serwices/tokenService";
import { Token, TokenActivate } from "../models/tokenModels";
import { TokenAdmin } from "../models/tokeAdminModel";
import { User } from "../models/userModel";
import { AdminTable } from "../models/adminModel";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(accessToken, "access");

      const tokenInfo = await Token.findOne({ accessToken });
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      if (tokenInfo && jwtPayload) {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  public async checkAccessTokenForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(accessToken, "access");

      const tokenInfo = await TokenAdmin.findOne({ accessToken });
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      if (tokenInfo && jwtPayload) {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  public async checkUserActiveOrExit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token } = await req.query;
      const userAuth = await req.body;
      const { email, password } = userAuth;
      if (token === "0") {
        if (email === "" || password === "") {
          return res.json({ message: "будь-ласка введіть логін та пароль" });
        }
        if (email !== "" && password !== "") {
          const user: any = await User.findOne({ email: email });
          if (user === undefined || !user) {
            const admin: any = await AdminTable.findOne({ email: email });
            if (admin === undefined || !admin) {
              return res.json({ message: "не існує такого користувача" });
            }
            if (admin) {
              next();
            }
          }
          if (user.activate !== null) {
            if (user.activate === 1) {
              next();
            }
            if (user.activate === 0) {
              return res.json({
                message: "будь-ласка підтвердіть свою електронну адресу",
              });
            }
          }
        }
      }
      if (token !== "0") {
        const actionToken = await tokenService.checkActionToken(
          `${token}`,
          "activate"
        );
        if (!actionToken) {
          return res.json({ message: "токен не дійсний!" });
        }
        if (actionToken) {
          const activateToken: any = await TokenActivate.findOne({
            activateToken: token,
          });
          if (activateToken !== undefined) {
            await User.updateOne(
              { _id: activateToken._user_id },
              { activate: 1 }
            );
            next();
          }
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
