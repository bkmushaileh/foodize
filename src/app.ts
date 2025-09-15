import express from "express";
import { env } from "./Config/config";
import connectDB from "./database";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./Middleware/errorHandler";
import path from "path";
import { notFound } from "./Middleware/notFound";
import authRouter from "./Auth/auth.routers";
import catagoryRouter from "./Categories/categories.routes";
import recipes from "../src/recipess/recipes.Route"

connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "../Uploads")));
app.use("/api/auth", authRouter);
app.use("/api/catagory", catagoryRouter);
app.use("/api/recipe", recipes)
app.use(errorHandler);
app.use(notFound);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
