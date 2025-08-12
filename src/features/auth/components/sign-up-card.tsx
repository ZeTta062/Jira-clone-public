import { z } from "zod"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"


const formSchema = z.object({
    name: z.string().trim().min(1, "이름을 입력해주세요."),
    email: z.string().trim().toLowerCase().min(1,"이메일 주소를 입력해주세요.").email("올바른 이메일 주소를 입력해주세요."),
    password: z.string().min(8, "최소 8글자 이상의 비밀번호를 입력해주세요."),
})

export const SignUpCard = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log ({ values });
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex flex-col items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    회원가입
                </CardTitle>
                <CardDescription className="mt-2">
                    회원가입 시 {" "}
                    <Link href={"/privacy"} >
                        <span className="text-blue-700">개인정보처리방침</span>
                    </Link>{" "}
                    및 {" "}
                    <Link href={"/terms"} >
                        <span className="text-blue-700">운영정책</span>
                    </Link>
                    에 동의한 것으로 간주됩니다.
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            type="text"
                                            placeholder="이름을 입력해주세요."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button disabled={false} size={"lg"} className="w-full">
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
                    disabled={false}
                >
                    <FcGoogle className="mr-2 size-5" />
                    구글로 로그인
                </Button>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className="w-full"
                    disabled={false}
                >
                    <FaGithub className="mr-2 size-5" />
                    깃허브로 로그인
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    이미 Jira Clone의 계정이 있다면?
                    <Link href="/sign-in"  className="text-blue-700">
                        &nbsp;로그인
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}
