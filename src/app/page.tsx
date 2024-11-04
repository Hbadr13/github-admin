'use client';
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link"; // Import Link for navigation
import Repositories from "../components/Repositories";


interface ExtendedSession extends Session {
  access_token?: string;
}

const MyComponent = () => {
  const { data: session } = useSession() as { data: ExtendedSession | null };

  if (!session)
    return

  return (
    <div className="">

      <div className="md:ml-5 p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {session.user?.name}</h1>

        <nav className="mt-2 font-semibold">
          <ul className="flex space-x-4">
            <li>
              <Link target="_blank" href="https://github.com/marketplace" className="text-blue-500 hover:underline">
                marketplace
              </Link>
            </li>
            <li>
              <Link href="/settings" className="text-blue-500 hover:underline">
                User Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Repositories />
    </div>
  );
};

export default MyComponent;
