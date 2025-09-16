import { NextFunction, Request, Response } from "express";
import Category from "../../Models/Category";
import { serverError } from "../../Middleware/serverError";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, recipes } = req.body;
    if (!name) {
      return next({ message: "Name is required!", status: 401 });
    }

    const catagoryExist = await Category.findOne({ name });

    if (catagoryExist) {
      return next({ message: "Duplicated Category!", status: 401 });
    }

    const category = await Category.create(req.body);
    console.log("🚀 ~ createCategory ~ req.body:", req.body);
    return res.status(201).json(category);
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
