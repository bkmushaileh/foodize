import { NextFunction, Request, Response } from "express";
import Category from "../../Models/Category";
import { serverError } from "../../Middleware/serverError";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next({ message: "Name is required!", status: 400 });
    }

    const catagoryExist = await Category.findOne({ name });

    if (catagoryExist) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const category = await Category.create({ name });
    console.log("🚀 ~ createCategory ~ req.body:", req.body);
    return res.status(201).json({ _id: category._id, name: category.name });
  } catch (error) {
    console.log(error);
    return next(serverError);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();

    return res.status(200).json(categories);
  } catch (error) {
    return next(serverError);
  }
};
export { createCategory, getCategories };
