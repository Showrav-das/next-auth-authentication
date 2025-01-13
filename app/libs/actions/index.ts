"use server";
import { signIn } from "../auth";

export const signinAction = async (formData: any) => {
  console.log("form action:", formData.email);
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
