import express from "express";
import {
  getOrderById,
  getOrderByUser,
  insertOrder,
} from "../model/order/orderModel.js";
import { orderConfirmationEmail } from "../utils/nodeMailer.js";
import mongoose from "mongoose";
const router = express();
router.post("/", async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await insertOrder(req.body);
    if (result?._id) {
      await orderConfirmationEmail(user, result);
      return res.json({
        status: "success",
        message: "Thank you for placing the order",
        orderNumber: result._id,
      });
    }
    res.status("401").json({
      status: "error",
      message: "unable to add to order ",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    console.log(req.params);
    const { _id } = req.params;
    const result = await getOrderById(_id);
    result?._id
      ? res.json({
          status: "success",
          result,
        })
      : res.json({
          status: "fail",
        });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/order/:userId/:fName/:lName/:phone/:email/:address",
  async (req, res, next) => {
    try {
      const { userId, fName, lName, phone, email, address } = req.params;

      const obj = {
        _id: new mongoose.Types.ObjectId(userId),
        fName: fName,
        lName: lName,
        phone: phone,
        email: email,
        address: address,
      };
      const result = await getOrderByUser(obj);
      result.length
        ? res.json({
            status: "success",
            message: "Here are the history of your orders",
            result,
          })
        : res.json({
            status: "error",
            message: "No orders found",
          });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
