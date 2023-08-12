import mongoose from "mongoose";
import { ICategoryDoc, ICategoryModel } from "./category.interface";
const { Schema } = mongoose;

const categorySchema = new Schema<ICategoryDoc, ICategoryModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model<ICategoryDoc, ICategoryModel>(
  "Category",
  categorySchema,
);

export default Category;
