import { Router } from 'express';
import UserRouter from "./UserRouter";
import PostRouter from "./PostRouter";
import ReviewRouter from "./ReviewRouter";
import MovieRouter from "./MovieRouter";

const router = Router();

router.use("/user", UserRouter);
router.use("/post", PostRouter);
router.use("/review", ReviewRouter);
router.use("/movie", MovieRouter);

export default router;