import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "요청한 API를 찾을 수 없습니다.",
        data: null,
    });
};