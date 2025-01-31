import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Sidebar from "@/components/sidebar"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Freshers",
    description: "Meet stats",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <div className="grid h-screen w-full pl-[56px]">
                        <Sidebar />
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
