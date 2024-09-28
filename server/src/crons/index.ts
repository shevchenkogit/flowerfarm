import { removeOldTokens } from "./removeToken";

export const cronRunner = () => {
  removeOldTokens.start();
};
