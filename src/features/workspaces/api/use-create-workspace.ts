import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form }) => {
            const response = await client.api.workspaces["$post"]({ form });

            if (!response.ok) {
                throw new Error("Failed to create workspace");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("워크스페이스를 만들었습니다.");

            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("워크스페이스를 만드는데 실패하였습니다.")
        }
    });

    return mutation;
};