import { Loader2Icon } from "lucide-react"

export const PageLoader = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
};
