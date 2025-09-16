import { Router } from "express";
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../recipess/recipes.controller";
import { authorization } from "../API/authorization";

const router = Router();

router.post("/", authorization, createRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
