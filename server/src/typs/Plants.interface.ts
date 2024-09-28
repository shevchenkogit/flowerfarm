export interface IPlants {
  _id: string;
  plantsName: string;
  plantsAbout: string;
  plantsPrice: string;
}

export interface ICreated<New> {
  message: string;
  data: New;
}
