import express, { Request, Response, Router } from 'express';

const router : Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('<h2> 블로그 </h2>');
});

module.exports = router;