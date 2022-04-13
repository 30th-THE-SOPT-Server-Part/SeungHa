import express, {Request, Response, NextFunction} from 'express'; 

const app = express(); // Express application를 생성함

// app.use(express.json());

app.use('/api', require('./api')); // /api 주소가 들어오면 ./api 폴더(모듈) 실행. 

app.listen('8080', () => { // 8080 포트를 열고, 열리면 콜백 함수 실행
    console.log('서버열렸음');
});