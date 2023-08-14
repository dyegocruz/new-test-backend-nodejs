import { Model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
  ownerId: Types.ObjectId;
}

export type ICategoryDoc = ICategory;

export type ICategoryModel = Model<ICategoryDoc>;

export type NewCreateCategory = Omit<ICategory, string>;

export type UpdateCategoryBody = Partial<ICategory>;
