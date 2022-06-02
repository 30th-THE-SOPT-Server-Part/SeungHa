import express, { Router } from 'express';

const router : Router = express.Router();

const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');
const signupRouter = require('./routers/signup');
const likeRouter = require('./routers/like');

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/signup', signupRouter);
router.use('/like', likeRouter);

module.exports = router;