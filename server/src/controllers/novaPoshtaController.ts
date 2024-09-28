import { Request, Response, NextFunction } from "express";
import { initNovaPoshta } from "novaposhtajs";
import { configs } from "../configs/configs";

class NovaPoshtaController {
  public async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { city } = await req.query;
      const apiKey = configs.NOVA_POSHTA_API_KAY;
      const novaPoshta = initNovaPoshta(apiKey);
      const cities = await novaPoshta.address.getCities({
        findByString: `${city}`,
        page: "1",
        limit: "1000",
      });
      return res.json(cities);
    } catch (e) {
      next(e);
    }
  }
  public async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const ref = req.query.department;
      const apiKey = configs.NOVA_POSHTA_API_KAY;
      const novaPoshta = initNovaPoshta(apiKey);
      const warehouse = await novaPoshta.address.getWarehouses({
        cityRef: `${ref}`,
        page: "1",
        limit: "5000",
      });
      return res.json(warehouse);
    } catch (e) {
      next(e);
    }
  }
}

export const novaPoshtaController = new NovaPoshtaController();
