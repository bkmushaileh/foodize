import express from "express";
import { createCategory, getCategories } from "./categories.controllers";
import { authorization } from "../API/authorization";

const router = express.Router();

router.post("/", authorization, createCategory);
router.get("/", getCategories);

export default router;
