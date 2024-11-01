"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  access_token?: string;
}

function Page() {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              Accept: "application/vnd.github.v3+json",
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-10">
        <h2 className="text-3xl font-semibold">No user data available.</h2> // No data state
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">User Settings</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="font-medium">Username:</span>
            <span>{userData.login}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ID:</span>
            <span>{userData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{userData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Bio:</span>
            <span>{userData.bio}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Public Repos:</span>
            <span>{userData.public_repos}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Followers:</span>
            <span>{userData.followers}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Following:</span>
            <span>{userData.following}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Profile URL:</span>
            <span>
              <a
                className="text-blue-500 hover:underline"
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userData.html_url}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
