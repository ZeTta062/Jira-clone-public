"use client"

import { z } from "zod";
import { useRef } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Workspace } from "../types";
import { updateWorkspaceSchema } from "../schemas";
import { useUpdateWorkspace } from "../api/use-update-workspace";

interface EditWorkspaceFormPros {
    onCancel?: () => void;
    initialValues: Workspace;
};

export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormPros) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateWorkspace();
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate({ 
            form: finalValues,
            param: { workspaceId: initialValues.$id }
        }, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`);
            }
        });
    };

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <Button size={"sm"} variant={"secondary"} onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}>
                    <ArrowLeftIcon className="size-4 mr-2" />
                    뒤로
                </Button>
                <CardTitle className="text-xl font-bold">
                    {initialValues.name}
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            워크스페이스 이름
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="워크스페이스 이름을 입력하세요."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image 
                                                        src={
                                                            field.value instanceof File
                                                            ? URL.createObjectURL(field.value)
                                                            : field.value
                                                        }
                                                        fill
                                                        alt="로고"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback >
                                                        <ImageIcon className="size-[36px] text-neutral-400" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm">워크스페이스 아이콘</p>
                                                <p className="text-sm text-muted-foreground">
                                                    JPG, PNG, SVG 또는 JPEG | 최대 1mb
                                                </p>
                                                <input 
                                                    className="hidden"
                                                    accept=".jpg, .png, .svg, .jpeg"
                                                    type="file"
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                    disabled={isPending}
                                                />
                                                {field.value ?(
                                                    <Button
                                                        type="button"
                                                        variant={"destructive"}
                                                        size={"xs"}
                                                        className="w-fit mt-2"
                                                        onClick={() => {
                                                            field.onChange(null);
                                                            if (inputRef.current) {
                                                                inputRef.current.value = "";
                                                            }
                                                        }}
                                                        disabled={isPending}
                                                    >
                                                        이미지 제거
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant={"tertiary"}
                                                        size={"xs"}
                                                        className="w-fit mt-2"
                                                        onClick={() => inputRef.current?.click()}
                                                        disabled={isPending}
                                                    >
                                                        이미지 업로드
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                variant={"secondary"}
                                size={"lg"}
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                취소
                            </Button>
                            <Button
                                type="submit"
                                size={"lg"}
                                disabled={isPending}
                            >
                                저장
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
