import express, { Request, Response, Router } from 'express';

const router : Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: '좋아요 창'
    });
});

module.exports = router;