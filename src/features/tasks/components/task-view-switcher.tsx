"use client"

import { useCallback } from "react"
import { useQueryState } from "nuqs"
import { Loader2, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/dotted-separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useGetTasks } from "../api/use-get-tasks"
import { useTaskFilters } from "../hooks/use-task-filters"
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks"
import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { TaskStatus } from "../types"
import { columns } from "./columns"
import { DataFilter } from "./data-filter"
import { DataTable } from "./data-table"
import DataKanban from "./data-kanban"
import { DataCalendar } from "./data-calendar"


export const TaskViewSwitcher = () => {
    const [{
        status,
        assigneeId,
        projectId,
        dueDate
    }, setFilters] = useTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    })

    const workspaceId = useWorkspaceId();
    const { open } = useCreateTaskModal();
    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const { 
        data: tasks, 
        isLoading: isLoadingTasks 
    } = useGetTasks({ 
        workspaceId,
        projectId,
        assigneeId,
        status,
        dueDate
    });

    const onKanbanChange = useCallback((
        tasks: { $id: string; status: TaskStatus; position: number; }[]
    ) => {
        bulkUpdate({
            json: { tasks },
        });
    }, [bulkUpdate]);

    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            목록
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            보드
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            캘린더
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        size={"sm"}
                        className="w-full lg:w-auto"
                        onClick={open}
                    >
                        <PlusIcon className="size-4 mr-2" />
                        만들기
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                    <DataFilter />
                <DottedSeparator className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable columns={columns} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0 h-full pb-4">
                            <DataCalendar data={tasks?.documents ?? []} />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    )
}