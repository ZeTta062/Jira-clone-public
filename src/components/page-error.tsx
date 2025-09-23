import { AlertTriangleIcon } from "lucide-react"

interface PageErrorProps {
    message: string;
}

export const PageError = ({
    message = "오류가 발생하였습니다."
}: PageErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <AlertTriangleIcon className="size-6 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
                {message}
            </p>
        </div>
    );
};
