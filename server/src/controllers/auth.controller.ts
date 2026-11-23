import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import type {
    ApiResponse,
    PublicUser,
} from "../types/auth.types";
import { registerUser } from "../services/auth.service";

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const jwtSecret = process.env.JWT_SECRET;

        if(!jwtSecret) {
            throw new Error("JWT_SECRET 환경변수가 설저오디지 않았습니다.");
        }

        const user = await registerUser(req.body);

        const token = jwt.sign(
            { sub: user.id },
            jwtSecret,
            { expiresIn: "1d" },
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const response: ApiResponse<PublicUser> = {
            success: true,
            message: "회원가입이 완료되었습니다.",
            data: user,
        };

        res.status(201).json(response);
    } catch(error) {
        next(error);
    }
};