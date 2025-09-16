import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  recipes: { type: Schema.ObjectId, ref: "Recipe" },
});

const Ingredient = model("Ingredient", ingredientSchema);

export type IngredientAttrs = InferSchemaType<typeof ingredientSchema>;
export type IngredientDoc = HydratedDocument<IngredientAttrs>;
export default Ingredient;
