"use client";

import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


interface DatePickerProps {
    value?: Date;
    onChange: (date?: Date) => void;
    className?: string;
    placeholder?: string;
}

const DatePicker = ({
    value,
    onChange,
    className,
    placeholder = "날짜를 선택하세요.",
}: DatePickerProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"lg"}
                    className={cn(
                        "w-full justify-start text-left font-normal px-3",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP", { locale: ko }) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                    locale={ko}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker
