import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import DatePicker from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_KO, TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";


interface DataFiltersProps {
    hideProjectFilter?: boolean;
}


export const DataFilter = ({ hideProjectFilter }: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } =useGetMembers({ workspaceId });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name,
    }));

    const [{
        status,
        assigneeId,
        projectId,
        dueDate
    }, setFilters] = useTaskFilters();

    const onStatusChange = (value: string) => {
        setFilters({ status: value === "all" ? null : value as TaskStatus });
    };

    const onAssigneeChange = (value: string) => {
        setFilters({ assigneeId: value === "all" ? null : value as string });
    };

    const onProjectChange = (value: string) => {
        setFilters({ projectId: value === "all" ? null : value as string });
    };

    if (isLoading) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2" />
                        <SelectValue placeholder="모든 상태" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all"> 모든 상태</SelectItem>
                    <SelectSeparator /> 
                    <SelectItem value={TaskStatus.BACKLOG}> {STATUS_KO.BACKLOG}</SelectItem>
                    <SelectItem value={TaskStatus.TODO}> {STATUS_KO.TODO}</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}> {STATUS_KO.IN_PROGRESS}</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}> {STATUS_KO.IN_REVIEW}</SelectItem>
                    <SelectItem value={TaskStatus.DONE}> {STATUS_KO.DONE}</SelectItem>
                </SelectContent>
            </Select>

            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="담당자" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all"> 담당자</SelectItem>
                    <SelectSeparator /> 
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                defaultValue={projectId ?? undefined}
                onValueChange={(value) => onProjectChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <FolderIcon className="size-4 mr-2" />
                        <SelectValue placeholder="프로젝트" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all"> 프로젝트</SelectItem>
                    <SelectSeparator /> 
                    {projectOptions?.map((project) => (
                        <SelectItem key={project.value} value={project.value}>
                            {project.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <DatePicker
                placeholder="기한 날짜"
                className="h-12 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({dueDate: date ? date.toISOString() : null })
                }}
            />
        </div>
    )
}
