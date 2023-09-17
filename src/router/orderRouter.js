import express from "express";
const router = express();
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "data sent to server",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
