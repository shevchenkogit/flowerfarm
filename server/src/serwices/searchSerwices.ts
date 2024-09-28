import { Plants } from "../models/plantsModel";

class SearchSerwices {
  public async sortItem(name, res) {
    try {
      const filterParams = await JSON.parse(name.name);
      switch (filterParams.params) {
        case "expensive":
          return res.json(
            await Plants.find({
              PlantName: filterParams.name || "",
            }).sort({
              price: -1,
            })
          );
        case "cheep":
          return res.json(
            await Plants.find({
              PlantName: filterParams.name || "",
            }).sort({
              price: 1,
            })
          );

        case "new":
          return res.json(
            await Plants.find({
              PlantName: filterParams.name || "",
            }).sort({
              createdAt: -1,
            })
          );

        case "old":
          const plantName = await Plants.find({
            PlantName: filterParams.name || "",
          }).sort({
            createdAt: 1,
          });
          return res.json(plantName);

        case "":
          return res.json(
            await Plants.find({ PlantName: filterParams.name || "" })
          );

        case "home":
          return res.json(
            await Plants.find().sort({
              createdAt: -1,
            })
          );
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const searchSerwices = new SearchSerwices();
