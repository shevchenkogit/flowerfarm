import { passwordService } from "./passwordService";
import { ApiError } from "../errors";
import { tokenService } from "./tokenService";
import { Token, TokenActivate } from "../models/tokenModels";
import { IUser } from "../typs/userTipes";
import { TokenAdmin } from "../models/tokeAdminModel";
import { emailService } from "./emailService";

class UserService {
  public async logIn(user: IUser, password: string) {
    try {
      const isMatched = await passwordService.compare(password, user.password);

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      console.log(e);
    }
  }

  public async activate(user: IUser) {
    try {
      if (!user) {
        throw new ApiError("немає такого користувача", 409);
      }

      const activateToken = tokenService.generateActionToken(
        {
          _id: user._id,
          name: user.name,
        },
        "activate"
      );

      await emailService.sendMailActivate(`${user.email}`, activateToken, user);

      await TokenActivate.create({
        _user_id: user._id,
        activateToken: activateToken,
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async logInAdmin(user: IUser, password: string) {
    try {
      const isMatched = await passwordService.compare(password, user.password);

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await TokenAdmin.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      console.log(e);
    }
  }
}

export const userService = new UserService();
