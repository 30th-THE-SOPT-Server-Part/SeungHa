import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.post("/", PostController.createPost);
router.put("/:postId", PostController.updatePost);
router.get("/:postId", PostController.findByPostId);
router.delete("/:postId", PostController.deleteUser);

export default router;