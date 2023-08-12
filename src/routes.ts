import { Router } from "express";
import categoriesRoutes from "./modules/category/category.routes";

const appRoutes = Router();

appRoutes.use("/categories", categoriesRoutes);

export default appRoutes;
