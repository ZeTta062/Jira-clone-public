import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>;

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.tasks[":taskId"]["$patch"]({ json, param });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("작업을 수정했습니다.");

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task", data.$id] });

        },
        onError: () => {
            toast.error("작업을 수정하드는데 실패하였습니다.")
        }
    });

    return mutation;
};