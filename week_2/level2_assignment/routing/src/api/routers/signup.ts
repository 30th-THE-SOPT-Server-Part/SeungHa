import express, { Request, Response, Router } from 'express';

const router : Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('<h1> 회원가입 </h1>');
});

module.exports = router;