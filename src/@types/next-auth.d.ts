// src/@types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            username?: string | null; // Custom property
            profileUrl?: string | null; // Custom property
            bio?: string | null; // Custom property
        };
    }
}
