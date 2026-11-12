import { Application } from "../types/application.types";

export const applications: Application[] = [];

let nextApplicationId = 1;

export const createApplication = (
    projectId: number,
    userId: string,
): Application => {
    const application: Application = {
        id: nextApplicationId++,
        projectId,
        userId,
        status: "PENDING",
        appliedAt: new Date().toISOString(),
    };

    applications.push(application);

    return application;
};

export const getApplicationByUser = (
    projectId: number,
    userId: string,
): Application | undefined => {
    return applications.find(
        (application) =>
            application.projectId === projectId &&
            application.userId === userId
    );
};