import { Router } from "express";
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "./recipes.controller";
import { authorization } from "../../Middleware/authorization";

const router = Router();

router.post("/", authorization, createRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
