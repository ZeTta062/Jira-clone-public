import z from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "1글자 이상 입력해주세요."),
    status: z.enum(TaskStatus),
    workspaceId: z.string().trim().min(1, "Required"),
    projectId: z.string().trim().min(1, "Required"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, "Required"),
    description: z.string().optional(),
});