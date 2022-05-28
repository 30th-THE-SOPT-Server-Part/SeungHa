import { Router } from "express";
import MovieController from "../controllers/MovieController";
import auth from "../middleware/auth";

const { body } = require("express-validator");

const router = Router();

router.post("/", [
    
    body("title").notEmpty(),
    body("director").notEmpty()

], MovieController.createMovie);

router.get("/:movieId", MovieController.getMovieById);
router.put("/:movieId", MovieController.updateMovie);
router.delete("/:movieId", MovieController.deleteMovie);

router.post("/:movieId/comment", [
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment)

router.get('/:movieId', MovieController.getMovieById);

router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

export default router;

