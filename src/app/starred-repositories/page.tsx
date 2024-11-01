"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
    access_token?: string;
}

interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
}

const StarredRepos: React.FC = () => {
    const { data: session } = useSession() as { data: ExtendedSession | null };
    const [starredRepos, setStarredRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStarredRepos = async () => {
            if (session && session.access_token) {
                try {
                    const response = await fetch("https://api.github.com/user/starred", {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch starred repositories");
                    }

                    const data = await response.json();
                    setStarredRepos(data); // Set the starred repositories
                } catch (error) {
                    console.error("Error fetching starred repositories:", error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchStarredRepos();
    }, [session]);

    if (loading) {
        return <div className="p-10 text-center">Loading starred repositories...</div>;
    }

    if (starredRepos.length === 0) {
        return <div className="p-10 text-center">No starred repositories found.</div>;
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Starred Repositories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {starredRepos.map(repo => (
                    <div key={repo.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{repo.name}</h2>
                        <p className="text-gray-600">{repo.description || "No description available."}</p>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View Repository
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarredRepos;
