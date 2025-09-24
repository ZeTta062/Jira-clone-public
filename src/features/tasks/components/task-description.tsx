import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DottedSeparator } from "@/components/dotted-separator";

import { Task } from "../types"
import { useUpdateTask } from "../api/use-update-task";


interface TaskDescriptionProps {
    task: Task;
}

const TaskDescription = ({ task }: TaskDescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState<string>(task.description ?? "");

    const { mutate, isPending } =useUpdateTask();

    const handleSave = () => {
        mutate({
            json: { description: value },
            param: { taskId: task.$id }
        }, {
            onSuccess: () => {
                setIsEditing(false)
            }
        });
    };

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">설명</p>
                <Button 
                    onClick={() => setIsEditing((prev) => !prev)}
                    size={"sm"}
                    variant={"secondary"}
                >
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? "취소" : "수정"}
                </Button>
            </div>
            <DottedSeparator className="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea 
                        placeholder="설명 추가..."
                        value={value}
                        rows={4}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={isPending}
                    />
                    <Button
                        size={"sm"}
                        className="w-fit ml-auto"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "저장중..." : "변경사항 저장"}
                    </Button>
                </div>
            ) : (
                <div>
                    {task.description || (
                        <span className="text-muted-foreground italic">
                            상세 설명이 없습니다.
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskDescription
