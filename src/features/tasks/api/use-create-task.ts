import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["$post"]({ json });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("과제를 만들었습니다.");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            toast.error("과제를 만드는데 실패하였습니다.")
        }
    });

    return mutation;
};