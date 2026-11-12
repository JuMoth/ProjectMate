import { Request, Response } from "express";

import {
    applyToProject,
    getMyApplication,
    ApplicationError,
} from "../services/application.service";

import { ApiResponse } from "../types/api.type";

// 프로젝트 참여 신청
export const createApplicationController = (
    req: Request,
    res: Response
) => {
    try {
        const projectId = Number(req.params.id);

        if(!Number.isInteger(projectId) || projectId <= 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "올바르지 않은 프로젝트 ID입니다.",
                data: null,
            };

            return res.status(400).json(response);
        }

        const application = applyToProject(projectId);

        const response: ApiResponse<typeof application> = {
            success: true,
            message: "프로젝트 참여 신청이 완료되었습니다.",
            data: application,
        };

        return res.status(201).json(response);
    } catch (err) {
        if(err instanceof ApplicationError) {
            const response: ApiResponse<null> = {
                success: false,
                message: err.message,
                data: null,
            };

            return res.status(err.statusCode).json(response);
        }

        throw err;
    }
};

// 내 프로젝트 참여 신청 조회
export const getMyApplicationController = (
    req: Request,
    res: Response
) => {
    try {
        const projectId = Number(req.params.id);

        if(!Number.isInteger(projectId) || projectId <= 0) {
            const response: ApiResponse<null> = {
                success: false,
                message: "올바르지 않은 프로젝트 ID입니다.",
                data: null,
            };

            return res.status(400).json(response);
        }

        const application = getMyApplication(projectId);

        const response: ApiResponse<typeof application> = {
            success: true,
            message: application
                ? "참여 신청 정보를 조회했습니다."
                : "참여 신청 내역이 없습니다.",
            data: application,
        };

        return res.status(200).json(response);
    } catch (err) {
        if(err instanceof ApplicationError) {
            const response: ApiResponse<null> = {
                success: false,
                message: err.message,
                data: null,
            };

            return res.status(err.statusCode).json(response);
        }
        throw err;
    }
}