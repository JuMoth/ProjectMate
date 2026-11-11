import { Request, Response } from "express";
import { getProjects, getProjectById } from "../services/project.service";
import { ApiResponse } from "../types/api.type";

export const getProjectsController = (req: Request, res: Response) => {
    const projects = getProjects();

    const response: ApiResponse<typeof projects> = {
        success: true,
        message: "프로젝트 목록을 조회했습니다.",
        data: projects,
    };

    res.status(200).json(response);
}

export const getProjectController = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const project = getProjectById(id);

    if(!project) {
        const response: ApiResponse<null> = {
            success: false,
            message: "프로젝트를 찾을 수 없습니다.",
            data: null,
        };

        return res.status(404).json(response);
    }

    const response: ApiResponse<typeof project> = {
        success: true,
        message: "프로젝트 상세 정보를 조회했습니다.",
        data: project,
    };

    return res.status(200).json(response);
}