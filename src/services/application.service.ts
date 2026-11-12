import api from "./api";
import type { Application } from "../types/application.types";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// 프로젝트 참여 신청
export const applyToProject = async (
    projectId: number
): Promise<Application> => {
    const response = await api.post<ApiResponse<Application>>(
        `/projects/${projectId}/applications`
    );

    return response.data.data ;
};

// 내 프로젝트 참여 신청 조회
export const getMyApplication = async (
    projectId: number
): Promise<Application | null> => {
    const response = await api.get<ApiResponse<Application | null>>(
        `/projects/${projectId}/applications/me`
    );

    return response.data.data;
}