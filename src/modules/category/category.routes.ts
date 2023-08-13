import { Router } from "express";
import * as categoryController from "./category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.getCategories);
categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.put("/:id", categoryController.updateCategory);
categoryRoutes.delete("/:id", categoryController.deleteCategory);

export default categoryRoutes;
