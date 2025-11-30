import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectToDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await connectToDB();

        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) return null;

        if (!user.password) {
          throw new Error(
            "Please login using Google first. Then set password inside profile."
          );
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user._id, email: user.email, name: user.name };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Handle Google signup/login
    async signIn({ user, account }) {
      await connectToDB();

      if (account.provider === "google") {
        const exists = await User.findOne({ email: user.email });

        if (!exists) {
          await User.create({
            name: user.name,
            email: user.email,
            password: null, // allow setting password later
            googleUser: true,
          });
        }
      }

      return true;
    },

    // ← FIXED! comma added above
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
