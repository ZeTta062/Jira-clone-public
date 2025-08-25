import Link from "next/link";
import { SettingsIcon, UsersIcon } from "lucide-react";
import { 
    GoHome, 
    GoHomeFill, 
    GoCheckCircle, 
    GoCheckCircleFill, 
} from "react-icons/go";
import { cn } from "@/lib/utils";


const routes = [
    {
        label: "홈",
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "관리",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "팀",
        href: "/members",
        icon: UsersIcon,
        activeIcon: UsersIcon,
    },
];

export const Navigation = () => {
    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const isActive = false;
                const Icon = isActive ? item.activeIcon : item.icon

                return(
                    <Link key={item.href} href={item.href}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500" />
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}

