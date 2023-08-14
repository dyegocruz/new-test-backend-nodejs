import mongoose, { Schema } from "mongoose";
import { ICategoryDoc, ICategoryModel } from "./category.interface";

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
      type: Schema.Types.ObjectId,
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
