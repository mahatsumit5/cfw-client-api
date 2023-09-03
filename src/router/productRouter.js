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

    const data = slug
      ? await getSingleProduct({ _id, slug })
      : await getProducts();

    if (slug && _id && !data) {
      const result = await getProductsByCatagory(_id);
      console.log(result, "------------------");
      result?.length
        ? res.json({
            result,
          })
        : res.json({
            status: "error no books found",
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
    console.log(error);
    res.json({ error });
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
