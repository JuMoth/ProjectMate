import { Request, Response } from "express";
import { ApiResponse } from "../types/api.type";

export const getHealth = (req: Request, res: Response) => {
    const response: ApiResponse<null> = {
        success: true,
        message: "ProjectMate Backend Server is running!",
        data: null,
    };

    res.status(200).json(response);
};