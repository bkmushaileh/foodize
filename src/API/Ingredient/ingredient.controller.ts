import { serverError } from "../../Middleware/serverError";
import Ingredient from "../../Models/Ingredient";
import { NextFunction, Request, Response } from "express";

const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, recipes } = req.body;
    if (!name) {
      return next({ message: "Name is required!", status: 401 });
    }

    const ingredientExist = await Ingredient.findOne({ name });

    if (ingredientExist) {
      return next({ message: "Duplicated Ingredient!", status: 401 });
    }

    const ingredient = await Ingredient.create(req.body);
    console.log("🚀 ~ createIngredient ~ req.body:", req.body);
    return res.status(201).json(ingredient);
  } catch (error) {
    console.log(error);
    return next(serverError);
  }
};

const getIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Ingredients = await Ingredient.find();

    if (!Ingredients.length) {
      return next({ message: "Ingredient notfound", status: 404 });
    }
    return res.status(200).json(Ingredients);
  } catch (error) {
    return next(serverError);
  }
};

export { createIngredient, getIngredient };
