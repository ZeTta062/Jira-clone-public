import { PencilIcon } from "lucide-react";

import { MemberAvatar } from "@/features/members/components/member-avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";

import TaskDate from "./task-date";
import { STATUS_KO, Task } from "../types"
import { OverviewProperty } from "./overview-property";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";


interface TaskOverviewProps{
    task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
    const { open } = useEditTaskModal();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        개요
                    </p>
                    <Button
                        onClick={() => open(task.$id)}
                        size={"sm"}
                        variant={"secondary"}
                    >
                        <PencilIcon className="size-4 mr-2" />
                        수정
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty
                        label="담당자"
                    >
                        <MemberAvatar 
                            name={task.assignee?.name || ""}
                            className="size-6"
                        />
                        <p className="text-sm font-medium">
                            {task.assignee?.name}
                        </p>
                    </OverviewProperty>
                    <OverviewProperty
                        label="기한 날짜"
                    >
                        <TaskDate value={task.dueDate} className="text-sm font-medium" />
                    </OverviewProperty>
                    <OverviewProperty
                        label="상태"
                    >
                        <Badge variant={task.status}>
                            {STATUS_KO[task.status]}
                        </Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    )
}

