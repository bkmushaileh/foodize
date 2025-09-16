import express from "express";
import { createCategory, getCategories } from "./categories.controller";
import { authorization } from "../../Middleware/authorization";

const router = express.Router();

router.post("/", authorization, createCategory);
router.get("/", getCategories);

export default router;
