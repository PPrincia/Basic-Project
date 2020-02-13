import express from "express";
import productController from "../Controllers/products";

const router  = express.Router();

router.post("/regProduct",productController.regProduct);
router.get("/findProduct",productController.findProduct);
router.get("/findAllProducts",productController.findAllProducts);
router.put("/modifyProducts",productController.modifyProducts);
router.delete("/deleteProduct",productController.deleteProduct);

export default router;