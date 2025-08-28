import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.members[":memberId"]["$patch"]({ json, param });

            if (!response.ok) {
                throw new Error("Failed to update member");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success(" 멤버를 수정하였습니다.");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: () => {
            toast.error("멤버를 수정하는데 실패하였습니다.")
        }
    });

    return mutation;
};