import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { User } from "@/models/user";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing verification token" },
        { status: 400 }
      );
    }

    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, secretKey);
      console.log("decoded", decoded);
      const userEmail = (decoded as any).email;
      console.log("userEmail", userEmail);
      await connectDB();

      // Find and update user
      const user = await User.findOneAndUpdate(
        {
          email: userEmail,
          emailVerified: false,
          verificationToken: token,
        },
        {
          $set: {
            emailVerified: true,
            verificationToken: null,
          },
        },
        { new: true }
      );

      if (!user) {
        return NextResponse.json(
          { error: "Invalid verification token or user already verified" },
          { status: 400 }
        );
      }

      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protect`);
    } catch (jwtError) {
      // Handle JWT verification errors
      if (jwtError instanceof jwt.TokenExpiredError) {
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}/verify/failed`
        );
      }

      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
