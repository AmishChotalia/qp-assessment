import { Router } from "express";
import { getAvailableItems, createOrder } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware); // Only authenticated users can access

router.get("/items", getAvailableItems);
router.post("/orders", createOrder);

export default router;
