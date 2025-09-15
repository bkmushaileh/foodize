import express from "express";
import { authorization } from "../API/authorization";
import { createCategory, getCategories } from "./categories.controller";

const router = express.Router();

router.post("/", authorization, createCategory);
router.get("/", getCategories);

export default router;
