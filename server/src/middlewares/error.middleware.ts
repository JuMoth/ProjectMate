import { Request, Response, NextFunction } from "express";

import { AuthServiceError } from "../services/auth.service";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if(res.headersSent) {
        next(err);
        return;
    }

    console.error(err);

    if(err instanceof AuthServiceError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: "서버 내부 오류가 발생했습니다.",
        data: null,
    });
};