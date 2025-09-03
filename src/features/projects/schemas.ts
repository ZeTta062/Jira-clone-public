import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, "1글자 이상 입력해주세요."),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional(),
    workspaceId: z.string(),
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, "1글자 이상 입력해주세요.").optional(),
    image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === "" ? undefined : value),
    ])
    .optional(),
    workspaceId: z.string(),
});