import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [
    {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
      ingredient: {
        type: Schema.ObjectId,
        ref: "Ingredient",
        required: false,
      },
    },
  ],
  steps: { type: [String], required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  difficulty: { type: String, required: true },
  calories: { type: Number },
  categories: [
    { type: Schema.Types.ObjectId, ref: "Catagory", required: true },
  ],
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

const Recipe = model("Recipe", recipeSchema);

export type RecipeAttrs = InferSchemaType<typeof recipeSchema>;
export type RecipeDoc = HydratedDocument<RecipeAttrs>;
export default Recipe;
