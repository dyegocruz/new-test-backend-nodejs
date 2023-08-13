import Category from "../category/category.model";
import { Catalog } from "./catalog.interface";

export const generateCatalog = async (ownerId: string): Promise<Catalog[]> => {
  return await Category.aggregate([
    {
      $match: {
        ownerId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "itens",
        pipeline: [
          {
            $project: {
              _id: 0,
              title: 1,
              description: 1,
              price: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        categoryTitle: "$title",
        categoryDescription: "$description",
        itens: 1,
        ownerId: 1,
      },
    },
  ]);
};
