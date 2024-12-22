import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
