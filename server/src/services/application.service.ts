import {
    createApplication,
    getApplicationByUser,
} from "../respositories/application.repository";

import { getProjectById } from "./project.service";
import type { Application } from "../types/application.types";

const CURRENT_USER_ID = "user-1";

export class ApplicationError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "ApplicationError";
        this.statusCode = statusCode;
    }
}

// 프로젝트 참여 신청
export const applyToProject = (projectId: number): Application => {
    const project = getProjectById(projectId);

    if(!project) {
        throw new ApplicationError(
            "프로젝트를 찾을 수 없습니다.",
            404
        );
    }

    if(project.recruitmentStatus === "CLOSED") {
        throw new ApplicationError(
            "모집이 종료된 프로젝트입니다.",
            400
        );
    }

    const [year, month, day] = project.deadline.split(".").map(Number);
    const deadlineDate = new Date(year, month - 1, day);

    deadlineDate.setHours(23, 59, 59, 999);

    if(deadlineDate < new Date()) {
        throw new ApplicationError(
            "모집 마감일이 지난 프로젝트입니다.",
            400
        );
    }

    const existingApplication = getApplicationByUser(
        projectId,
        CURRENT_USER_ID,
    );

    if(existingApplication) {
        throw new ApplicationError(
            "이미 참여 신청한 프로젝트입니다.",
            409
        );
    }

    return createApplication(projectId, CURRENT_USER_ID);
};

// 현재 사용자의 프로젝트 신청 여부 조회
export const getMyApplication = (
    projectId: number
): Application | null => {
    const project = getProjectById(projectId);

    if(!project) {
        throw new ApplicationError(
            "프로젝트를 찾을 수 없습니다.",
            404
        );
    }

    return (
        getApplicationByUser(projectId, CURRENT_USER_ID) ?? null
    );
};