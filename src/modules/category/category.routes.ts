import { Router } from "express";
import * as categoryController from "./category.controller";

const categoriesRoutes = Router();

categoriesRoutes.get("/", categoryController.getCategories);
categoriesRoutes.post("/", categoryController.createCategory);
categoriesRoutes.put("/:id", categoryController.updateCategory);
categoriesRoutes.delete("/:id", categoryController.deleteCategory);

export default categoriesRoutes;
