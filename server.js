import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./src/config/mongoConfig.js";
const app = express();
const PORT = 8010 || process.env.PORT;

dotenv.config(); //using dotenv to process dotenv key

// Middleware
app.use(cors()); //cross origin resources sharing for connection between client and server
app.use(morgan("dev")); // for development purpose to see
app.use(express.json()); //send data in json format to frontEnd
mongoConnect();
// await excuteCRUDOperaion();
import userRouter from "./src/router/userRouter.js";
import productRouter from "./src/router/productRouter.js";
import catagoryRouter from "./src/router/catagoryRouter.js";
import paymentRouter from "./src/router/paymentRouter.js";
import orderRouter from "./src/router/orderRouter.js";
import mongoose from "mongoose";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/catagory", catagoryRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is live",
  });
});
app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
    code,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running on port http://localhost:${PORT}`);
});
