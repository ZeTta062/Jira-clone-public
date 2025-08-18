import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.workspaces["$post"]({ json });

            if (!response.ok) {
                throw new Error("Failed to create workspace");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("워크스페이스를 만들었습니다.");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("워크스페이스를 만드는데 실패하였습니다.")
        }
    });

    return mutation;
};