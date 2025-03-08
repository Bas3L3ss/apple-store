import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";

export const GetProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      search,
      category,
      page = "1",
      limit = "10",
    } = req.query as {
      search?: string;
      category?: string;
      page?: string;
      limit?: string;
    };

    const filter: Record<string, any> = {};

    // Full-text search on name & description
    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    // Convert pagination values to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch products with filters, pagination, and population
    const products = await ProductModel.find(filter)
      .populate("productOptions")
      .skip(skip)
      .limit(limitNumber);

    // Count total documents for pagination metadata
    const total = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNumber);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};
