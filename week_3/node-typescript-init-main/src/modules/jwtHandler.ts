import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config";
import { JwtPayloadInfo } from "../interfaces/common/JwtPayloadInfo";

const getToken = (userId: mongoose.Schema.Types.ObjectId) : string => {

    const payload: JwtPayloadInfo = {
        user: {
            id: userId
        },
    };

    // 암호화
    const accessToken: string = jwt.sign(
        payload, // payload 넣어줌
        config.jwtSecret, // config에서 가져옴
        { expiresIn: '2h' }, // 유효기간 지정
    );

    return accessToken;
};

export default getToken;