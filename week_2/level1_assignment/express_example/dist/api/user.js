"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router(); // express의 라우팅 시스템
// GET /???/???/ 요청이 오면 아래 코드가 실행
router.get('/', (req, res) => {
    // 상태코드 200 던져주고 json 형태로 다음과 같은 내용을 던져줌
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});
module.exports = router; // 생성한 router 객체를 모듈로 반환
//# sourceMappingURL=user.js.map