import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

const NotoSansKR = Noto_Sans_KR({subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jira Clone",
  description: "Jira를 클론코딩하여 만든 앱입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={cn(NotoSansKR.className, "antialiased min-h-screen")}
            >
                <QueryProvider>
                    <Toaster />
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
