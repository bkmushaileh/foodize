import Recipe from "../Models/Recipe";
import { NextFunction, Request, Response } from "express";
import Catagory from "../Models/Category";
import { serverError } from "../Middleware/serverError";
import { log } from "console";
export const createRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?._id) {
      return next({ status: 401, message: "Unauthorized" });
    }
    const recipe = new Recipe({
      ...req.body,
      user: req.user._id,
    });
    await recipe.save();

    if (req.body.categories && req.body.categories.length > 0) {
      await Catagory.updateMany(
        { _id: { $in: req.body.categories } },
        { $addToSet: { recipes: recipe._id } }
      );
    }
    return res.status(201).json(recipe);
  } catch (err: any) {
    console.log(err);
    return next(serverError);
  }
};
export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "username image")
      .populate("category", "name");

    if (!recipes.length) {
      return next({ status: 404, message: "No Recipe Found!" });
    }
    return res.json(recipes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    return next(serverError);
  }
};
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "name email")
      .populate("category", "name");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user", "name email")
      .populate("Catagory", "name");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (req.body.categories) {
      await Catagory.updateMany(
        { recipes: recipe._id },
        { $pull: { recipes: recipe._id } }
      );
      await Catagory.updateMany(
        { _id: { $in: req.body.categories } },
        { $push: { recipes: recipe._id } }
      );
    }

    res.json(recipe);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await Catagory.updateMany(
      { recipes: recipe._id },
      { $pull: { recipes: recipe._id } }
    );

    res.json({ message: "Recipe deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
