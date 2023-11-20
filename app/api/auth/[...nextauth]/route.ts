// Every request incoming to /api/auth/### will be handled by this file

import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch("http://localhost:3001/auth/refresh", {
        method: "POST",
        headers: {
            "Authorization": `Refresh ${token.tokens.refresh_token}`
        }
    });

    const response = await res.json();
    return {
        ...token,
        tokens: response,
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                const { username, password } = credentials!;

                const res = await fetch("http://localhost:3001/auth", {        // Base URL will be imported from a constants file or .env file.
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.status == 401) {
                    return null;
                }

                const user = await res.json();
                return user;

            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // This function will be called everytime session is checked
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            if (new Date().getTime() < token.tokens.expiresIn) {
                return token;
            }
            return await refreshToken(token);
        },
        // Everytime useSession hook used or getServerSession function called, this function will be executed
        async session({ token, session }) {
            session.user = token.user;
            session.tokens = token.tokens;
            return session;
        }

    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };