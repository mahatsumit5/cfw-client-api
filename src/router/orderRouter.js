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
    const stripe = Stripe(process.env.STRIPE_API);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment", // 'payment', 'setup' or 'subscription'
      success_url: `${process.env.WEB_DOMAIN}/cart/order`,
      cancel_url: `${process.env.WEB_DOMAIN}`,
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: `${item.title}`,
            },
            unit_amount: `${item.price}` * 100,
          },
          quantity: `${item.orderQty}`,
        };
      }),
      // line_items: [
      //   {
      //     price_data: {
      //       currency: "aud",
      //       product_data: {
      //         name: "shoe",
      //       },
      //       unit_amount: 2599 * 100,
      //     },
      //     quantity: 2,
      //   },
      // ],
    });
    console.log(session.url);
    res.json({ url: session.url, session });
  } catch (error) {
    next(error);
  }
});
export default router;
