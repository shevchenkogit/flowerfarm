import * as jwt from "jsonwebtoken";
import { ApiError } from "../errors";
import {
  IActionTokenPayload,
  ITokenPair,
  ITokenPayload,
} from "../typs/tokenTips";
import { configs } from "../configs/configs";
class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, `${configs.ACCESS_SECRET}`, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, `${configs.REFRESH_SECRET}`, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, tokenType: string): ITokenPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case "access":
          secret = `${configs.ACCESS_SECRET}`;
          break;
        case "refresh":
          secret = `${configs.REFRESH_SECRET}`;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: string
  ): string {
    let secret = "";

    switch (tokenType) {
      case "activate":
        secret = `${configs.ACTIVATE_SECRET}`;
        break;
      case "forgot":
        secret = `${configs.FORGOT_SECRET}`;
        break;
    }

    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  public checkActionToken(token: string, tokenType: string) {
    try {
      let secret = "";

      switch (tokenType) {
        case "forgot":
          secret = `${configs.FORGOT_SECRET}`;
          break;
        case "activate":
          secret = `${configs.ACTIVATE_SECRET}`;
          break;
      }

      return jwt.verify(token, secret);
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
