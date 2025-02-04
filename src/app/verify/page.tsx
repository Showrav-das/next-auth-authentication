"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-6xl overflow-hidden">
        <CardContent className="p-0 grid md:grid-cols-2 gap-6">
          {/* Left side - Illustration */}
          <div className="relative bg-[#8CC6DB] p-8 flex items-center justify-center rounded-l-lg">
            {/* <Image
              src="/placeholder.svg"
              alt="Meditation illustration"
              width={400}
              height={400}
              className="object-contain"
            /> */}
          </div>

          {/* Right side - Sign up form */}
          <div className="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">
                  Sign up in to your{" "}
                  <span className="text-[#8CC6DB]">Mindfulness</span>
                </h1>
                <p className="text-gray-500">
                  Signup to get started and indulge in mindfulness
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12"
                />
                <Input
                  type="password"
                  placeholder="Set a password"
                  className="h-12"
                />
                <Button className="w-full h-12 text-white bg-[#8CC6DB] hover:bg-[#7AB5CA]">
                  Get started
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  {/* <Separator /> */}
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    or continue signing up using
                  </span>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  className="w-[100px] h-12"
                  aria-label="Sign up with Google"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Google logo"
                    width={24}
                    height={24}
                  />
                </Button>
                <Button
                  variant="outline"
                  className="w-[100px] h-12"
                  aria-label="Sign up with Facebook"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Facebook logo"
                    width={24}
                    height={24}
                  />
                </Button>
                <Button
                  variant="outline"
                  className="w-[100px] h-12"
                  aria-label="Sign up with Apple"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Apple logo"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
