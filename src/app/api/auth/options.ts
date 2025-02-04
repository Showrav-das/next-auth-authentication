import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";
import connectDB from "@/lib/db";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/verify/failed", // Ensure this page handles errors gracefully
    verifyRequest: "/verify",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Ensure fields match your app requirements
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ?? true, // Default to true for Google
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
          emailVerified: true, // Facebook emails are verified by default
        };
      },
    }),

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

        if (!user.password) {
          throw new Error(
            "Please sign in with the method you used to register"
          );
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

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
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    },

    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     if (!profile?.email) {
    //       throw new Error("No email found from Google provider");
    //     }

    //     await connectDB();

    //     const existingUser = await User.findOne({ email: profile.email });
    //     if (!existingUser) {
    //       // Create a new user if they do not already exist
    //       await User.create({
    //         email: profile.email,
    //         name: profile.name,
    //         emailVerified: true, // Google accounts are pre-verified
    //       });
    //     }
    //   }
    //   return true;
    // },

    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        // Updated this line
        if (!profile?.email) {
          throw new Error(`No email found from ${account.provider} provider`);
        }

        await connectDB();

        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          // Create a new user if they don't exist
          await User.create({
            email: profile.email,
            name: profile.name,
            emailVerified: true, // Both Google and Facebook accounts are pre-verified
            // image: account.provider === "facebook"
            //   ? profile.picture?.data?.url
            //   : profile.picture, // Handle different image formats
          });
        }
      }
      return true;
    },
  },
};
