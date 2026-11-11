import api from "./api";
import type { Project } from "../types/project.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 프로젝트 목록 조회
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>("/projects");

  return response.data.data;
};

// 프로젝트 상세 조회
export const getProjectById = async (
  id: number
): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);

  return response.data.data;
};