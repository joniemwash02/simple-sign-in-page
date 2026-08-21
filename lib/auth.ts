import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

import { sendPasswordResetEmail } from "./email";

const adapter = new PrismaPg(
  process.env.DATABASE_URL!
);

const prisma = new PrismaClient({
  adapter,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    autoSignIn: false,

    // Password reset
    sendResetPassword: async ({
      user,
      url,
      token,
    }) => {
      console.log(
        "Password reset requested for:",
        user.email
      );

      console.log(
        "Reset URL:",
        url
      );

      await sendPasswordResetEmail(
        user.email,
        url
      );
    },

    // Optional but recommended
    revokeSessionsOnPasswordReset: true,

    // Reset token expires after 1 hour
    resetPasswordTokenExpiresIn: 3600,
  },

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",
});