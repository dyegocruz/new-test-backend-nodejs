import { Router } from "express";
import * as productController from "./product.controller";

const productRoutes = Router();

productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);

export default productRoutes;
