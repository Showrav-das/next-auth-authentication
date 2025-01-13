import { NextResponse } from "next/server";


import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/libs/mongodb";
import { createUser } from "@/app/server/usersAction";


export const POST = async (request:any) => {
  const {name, email, password} = await request.json();

  console.log(name, email, password);

  // Create a DB Conenction
  await connectToDatabase();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email
  }
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err:any) {
    return new NextResponse(err.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

 }