"use client";

import { z } from "zod";
import { useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Project } from "../types";
import { updateProjectSchema } from "../schemas";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

interface EditProjectFormPros {
    onCancel?: () => void;
    initialValues: Project;
};

export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormPros) => {
    const router = useRouter();
    const { mutate, isPending } = useUpdateProject();
	const { 
		mutate: deleteProject, 
		isPending: isDeletingProject 
	} = useDeleteProject();


	const [DeleteDialog, confirmDelete] = useConfirm(
        "프로젝트 삭제",
		"프로젝트를 삭제하는 것은 되돌릴 수 없으며 관련된 모든 데이터를 제거합니다.",
		"destructive",
	);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        }
    });

	const handleDelete = async () => {
		const ok = await confirmDelete();

		if(!ok) return;

		deleteProject({
			param: { projectId: initialValues.$id },
		}, {
			onSuccess: () => {
				window.location.href = `/workspaces/${initialValues.workspaceId}`;
			},
		});
	};

    const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate({ 
            form: finalValues,
            param: { projectId: initialValues.$id }
        }, {
            onSuccess: () => {
                form.reset();
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
        <div className="flex flex-col gap-y-4">
			<DeleteDialog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                    <Button size={"sm"} variant={"secondary"} onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}>
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
                                                프로젝트 이름
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="프로젝트 이름을 입력하세요."
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
                                                    <p className="text-sm">프로젝트 아이콘</p>
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
                                    변경사항 저장
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7" >
					<div className="flex flex-col">
						<h3 className="font-bold">Danger Zone</h3>
						<p className="text-sm text-muted-foreground">
							프로젝트를 삭제하는 것은 되돌릴 수 없으며 관련된 모든 데이터를 제거합니다.
						</p>
                        <DottedSeparator className="py-7" />
						<Button
							className="mt-6 w-fit ml-auto"
							size={"default"}
							variant={"destructive"}
							type="button"
							disabled={isPending}
							onClick={handleDelete}
						>
							프로젝트 삭제
						</Button>
					</div>
                </CardContent>
            </Card>
        </div>
    );
};
