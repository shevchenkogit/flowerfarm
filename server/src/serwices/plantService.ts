import { Plants } from "../models/plantsModel";
import {googleServiceFileUpload} from "./googleServiceFileUpload";

class PlantService {
  public async delete(item) {
    try {
      await googleServiceFileUpload.deleteFile(item);
      const idPlants = await JSON.parse(item);
      await Plants.deleteOne({ _id: idPlants._id });
    } catch (e) {
      console.log(e);
    }
  }
}

export const plantService = new PlantService();
