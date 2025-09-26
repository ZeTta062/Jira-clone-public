"use client";

import { z } from "zod"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { loginSchema } from "../schemas"
import { useLogin } from "../api/use-login"
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";


export const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({
            json: values,
        });
    }

    return (
        <div className="flex flex-col gap-y-7">
            <Card className="w-full h-full md:w-[487px] border-none shadow-none">
                <CardHeader className="flex items-center justify-center text-center p-7">
                    <CardTitle className="text-2xl">
                        환영합니다!
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField 
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="email"
                                                placeholder="이메일을 입력해주세요."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="password"
                                                placeholder="비밀번호를 입력해주세요."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending} size={"lg"} className="w-full">
                                로그인
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7 flex flex-col gap-y-4">
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        className="w-full"
                        disabled={isPending}
                        onClick={() => signUpWithGoogle()}
                    >
                        <FcGoogle className="mr-2 size-5" />
                        구글로 로그인
                    </Button>
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        className="w-full"
                        disabled={isPending}
                        onClick={() => signUpWithGithub()}
                    >
                        <FaGithub className="mr-2 size-5" />
                        깃허브로 로그인
                    </Button>
                </CardContent>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7 flex flex-col items-center justify-center">
                    <p>
                        아직 Jira Clone의 계정이 없다면?
                        <Link href="/sign-up"  className="text-blue-700">
                            &nbsp;회원가입
                        </Link>
                    </p>
                </CardContent>
            </Card>
            <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-2xl">
                    테스트용 계정
                </CardTitle>
            </CardHeader>
            <div className="px-7">
            <DottedSeparator />
            </div>
            <CardContent>
                <p>
                    ID: test@naver.com
                </p>
                <p>
                    비밀번호: 123456789
                </p>
            </CardContent>
        </Card>
    </div>
    )
}
