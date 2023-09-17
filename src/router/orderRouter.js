import express from "express";
import { insertOrder } from "../model/order/orderModel.js";
import { orderConfirmationEmail } from "../utils/nodeMailer.js";
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
export default router;
