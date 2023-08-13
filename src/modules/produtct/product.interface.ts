import { HydratedDocument, Model, Types } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  ownerId: string;
}

export interface IProductDoc extends IProduct, Document {}

export type IProductModel = Model<IProductDoc>;

export type NewCreateProduct = HydratedDocument<IProduct>;

export type UpdateProductBody = Partial<IProduct>;
