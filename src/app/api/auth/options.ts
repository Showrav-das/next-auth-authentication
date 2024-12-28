import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";
import connectDB from "@/lib/db";
// import clientPromise from "./mongodb";

export const authOptions: NextAuthOptions = {
  //   adapter: MongoDBAdapter(clientPromise),
  //   secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    // error: "/auth/error",
    verifyRequest: "/verify",
  },

  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       emailVerified: profile.email_verified,
    //     };
    //   },
    // }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if the user signed up with OAuth
        if (!user.password) {
          throw new Error(
            "Please sign in with the method you used to register"
          );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("isPasswordValid", isPasswordValid);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Check if email is verified
        // if (!user.emailVerified) {
        //   throw new Error("Please verify your email before signing in");
        // }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     if (!profile?.email) {
    //       throw new Error("No email found from Google provider");
    //     }

    //     await connectDB();

    //     // Check if user already exists
    //     const existingUser = await User.findOne({ email: profile.email });

    //     if (!existingUser) {
    //       // Create new user if doesn't exist
    //       await User.create({
    //         email: profile.email,
    //         name: profile.name,
    //         emailVerified: true, // Google accounts are pre-verified
    //       });
    //     }
    //   }
    //   return true;
    // },
  },
};
