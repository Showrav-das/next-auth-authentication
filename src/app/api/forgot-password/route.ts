import connectDB from "@/lib/db";
import { User } from "@/models/user";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

let secretKey = process.env.NEXTAUTH_SECRET;

export async function POST(request) {
  const { email } = await request.json();

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Generate a reset token
    // const resetToken = process.env.NEXTAUTH_SECRET;

    const resetToken = jwt.sign(
      { email, exp: Math.floor(Date.now() / 1000) + 60 * 5 },
      secretKey as string
    );

    // Save the reset token and expiry in the database
    await User.updateOne(
      { email },
      {
        $set: {
          verificationToken: resetToken,
        },
      }
    );

    // Send the reset token via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/?token=${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
    });

    return new Response("Password reset email sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
