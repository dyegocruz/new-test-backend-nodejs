import { Model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
  ownerId: string;
}

export type ICategoryDoc = ICategory;

export type ICategoryModel = Model<ICategoryDoc>;

export type NewCreateCategory = Omit<ICategory, string>;

export type UpdateCategoryBody = Partial<ICategory>;
