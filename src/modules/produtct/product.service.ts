import { Types } from "mongoose";
import {
  IProductDoc,
  NewCreateProduct,
  UpdateProductBody,
} from "./product.interface";
import * as categoryService from "../category/category.service";
import Product from "./product.model";

export const createProduct = async (
  productBody: NewCreateProduct,
): Promise<IProductDoc> => {
  const { category, ownerId } = productBody;

  // check it category exist on database
  await categoryService.getOne(category, ownerId);

  return Product.create(productBody);
};

export const updateProductById = async (
  idProduct: Types.ObjectId,
  productBody: UpdateProductBody,
): Promise<IProductDoc> => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: idProduct },
    productBody,
    {
      new: true,
    },
  );

  if (!updatedProduct) throw new Error("Product not found");

  return updatedProduct;
};

export const deleteProductById = async (
  idProduct: Types.ObjectId,
): Promise<IProductDoc> => {
  const deletedProduct = await Product.findOneAndDelete({ _id: idProduct });

  if (!deletedProduct) throw new Error("Product not found");

  return deletedProduct;
};
