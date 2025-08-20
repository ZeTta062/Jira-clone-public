import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();


    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();

            if (!response.ok) {
                throw new Error("Failed to Logout");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("로그아웃에 성공하였습니다.")
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("로그아웃에 실패하였습니다.")
        }
    });

    return mutation;
};