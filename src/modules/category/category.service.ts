import { Types } from "mongoose";
import {
  ICategoryDoc,
  NewCreateCategory,
  UpdateCategoryBody,
} from "./category.interface";
import Category from "./category.model";

export const getAll = async (): Promise<ICategoryDoc[]> => {
  return await Category.find();
};

export const getOne = async (
  idCategory: Types.ObjectId,
  ownerId?: string,
): Promise<ICategoryDoc> => {
  const category = await Category.findOne({
    _id: idCategory,
    ownerId,
  });

  if (!category && ownerId)
    throw new Error(`Category not found for the owner ${ownerId}`);

  if (!category) throw new Error("Category not found");

  return category;
};

export const createCategory = async (
  categoryBody: NewCreateCategory,
): Promise<ICategoryDoc> => {
  return Category.create(categoryBody);
};

export const updateCategoryById = async (
  idCategory: Types.ObjectId,
  categoryBody: UpdateCategoryBody,
): Promise<ICategoryDoc> => {
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: idCategory },
    categoryBody,
    {
      new: true,
    },
  );

  if (!updatedCategory) throw new Error("Category not found");

  return updatedCategory;
};

export const deleteCategoryById = async (
  idCategory: Types.ObjectId,
): Promise<ICategoryDoc> => {
  const deletedCategory = await Category.findOneAndDelete({ _id: idCategory });

  if (!deletedCategory) throw new Error("Category not found");

  return deletedCategory;
};
