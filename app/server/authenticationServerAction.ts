import { NextResponse } from "next/server";
import { connectToDatabase } from "../libs/mongodb";
import bcrypt from "bcryptjs";
import { createUser } from "./usersAction";

export const registrationUser = async (formData: any) => {
  const { username, email, password } = formData;

  const response = await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  console.log("res:", response);
  return response;
};
