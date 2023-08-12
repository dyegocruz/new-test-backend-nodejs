import mongoose from "mongoose";
import {
  ICategoryDoc,
  NewCreateCategory,
  UpdateCategoryBody,
} from "./category.interface";
import Category from "./category.model";

export const getAll = async (): Promise<ICategoryDoc[]> => {
  return await Category.find();
};

export const createCategory = async (
  categoryBody: NewCreateCategory,
): Promise<ICategoryDoc> => {
  return Category.create(categoryBody);
};

export const updateCategoryById = async (
  idCategory: mongoose.Types.ObjectId,
  categoryBody: UpdateCategoryBody,
): Promise<ICategoryDoc | null> => {
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: idCategory },
    categoryBody,
    {
      new: true,
    },
  );
  return updatedCategory;
};

export const deleteCategoryById = async (
  idCategory: mongoose.Types.ObjectId,
): Promise<ICategoryDoc | null> => {
  const deletedCategory = await Category.findOneAndDelete({ _id: idCategory });
  return deletedCategory;
};
