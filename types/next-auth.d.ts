import type { User as PrismaUser, Role as UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends AdapterUser {
    role: UserRole;
  }

  interface Session extends DefaultSession {
    sessionToken: string;
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends PrismaUser {
    sessionToken?: string;
  }
}
