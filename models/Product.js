import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = model("product", ProductSchema);
export default ProductModel;
