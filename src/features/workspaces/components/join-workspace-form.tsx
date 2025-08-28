"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useJoinWorkspace } from "../api/use-join-workspace";


interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    };
}

export const JoinWorkspaceForm = ({
    initialValues,
}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`);
            },
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    워크스페이스에 참가
                </CardTitle>
                <CardDescription>
                    <strong>{initialValues.name}</strong> 워크스페이스에 초대 받았어요.
                </CardDescription>
                <div className="px-7">
                    <DottedSeparator />
                </div>
                <CardContent className="p-7" >
                    <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                        <Button
                            variant={"secondary"}
                            size={"lg"}
                            type="button"
                            asChild
                            className="w-full lg:w-fit"
                            disabled={ isPending }
                        >
                            <Link href={"/"}>
                                취소
                            </Link>
                        </Button>
                        <Button
                            size={"lg"}
                            type="button"
                            className="w-full lg:w-fit"
                            onClick={onSubmit}
                            disabled={ isPending }
                        >
                            워크스페이스 참가
                        </Button>
                    </div>
                </CardContent>
            </CardHeader>

        </Card>
    )
}