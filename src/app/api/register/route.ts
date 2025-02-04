import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "@/models/user";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/email";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.safeParse(body);

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    let secretKey = process.env.NEXTAUTH_SECRET;

    const verificationToken = jwt.sign(
      { email: body.email, exp: Math.floor(Date.now() / 1000) + 60 * 2 },
      secretKey as string
    );

    // Create user
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
    });

    await sendVerificationEmail(body?.email, verificationToken);

    // Send verification email
    // await sendVerificationEmail(body.email, verificationToken);

    return NextResponse.json(
      {
        message:
          "Registration successful. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
