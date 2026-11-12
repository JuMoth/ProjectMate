export type ApplicationStatus = "PENDING";

export interface Application {
    id: number;
    projectId: number;
    userId: string;
    status: ApplicationStatus;
    appliedAt: string;
}