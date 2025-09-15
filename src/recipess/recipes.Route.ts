import { Router } from "express";
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../recipess/recipes.controller";

const router = Router();

router.post("/", createRecipes); 
router.get("/", getAllRecipes);  
router.get("/:id", getRecipeById); 
router.put("/:id", updateRecipe); 
router.delete("/:id", deleteRecipe);  

export default router;