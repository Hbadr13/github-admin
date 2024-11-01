"use client"

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (status === "loading") return;
        if (!session && pathname !== "/login") {
            router.push("/login");
        }

        if (session && pathname === "/login") {
            router.push("/");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return <>{children}</>;
};
export default AuthGuard