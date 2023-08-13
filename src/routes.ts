import { Router } from "express";
import categoryRoutes from "./modules/category/category.routes";
import productRoutes from "./modules/produtct/product.routes";

const appRoutes = Router();

appRoutes.use("/category", categoryRoutes);
appRoutes.use("/product", productRoutes);

export default appRoutes;
