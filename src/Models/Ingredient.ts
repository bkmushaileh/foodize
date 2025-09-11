import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  recipes: { type: Schema.ObjectId, ref: "Recipe" },
});

const Ingredient = model("Ingredient", ingredientSchema);

export type UserAttrs = InferSchemaType<typeof ingredientSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default Ingredient;
