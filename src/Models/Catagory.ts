import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const catagorySchema = new Schema({
  name: { type: String, required: true },
  recipes: { type: Schema.ObjectId, ref: "Recipe" },
});

const Catagory = model("Catagory", catagorySchema);

export type UserAttrs = InferSchemaType<typeof catagorySchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default Catagory;
