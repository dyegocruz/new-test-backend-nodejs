import { Types } from "mongoose";
import httpStatus from "http-status";
import * as categoryService from "./category.service";
import { Request, Response } from "express";
import queueService from "../queue/queue.service";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getAll();
  res.status(httpStatus.OK).send(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);

    await queueService.sendMessage({ ownerId: category.ownerId.toString() });

    res.status(httpStatus.CREATED).send(category);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategoryById(
      new Types.ObjectId(req.params.id),
      req.body,
    );

    await queueService.sendMessage({ ownerId: category.ownerId.toString() });

    res.status(httpStatus.OK).send(category);
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.deleteCategoryById(
      new Types.ObjectId(req.params.id),
    );

    await queueService.sendMessage({ ownerId: category.ownerId.toString() });

    res.status(httpStatus.NO_CONTENT).send(category);
  } catch (err: any) {
    res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }
};
