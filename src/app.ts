import express from "express";
import { env } from "./Config/config";
import connectDB from "./database";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./Middleware/errorHandler";
import path from "path";
import { notFound } from "./Middleware/notFound";
import authRouter from "./Auth/auth.Route";
import categoryRouter from "./Categories/categories.routes";
import recipeAuthor from "./Recipes/recipes.Route";
import userRouter from "./User/user.routes";
connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/recipe", recipeAuthor);
app.use(errorHandler);
app.use(notFound);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
