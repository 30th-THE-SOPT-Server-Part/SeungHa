import express, { Request, Response, NextFunction } from "express";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import message from "../modules/responseMessage";
import jwt from "jsonwebtoken";
import config from "../config";

export default (req: Request, res: Response, next: NextFunction) => {

    // Bearer token 파싱해서 토큰만 가져옴
    // split까지 하면 ["Bearer", "jwttoken"], 여기서 "jwttoken"만 가져옴
    const token = req.headers["authorization"]?.split(' ').reverse()[0];

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    }

    try{

        const decoded = jwt.verify(token, config.jwtSecret); 

        req.body.user = (decoded as any).user; // 타입단언 안해주면 오류

        next(); // middlewaure 끝나면 다음으로 넘기기

    } catch(error: any){ // error type any로 써줘서 error.name 오류 해결

        console.log(error);

        // 토큰이 만료된 경우의 에러
        if (error.name == 'TokenExpiredError'){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVAILD_TOKEN));
        }

        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }

}