import { Loader2 } from "lucide-react"

const DashboardLoading = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground"/>
        </div>
    )
}

export default DashboardLoading;
