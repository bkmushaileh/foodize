import { Router } from "express";
import {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "./recipes.controller";
import { authorization } from "../../Middleware/authorization";
import upload from "../../Middleware/multer";

const router = Router();

router.post("/", authorization, upload.single("image"), createRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
