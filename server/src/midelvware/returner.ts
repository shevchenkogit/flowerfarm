import { ReturnerModel } from "../models/returnerModel";

class Returner {
  public async returnValue(value) {
    // const midl = JSON.stringify(value);
    await ReturnerModel.create({ value: value });
  }
}

export const returner = new Returner();
