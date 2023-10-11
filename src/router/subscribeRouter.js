import express from "express";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "Thank you for subscribing.",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
