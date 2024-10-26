import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      console.log("Account: ", account);
      console.log("Profile: ", profile);
      console.log("User: ", user);

      if (account?.provider === "credentials") {
        token.email = user.email || "";
        token.role = user.role || "";
        token.fullname = user.fullname || "";
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user?.name || profile?.name || "",
          email: user?.email || profile?.email || "",
          image: user?.picture || profile?.picture || "",
          role: "user",
        };

        await signInWithGoogle(data, (result: any) => {
          if (result.status) {
            token.email = result.data.email;
            token.role = result.data.role;
            token.type = result.data.type;
            token.fullname = result.data.fullname;
            token.image = result.data.image;
          }
        });
      }
      return token;
    },

    async session({ session, token }: any) {
      console.log("Token in session callback: ", token);
      if (token?.email) {
        session.user.email = token.email;
      }
      if (token?.role) {
        session.user.role = token.role;
      }
      if (token?.fullname) {
        session.user.fullname = token.fullname;
      }
      if (token?.image) {
        session.user.image = token.image;
      }
      return session;
    },

    async redirect({ url, baseUrl }: any) {
      return "/home";
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

export default NextAuth(authOptions);
