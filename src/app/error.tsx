"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"


const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
            <AlertTriangle className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
                오류가 발생하였습니다!
            </p>
            <Button variant={"secondary"} size={"sm"}>
                <Link href={"/"}>
                    홈페이지로
                </Link>
            </Button>
        </div>
    )
}

export default ErrorPage
