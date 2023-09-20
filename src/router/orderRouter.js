import express from "express";
import { insertOrder } from "../model/order/orderModel.js";
import Stripe from "stripe";
import { orderConfirmationEmail } from "../utils/nodeMailer.js";
import e from "express";
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

router.post("/checkout-with-stripe", async (req, res, next) => {
  try {
    const stripe = require("stripe")(
      "sk_test_51NsR1aGbch8SC1C7pwtwxkjoWoWIjYlNBSxBWuCrhsP0tm5f4CFhEmzoLgg11L66nrDUDelrGpOPnwuAA9qBgt3100LNtzHHwo"
    );

    const session = await stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      line_items: [{ price: "price_H5ggYwtDq4fbrJ", quantity: 2 }],
      mode: "payment",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
