import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [
    {
      amount: { type: String, required: true },
      unit: { type: String, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true },
    },
  ],
  steps: { type: [String], required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  difficulty: { type: String, required: true },
  calories: { type: Number },
  category: { type: Schema.ObjectId, ref: "Catagory", required: true },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

const Recipe = model("Recipe", recipeSchema);

export type UserAttrs = InferSchemaType<typeof recipeSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default Recipe;
