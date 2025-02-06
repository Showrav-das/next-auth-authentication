import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { date } from "zod";

export async function POST(req, res) {
  const { token, password } = await req.json();
  //   const { token, password } = req.body;
  console.log("token:", token, password);
  try {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }

    // Verify the JWT reset token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretKey);
      console.log("d", decodedToken);
      //   decodedToken = jwt.verify(token, secret as string);
    } catch (error) {
      console.log("first");
    }
    console.log("decode: ", decodedToken, secretKey);
    // const { userId } = decodedToken as jwt.JwtPayload;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password in the database
    await connectDB();

    const a = await User.updateOne(
      { verificationToken: { $gt: Date.now() } },
      { $set: { password: hashedPassword } }
    );

    return new Response("Password reset successfully", { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response("Password reset not successfully", { status: 500 });
  }
}
