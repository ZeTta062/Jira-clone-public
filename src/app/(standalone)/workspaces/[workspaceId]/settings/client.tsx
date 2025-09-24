"use client"

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form"

import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"


const WorkspaceIdSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId })

    if (isLoading) {
        return <PageLoader />
    }

    if (!initialValues) {
        return <PageError message="워크스페이스를 찾을 수 없습니다." />
    }

    return (
        <div className="w-full lg:max-w-xl">
                <EditWorkspaceForm initialValues={initialValues} />
        </div>
    )
}

export default WorkspaceIdSettingsClient
