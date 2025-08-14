"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";
import { useCurrent } from "@/features/auth/api/use-current";

export default function Home() {
    const router = useRouter();
    const { data, isLoading } = useCurrent();
    const { mutate } = useLogout();

    useEffect(() => {
        if (!data && !isLoading) {
            router.push("/sign-in");
        }
    }, [data]);

    return (
        <div className="">
            Only visible to authorized users.
            <Button onClick={() => mutate()}>
                로그아웃
            </Button>
        </div>
    );
};
