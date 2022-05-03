import UserController from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.post("/", UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findByUserId);
router.delete("/:userId", UserController.deleteUser);


export default router;