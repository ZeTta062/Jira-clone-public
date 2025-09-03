import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>;

export const useUpdateProject = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.projects[":projectId"]["$patch"]({ form, param });

            if (!response.ok) {
                throw new Error("Failed to update project");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("프로젝트를 수정했습니다.");
            
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
        },
        onError: () => {
            toast.error("프로젝트를 수정하는데 실패하였습니다.")
        }
    });

    return mutation;
};