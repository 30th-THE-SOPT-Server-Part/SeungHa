import express, {Request, Response, Router} from 'express';

const router: Router = express.Router(); // express의 라우팅 시스템

// GET /???/???/ 요청이 오면 아래 코드가 실행
router.get('/', (req: Request, res: Response) => {
    // 상태코드 200 던져주고 json 형태로 다음과 같은 내용을 던져줌
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});

module.exports = router; // 생성한 router 객체를 모듈로 반환