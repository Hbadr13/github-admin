
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "read:user user:email",
                },
            },
        }),
    ],
    secret: process.env.JWT_SECRET,

    callbacks: {
        async jwt({ token, account, profile }: any) {
            if (account) {
                token.access_token = account.access_token;
                if (profile) {
                    token.username = profile.login;
                    token.bio = profile.bio;
                    token.profileUrl = profile.html_url;
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            session.access_token = token.access_token;
            session.user.username = token.username;
            session.user.bio = token.bio;
            session.user.profileUrl = token.profileUrl;
            return session;
        },
    },
};