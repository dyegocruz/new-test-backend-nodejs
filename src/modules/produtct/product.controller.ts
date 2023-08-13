import httpStatus from "http-status";
import * as productService from "./product.service";
import { Request, Response } from "express";
import mongoose from "mongoose";

// export const getCategories = async (req: Request, res: Response) => {
//   const categories = await categoryService.getAll();
//   res.status(httpStatus.OK).send(categories);
// };

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProductById(
      new mongoose.Types.ObjectId(req.params.id),
      req.body,
    );
    res.status(httpStatus.OK).send(product);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const category = await productService.deleteProductById(
      new mongoose.Types.ObjectId(req.params.id),
    );
    res.status(httpStatus.NO_CONTENT).send(category);
  } catch (err: any) {
    res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }
};
