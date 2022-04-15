"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 파일명이 index인 경우 가장 먼저 실행됨
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express에서 생상된 객체를 app에 받아옴
app.use(express_1.default.json()); // express에서 request body를 json으로 받아오겠다.
app.use('/api', require('./api')); // use -> 메서드 종류와 상관 없이 해당 엔드포인트로 끝나는 모든 요청. 
// localhost:8080/api -> api 폴더로 감
// localhost:8000/api -> index.ts에서 라우팅. user.ts로 감 
// 형태 - app.http 요청 메시지 
// /를 엔드포인트로 함
app.get('/', (req, res, next) => {
    res.send('Hi! My name is 이름'); // get 형태의 요청이 들어왔을 때 해당 코드가 실행
});
// 8080 포트를 열겠다, 열리면 옆에 콜백 함수 실행
app.listen('8080', () => {
    console.log(`
        #############################################
            🛡️ Server listening on port: 8000 🛡️
        #############################################
    `);
});
//# sourceMappingURL=index.js.map