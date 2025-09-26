import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import UserButton from "@/features/auth/components/user-button";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">Home</h1>
                <p className="text-muted-foreground">
                    Monitor all of your projects and tasks here
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

