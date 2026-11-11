import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "서버 내부 오류가 발생했습니다.",
        data: null,
    });
};