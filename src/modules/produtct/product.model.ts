import mongoose from "mongoose";
import { IProductDoc, IProductModel } from "./product.interface";
import Category from "../category/category.model";
const { Schema } = mongoose;

const productSchema = new Schema<IProductDoc, IProductModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.0,
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerId: String,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model<IProductDoc, IProductModel>(
  "Product",
  productSchema,
);

export default Product;
