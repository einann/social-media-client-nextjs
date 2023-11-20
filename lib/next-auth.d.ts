import NextAuth from "next-auth";

// In order to access session. properties, we need to use this module.
declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            active: string;
            authLevel: string;
            firstName: string;
            lastName: string;
            birthday: string;
            email: string;
            profilePicture: string;
            signupDate: string;
            lastLoginDate: string;
            gender: string;
            verified: string;
        }
        tokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number,
        }
    }
}

////

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            username: string;
            active: string;
            authLevel: string;
            firstName: string;
            lastName: string;
            birthday: string;
            email: string;
            profilePicture: string;
            signupDate: string;
            lastLoginDate: string;
            gender: string
            verified: string;
        }
        tokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number,
        }
    }
}