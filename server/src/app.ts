import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { PlantsRouter } from "./routers/plantsRouter";
import { NovaPoshtaRouter } from "./routers/novaPoshtaRouter";
import { OrderRouter } from "./routers/orderRouter";
import { UserRouter } from "./routers/userRouter";
import { MessageRouter } from "./routers/messageRouter";
import { cronRunner } from "./crons";
import { configs } from "./configs/configs";

const app = express();



app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());

app.use("/plants", PlantsRouter);

app.use("/novaPoshta", NovaPoshtaRouter);

app.use("/order", OrderRouter);

app.use("/user", UserRouter);

app.use("/message", MessageRouter);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log("server started!!!");
});
