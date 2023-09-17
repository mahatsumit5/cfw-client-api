import express from "express";
import { insertOrder } from "../model/order/orderModel.js";
const router = express();
router.post("/", async (req, res, next) => {
  try {
    const result = await insertOrder(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Thank you for placing the order",
        })
      : res.status("401").json({
          status: "error",
          message: "unable to add to order ",
        });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
