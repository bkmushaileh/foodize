import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: { type: Schema.ObjectId, ref: "Recipe" },
});

const User = model("User", userSchema);

export type UserAttrs = InferSchemaType<typeof userSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export default User;
