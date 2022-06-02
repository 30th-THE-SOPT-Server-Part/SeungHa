import express, {Router} from 'express';

const router: Router = express.Router();

// 요청 메서드의 종류와는 상관 없이 해당 엔드포인트로 들어온 모든 요청은 user.ts 파일 실행
router.use('/user', require('./user'));

module.exports = router;