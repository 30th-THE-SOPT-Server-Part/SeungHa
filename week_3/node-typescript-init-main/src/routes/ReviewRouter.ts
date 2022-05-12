import { ReviewController } from "../controllers";
import { Router } from "express";
const { body } = require("express-validator");

const router = Router();

router.post("/movies/:movieId", [

    body("title").notEmpty().withMessage("제목써라"),
    body("writer").notEmpty().withMessage("글쓴이써라"),
    body("content").notEmpty().withMessage("내용써라")

], ReviewController.createReview);

router.get("/movies/:movieId", ReviewController.getReviews)

export default router;