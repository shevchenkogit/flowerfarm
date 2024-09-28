import { Request, Response, NextFunction } from "express";

import { Plants } from "../models/plantsModel";
import { returner } from "../midelvware/returner";
import { ReturnerModel } from "../models/returnerModel";
import { searchSerwices } from "../serwices/searchSerwices";

import Dayjs from "dayjs";
import { paginateService } from "../serwices/paginateService";
import { plantService } from "../serwices/plantService";
import { googleServiceFileUpload } from "../serwices/googleServiceFileUpload";

class PlantsController {
  public async post(req: Request, res: Response, next: NextFunction) {
    try {
      await ReturnerModel.deleteMany({});
      const info = await req.body;
      await returner.returnValue(info);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async uploadFullImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileF = await req.file;
      await googleServiceFileUpload.UploadFullImage(fileF);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async uploadCropedImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileC = await req.file;
      await googleServiceFileUpload.UploadCropedImage(fileC);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sort = await {};
      const plants = await paginateService.getPagination(req.query, sort);
      return res.json(plants);
    } catch (e) {
      next(e);
    }
  }

  public async getForSell(req: Request, res: Response, next: NextFunction) {
    try {
      // const items = await Plants.find({ forSell: 1 });

      // const dayForStart = Dayjs().startOf("day").subtract(7, "day").toJSON();
      const sort = await { forSell: 1 };
      const items = await paginateService.getPagination(req.query, sort);

      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      await searchSerwices.sortItem(req.query, res);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      await plantService.delete(id);
      return res.json({ message: "квітка була видалена" });
    } catch (e) {
      next(e);
    }
  }

  public async changePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await Plants.updateOne({ _id: body.id }, { price: body.newPrice });
      return res.send("товар був позначиний на скидки");
    } catch (e) {
      next(e);
    }
  }

  public async sellStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await Plants.updateOne({ _id: body.id }, { forSell: body.sell });
      return res.send("товар був позначиний на скидки");
    } catch (e) {
      next(e);
    }
  }

  public async have(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      await Plants.updateOne({ _id: body.id }, { noOnStorage: body.have });
      return res.send("зміни успішні");
    } catch (e) {
      next(e);
    }
  }

  public async getNewItem(req: Request, res: Response, next: NextFunction) {
    try {
      const dayForStart = Dayjs().startOf("day").subtract(7, "day").toJSON();
      const sort = await { createdAt: { $gt: dayForStart } };
      const plants = await paginateService.getPagination(req.query, sort);

      return res.json(plants);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { plantsId } = req.params;
      const body = req.body;
      const nPlant = await Plants.updateOne({ _id: plantsId }, { ...body });
      return res.json({ message: "plant was updated", data: nPlant });
    } catch (e) {
      next(e);
    }
  }

  public async changeInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      await Plants.updateOne(
        { _id: body.id },
        {
          PlantName: body.PlantName,
          PlantSub: body.PlantSub,
          about: body.about,
        }
      );
      return res.send("товар був позначиний на скидки");
    } catch (e) {
      next(e);
    }
  }
}

export const plantsController = new PlantsController();
