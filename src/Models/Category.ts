import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, lowercase: true, unique: true },
  recipes: [{ type: Schema.ObjectId, ref: "Recipe" }],
});

const Category = model("Category", categorySchema);

export type CategoryAttrs = InferSchemaType<typeof categorySchema>;
export type CategoryDoc = HydratedDocument<CategoryAttrs>;
export default Category;
