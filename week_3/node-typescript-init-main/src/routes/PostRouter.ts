import { Router } from "express";
import PostController from "../controllers/PostController";
const { body } = require("express-validator");

const router = Router();

router.post("/", [

    body("title").notEmpty().withMessage("제목써라"),
    body("writer_id").notEmpty().withMessage("글쓴이 id 써라"),
    body("content").notEmpty().withMessage("내용써라")

], PostController.createPost);
router.put("/:postId", PostController.updatePost);
router.get("/:postId", PostController.findByPostId);
router.delete("/:postId", PostController.deleteUser);

export default router;