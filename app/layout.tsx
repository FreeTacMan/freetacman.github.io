import type { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CustomTrigger } from "@/components/ui/sidebartrigger"

import "./globals.css";


// font
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Google Analystics
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body id="#">       
        <SidebarProvider>
          <header>
            <AppSidebar />

            <div className="fixed flex flex-row gap-3 mt-6 px-6 md:p-0 md:m-6 z-20 flex-wrap w-full justify-end md:justify-end md:w-auto">
              <CustomTrigger />
            </div>

            <div className="fixed right-0 bottom-0 m-6 z-20">
              <Link href="#" className="bg-background text-foreground hover:bg-o-blue hover:text-background rounded-full flex justify-center items-center p-2 select-none">
                <span>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </header>

          {children}
        </SidebarProvider>
        
        <GoogleAnalytics gaId="G-L7VEDHS6G8" />
      </body>
    </html>
  );
}
