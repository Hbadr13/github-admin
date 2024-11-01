"use client"

import { useEffect, useState } from "react";
import { Layout, List, Typography, Spin, Input, Button, Card } from "antd";
import Link from "next/link";
import { ShimmerPlaceholder } from "../../components/Repositories";

const { Title } = Typography;
const { Content } = Layout;

export default function OrgRepositories() {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [orgName, setOrgName] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = async () => {
        if (!orgName) return;
        setLoading(true);
        setError(null);
        setRepos([])
        try {
            const response = await fetch(
                `https://api.github.com/orgs/${orgName}/repos`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch repositories");
            }
            const data = await response.json();
            setRepos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <Content className="p-5 md:p-16">
                <Title level={2}>Search for Organization Repositories</Title>
                <div className="  md:space-x-2">

                    <Input

                        placeholder="Enter organization name (e.g., adobe)"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        style={{ marginBottom: "10px", width: "300px" }}
                    />
                    <Button type="primary" onClick={handleSearch} style={{ marginBottom: "20px" }}>
                        Search Repositories
                    </Button>
                    <Input
                        placeholder="Search repositories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: "20px", width: "300px" }}
                    />
                </div>
                {loading && <Spin tip="Loading repositories..." />}
                {error && <div className="p-3 bg-red-100 rounded-xl text-lg w-min truncate font-semibold mt-4">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => <ShimmerPlaceholder key={index} />)
                    ) : (
                        filteredRepos.map((repo) => (
                            <div key={repo.id} >
                                <Card className="hover:shadow-lg transition" bordered={false}>
                                    <Link target="_blank" href={'https://github.com/' + repo.owner.login + '/' + repo.name} className="text-lg font-bold text-blue-600">{repo.name}</Link>
                                    <p className="text-gray-600 mt-2">{repo.description || "No description available"}</p>
                                    <div className="mt-4 text-sm text-gray-500 space-y-1">
                                        <p>👑 Owner: {repo.owner.login}</p>
                                        <p>🖥 Language: {repo.language || "N/A"}</p>
                                        <p>⭐ Stars: {repo.stargazers_count}</p>
                                        <p>🍴 Forks: {repo.forks_count}</p>
                                        <p>🕒 Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                                        <p>🗓 Created on: {new Date(repo.created_at).toLocaleDateString()}</p>
                                    </div>

                                    {/* <Button className="mt-4" onClick={() => openDetailModal(repo)}>
                                        More info
                                    </Button> */}
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </Content>
        </Layout>
    );
}
