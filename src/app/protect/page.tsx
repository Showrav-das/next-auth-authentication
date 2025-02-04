"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   // Check if the user is trying to access the "protect" page
  //   if (pathname === "/protect" && status === "unauthenticated") {
  //     router.push("/login"); // Redirect to login if not authenticated
  //   }
  // }, [pathname, status, router]);

  // console.log("session", session);

  // if (status === "loading") {
  //   return <p>Loading...</p>; // Show loading state while checking session
  // }

  return <div>Protect page</div>;
}
