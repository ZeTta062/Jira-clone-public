import { toast } from "sonner";
import { client } from "@/lib/rpc";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$delete"]>;

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ param }) => {
            const response = await client.api.tasks[":taskId"]["$delete"]({ param });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success(`작업을 삭제했습니다.`);

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
            queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
        },
        onError: () => {
            toast.error("작업을 삭제하는데 실패하였습니다.")
        }
    });

    return mutation;
};