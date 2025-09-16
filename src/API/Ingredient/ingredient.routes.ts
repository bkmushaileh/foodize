import express from "express";
import { createIngredient, getIngredient } from "./ingredient.controller";
import { authorization } from "../../Middleware/authorization";

const router = express.Router();

router.post("/", authorization, createIngredient);
router.get("/", getIngredient);

export default router;
