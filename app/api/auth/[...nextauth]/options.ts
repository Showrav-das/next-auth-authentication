import { User } from "@/app/model/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          email: "Username",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials === null) {
          return null;
        }
        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);
          if (user) {
            const isMatch = user?.password === credentials.password;
            if (isMatch) {
              return user;
            } else {
              throw new Error("Invalid credentials");
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
  ],
});
