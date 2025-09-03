"use client"

import { Loader2 } from "lucide-react"


const LoadingPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
};

export default LoadingPage
