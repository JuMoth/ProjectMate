import { projects } from "../respositories/project.repository";
import { Project } from "../types/project.types";

export const getProjects = (): Project[] => {
    return projects;
};

export const getProjectById = (id: number): Project | undefined => {
    return projects.find(
        (project) => project.id === id && project.deletedAt === null
    );
};