import { Order } from "../models/orderModel";

class OrderService {
  public async SaveOrder(order) {
    try {
      await Order.create({
        userId: order.userId,
        city: order.cityString,
        adress: order.departmentOfCity,
        deliveryMethod: order.deliveryMethod.method,
        payMethod: order.payMethod.method,
        personWhoOrder: order.personWhoOrder,
        personWhoWillTAke: order.personWhoWillTAke,
        order: order.objectForCard,
      });
    } catch (e) {
      console.log(`EROR ${e}`);
    }
  }
  public async getAllOrdersByUserId(userId) {
    try {
      return await Order.find({ userId: userId });
    } catch (e) {
      console.log(`EROR ${e}`);
    }
  }
}

export const orderService = new OrderService();
