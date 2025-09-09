import { Models } from "node-appwrite";
import { Project } from "../projects/types";

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE"
}

export const STATUS_KO = {
    BACKLOG: '대기 중',
    TODO: '해야할 일',
    IN_PROGRESS: '진행 중',
    IN_REVIEW: "검토 중",
    DONE: '완료',
}

export type Task = Models.Document & {
    name: string;
    status: TaskStatus;
    assigneeId: string;
    projectId: string;
    position: number;
    dueDate: string;
    project?: Project;
    assignee?: {
        name: string;
    }
};
