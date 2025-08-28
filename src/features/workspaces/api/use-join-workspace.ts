import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"]>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.workspaces[":workspaceId"]["join"]["$post"]({ json, param });

            if (!response.ok) {
                throw new Error("Failed to join workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("워크스페이스 입장 완료!");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
        },
        onError: () => {
            toast.error("워크스페이스에 들어가는데 실패했어요.")
        }
    });

    return mutation;
};