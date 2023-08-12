import { Model, Document } from "mongoose";

export interface ICategory {
  title: string;
  description: string;
  ownerId: string;
}

export interface ICategoryDoc extends ICategory, Document {}

export type ICategoryModel = Model<ICategoryDoc>;

export type NewCreateCategory = Omit<ICategory, string>;

export type UpdateCategoryBody = Partial<ICategory>;
