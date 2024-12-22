import Item from "../models/item";
import Order from "../models/order";

// View all available grocery items
export const getAvailableItems = async (req: any, res: any) => {
  try {
    const items = await Item.find({ inventory: { $gt: 0 } }); // Filter out items with zero inventory
    res.status(200).json(items);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error retrieving items", error: error.message });
  }
};

// Create an order
export const createOrder = async (req: any, res: any) => {
  const { userId, items } = req.body;
  const orderItems: any[] = [];

  try {
    // Check inventory and create order items array
    for (const item of items) {
      const groceryItem = await Item.findById(item.itemId);
      if (!groceryItem || groceryItem.inventory < item.quantity) {
        return res.status(400).json({
          message: `Insufficient inventory for item: ${groceryItem?.name}`,
        });
      }
      orderItems.push({ itemId: groceryItem._id, quantity: item.quantity });
    }

    // Deduct inventory for each item
    for (const orderItem of orderItems) {
      await Item.findByIdAndUpdate(orderItem.itemId, {
        $inc: { inventory: -orderItem.quantity },
      });
    }

    // Create the order
    const order = new Order({ userId, items: orderItems });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};
