import { Router } from "express";
import {
  addItem,
  getItems,
  removeItem,
  updateItem,
  updateInventory,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin")); // Only admin can access these routes

router.post("/items", addItem);
router.get("/items", getItems);
router.delete("/items/:id", removeItem);
router.put("/items/:id", updateItem);
router.put("/items/:id/inventory", updateInventory);

export default router;
