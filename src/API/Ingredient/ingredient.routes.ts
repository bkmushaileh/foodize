import express from "express";
import { authorization } from "../authorization";
import { createIngredient, getIngredient } from "./ingredient.controller";

const router = express.Router();

router.post("/", authorization, createIngredient);
router.get("/", getIngredient);

export default router;
