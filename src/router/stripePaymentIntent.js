import express from "express";
import Stripe from "stripe";

const router = new express.Router();

router.post("/payment-intent", async (req, res, next) => {
  try {
    const stripe = Stripe(process.env.STRIPE_API);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.totalAmount * 1000,
      currency: "aud",
      payment_method_types: [req.body.payment],
    });
    console.log(req.body);
    res.json({
      status: "success",
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/checkout-with-stripe", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment", // 'payment', 'setup' or 'subscription'
      success_url:
        process.env.NODE_ENV === "development"
          ? `${process.env.WEB_DOMAIN}/cart`
          : "https://cfw-api.onrender.com/cart",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? `${process.env.WEB_DOMAIN}/cart`
          : "https://cfw-api.onrender.com/checkout",
      customer_email: req.body.user.email,
      line_items: req.body.orderItems.map((item) => {
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
    });
    if (session.id) {
      res.json({ url: session.url, session });
      next();
    }
  } catch (error) {
    next(error);
  }
});
export default router;
