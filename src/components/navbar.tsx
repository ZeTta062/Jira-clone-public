"use client";

import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import UserButton from "@/features/auth/components/user-button";
import Image from "next/image";
import { usePathname } from "next/navigation";


const pathnameMap = {
    "tasks": {
        title: "내 작업",
        description: "View all of your tasks here"
    },
    "projects": {
        title: "프로젝트",
        description: "View tasks of your project here"
    },
}

const defaultMap = {
    title: "워크스페이스",
    description: "Monitor all of your projects and tasks here"
}

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <MobileSidebar />
            <div className="flex lg:hidden">
                <Link href={"/"}>
                    <Image src={"/logo.svg"} alt="로고" width={164} height={48} />
                </Link>
            </div>
            <UserButton />
        </nav>
    );
};

