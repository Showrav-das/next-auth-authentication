"use client";

import "./globals.css";
import { AuthProvider } from "@/hooks/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/customComponent/nav-bar";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
