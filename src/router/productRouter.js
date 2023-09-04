import express from "express";
import {
  getOneProduct,
  getProducts,
  getProductsByCatagory,
  getSingleProduct,
} from "../model/products/productModel.js";

const router = express.Router();
router.get("/:slug?/:_id?", async (req, res) => {
  try {
    const { slug, _id } = req.params;
    req.params.status = "active";
    const data =
      slug && _id
        ? await getSingleProduct(req.params)
        : await getProducts({ status: "active" });
    if (slug && _id && !data) {
      const result = await getProductsByCatagory(_id);

      if (result?.length) {
        res.status(201).json({ message: "success", result });
        return;
      }

      res.json({
        status: "error no Products found",
        message: "No Products Found",
      });
      return;
    }
    data
      ? res.json({
          status: "success",
          data,
        })
      : res.json({
          status: "error",
          message: `No product found with ${slug || "_id"}`,
        });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});
// router.get("/catagories/:_id", async (req, res) => {
//   try {
//     const { _id } = req.params;
//     console.log(_id);
//     const result = await getProductsByCatagory(_id);
//     console.log(result, "----s-------------------");
//     result.length
//       ? res.json({
//           status: "success",
//           result,
//         })
//       : res.json({
//           status: "error",
//           message: `No product found with ${slug || "_id"}`,
//         });
//   } catch (error) {
//     res.json({ error });
//   }
// });
export default router;
