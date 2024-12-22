import Item from "../models/item";

// Add a new grocery item
export const addItem = async (req: any, res: any) => {
  const { name, category, price, inventory } = req.body;

  try {
    const newItem = new Item({ name, category, price, inventory });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
};

// View all grocery items
export const getItems = async (req: any, res: any) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error retrieving items", error: error.message });
  }
};

// Remove a grocery item
export const removeItem = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error removing item", error: error.message });
  }
};

// Update grocery item details
export const updateItem = async (req: any, res: any) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

// Update inventory levels
export const updateInventory = async (req: any, res: any) => {
  const { id } = req.params;
  const { inventory } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(id, { inventory }, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error updating inventory", error: error.message });
  }
};
