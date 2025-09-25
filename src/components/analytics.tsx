import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

import { AnalyticsCard } from "./analytics-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { DottedSeparator } from "./dotted-separator";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row flex-wrap md:flex-wrap">
                <div className="flex items-center flex-1 min-w-[50%] md:min-w-0">
                    <AnalyticsCard 
                        title="총 작업 수"
                        value={data.taskCount}
                        variant={data.taskDifference > 0  ? "up" : "down"}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 min-w-[50%] md:min-w-0">
                    <AnalyticsCard 
                        title="할당된 작업"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifference > 0  ? "up" : "down"}
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DottedSeparator direction="vertical" className="hidden md:flex" />
                </div>
                <div className="flex items-center flex-1 min-w-[50%] md:min-w-0">
                    <AnalyticsCard 
                        title="작업 완료"
                        value={data.completedTaskCount}
                        variant={data.completedTaskDifference > 0  ? "up" : "down"}
                        increaseValue={data.completedTaskDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 min-w-[50%] md:min-w-[165px]">
                    <AnalyticsCard 
                        title="기한 만료 작업"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifference > 0  ? "up" : "down"}
                        increaseValue={data.overdueTaskDifference}
                    />
                    <DottedSeparator direction="vertical" className="hidden md:flex" />
                </div>
                <div className="flex items-center flex-1 min-w-[50%] md:min-w-0">
                    <AnalyticsCard 
                        title="미완료 작업"
                        value={data.IncompleteTaskCount}
                        variant={data.IncompleteTaskDifference > 0  ? "up" : "down"}
                        increaseValue={data.IncompleteTaskDifference}
                    />
                    <DottedSeparator direction="vertical" className="flex md:hidden" />
                </div>
                <div className="flex md:hidden items-center flex-1 min-w-[50%] md:min-w-0">
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
