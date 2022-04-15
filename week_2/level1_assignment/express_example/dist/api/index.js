"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// 요청 메서드의 종류와는 상관 없이 해당 엔드포인트로 들어온 모든 요청은 user.ts 파일 실행
router.use('/user', require('./user'));
module.exports = router;
//# sourceMappingURL=index.js.map