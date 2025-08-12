import { z } from "zod";


export const loginSchema =z.object({
    email: z.string().trim().toLowerCase().min(1,"이메일 주소를 입력해주세요.").email("올바른 이메일 주소를 입력해주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
})

export const registerSchema = z.object({
    name: z.string().trim().min(1, "이름을 입력해주세요."),
    email: z.string().trim().toLowerCase().min(1,"이메일 주소를 입력해주세요.").email("올바른 이메일 주소를 입력해주세요."),
    password: z.string().min(8, "최소 8글자 이상의 비밀번호를 입력해주세요."),
})