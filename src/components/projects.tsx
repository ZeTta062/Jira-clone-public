"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";


export const Projects = () => {
    const projectId = null // Todo: Use the useProjectId hook

    const pathname = usePathname();
    const { open } = useCreateProjectModal();
    const workspaceId = useWorkspaceId();
    const { data } = useGetProjects({ 
        workspaceId,
    });

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">프로젝트</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
            </div>
            {data?.documents.map((project) => {
                const href = `/workspaces/${workspaceId}/projects/${projectId}`;
                const isActive = pathname === `/workspaces/${workspaceId}/projects/${projectId}`;

                return (
                    <Link href={href} key={project.$id}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <ProjectAvatar image={project.imageUrl} name={project.name} />
                            <span className="truncated">{project.name}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}