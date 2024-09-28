import { IUser } from "./userTipes";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ITokenPayload = Pick<IUser, "_id" | "name">;

export interface IActionTokenPayload {
  _id: string;
  name: string;
}

export interface IActivateToken {
  _user_id: string;
  activateToken: string;
}
