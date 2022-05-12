import { Router } from "express";
import MovieController from "../controllers/MovieController";
const { body } = require("express-validator");

const router = Router();

router.post("/", [
    
    body("title").notEmpty(),
    body("director").notEmpty(),
    body("thumbnail").notEmpty(),
    body("story").notEmpty()

], MovieController.createMovie);

router.get("/:movieId", MovieController.getMovieById);
router.put("/:movieId", MovieController.updateMovie);
router.delete("/:movieId", MovieController.deleteMovie);


export default router;