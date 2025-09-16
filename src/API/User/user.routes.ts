import express from "express";
import { getAllUsers, getUserByID } from "./user.controllers";
import { authorization } from "../../Middleware/authorization";

const router = express.Router();

//router.get("/", getAllUsers);
router.get("/", authorization, getUserByID);

export default router;
