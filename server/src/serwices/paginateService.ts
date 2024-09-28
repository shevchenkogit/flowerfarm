import { Plants } from "../models/plantsModel";

// interface IPaginationResponse<T> {
//   page: number;
//   perPage: number;
//   itemsCount: number;
//   itemsFound: number;
//   data: T[];
// }

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}

class PaginateService {
  public async getPlantPagination(query) {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 8,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const plants = await Plants.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const totalCount = await Plants.count();

      return {
        page: +page,
        totalPage: totalCount/limit,
        perPage: +limit,
        // itemsFound:
        data: plants,
      };
    } catch (e) {
      console.log(e);
    }
  }

  public async getPagination(query, find) {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
          queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 8,
        sortedBy = {createdAt: -1}
        // ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const item = await Plants.find(find)
      const totalCount = await item.length

      const plants = await Plants.find(find).limit(limit)
          .skip(skip)
          .sort(sortedBy)
          .lean();

      // console.log(totalCount);


      return {
        page: +page,
        totalPage: totalCount/limit,
        perPage: +limit,
        // itemsFound:
        data: plants,
      };
    } catch (e) {
      console.log(e);
    }
  }

  public async getPaginationSort(query, find, sort) {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
          queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 8,
        sortedBy = {createdAt: -1}
        // ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const item = await Plants.find(find)
      const totalCount = await item.length

      const plants = await Plants.find(find).limit(limit)
          .skip(skip)
          .sort(sortedBy)
          .lean();

      // console.log(totalCount);


      return {
        page: +page,
        totalPage: totalCount/limit,
        perPage: +limit,
        itemsFound: totalCount,
        data: plants,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export const paginateService = new PaginateService();
