import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";
import Catagory from "./Catagory";
import { userInfo } from "os";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ingredient: [
    { amount: { type: String, required: true } },
    { unit: { type: Number, required: true } },
    { type: Schema.ObjectId, ref: "Ingredient" },
  ],
  steps: { type: [String], required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  defficulty: { type: String, required: true },
  calorie: { type: Number },
  catagory: { type: Schema.ObjectId, ref: "Catagory", required: true },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

const Recipe = model("Recipe", recipeSchema);

export type UserAttrs = InferSchemaType<typeof recipeSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default Recipe;
