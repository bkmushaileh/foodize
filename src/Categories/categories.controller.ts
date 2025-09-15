import { serverError } from "../Middleware/serverError";
import Catagory from "../Models/Category";
import { NextFunction, Request, Response } from "express";

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

    const catagoryExist = await Catagory.findOne({ name });

    if (catagoryExist) {
      return next({ message: "Duplicated Category!", status: 401 });
    }

    const category = await Catagory.create(req.body);
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
    const categories = await Catagory.find();

    if (!categories.length) {
      return next({ message: "Catagory notfound", status: 404 });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return next(serverError);
  }
};
export { createCategory, getCategories };
