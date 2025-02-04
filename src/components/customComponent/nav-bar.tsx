"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };
  return (
    <nav className="w-full h-16 border-b bg-white">
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center">
          {/* <Image
            src="/placeholder.svg"
            alt="Mindfulness Logo"
            width={40}
            height={40}
          /> */}
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          {session?.user?.email ? (
            //  <Link href="/login">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-gray-600"
            >
              Sign Out
            </Button>
          ) : (
            //  </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600">
                Sign In
              </Button>
            </Link>
          )}
          <Link href="/register">
            <Button className="bg-[#8CC6DB] text-white hover:bg-[#7AB5CA]">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
