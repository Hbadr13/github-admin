
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { authOptions } from "../../../../utils/authOptions";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

