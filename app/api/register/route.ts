import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/libs/mongodb";
import { createUser } from "@/app/server/usersAction";

export const POST = async (request) => {
  const { username, email, password } = await request.json();

  // Create a DB Conenction
  await connectToDatabase();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 6);
  // Form a DB payload
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
