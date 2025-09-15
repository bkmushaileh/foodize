import { populate } from "dotenv";
import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  ingredients: [
    {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
      ingredient: {
        type: Schema.ObjectId,
        ref: "Ingredient",
        populate: ["id", "name"],
      },
    },
  ],
  steps: { type: [String], required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  defficulty: { type: String, required: true },
  calorie: { type: Number },
  Catagory: { type: Schema.ObjectId, ref: "Catagory", required: true },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

const Recipe = model("Recipe", recipeSchema);

export type UserAttrs = InferSchemaType<typeof recipeSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default Recipe;
