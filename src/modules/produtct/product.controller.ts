import { Request, Response } from "express";
import { Types } from "mongoose";
import httpStatus from "http-status";
import * as productService from "./product.service";
import queueService from "../queue/queue.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);

    await queueService.sendMessage({ ownerId: product.ownerId });

    res.status(httpStatus.CREATED).send(product);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProductById(
      new Types.ObjectId(req.params.id),
      req.body,
    );

    await queueService.sendMessage({ ownerId: product.ownerId });

    res.status(httpStatus.OK).send(product);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProductById(
      new Types.ObjectId(req.params.id),
    );

    await queueService.sendMessage({ ownerId: product.ownerId });

    res.status(httpStatus.NO_CONTENT).send(product);
  } catch (err: any) {
    res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }
};
