'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Button, Pagination, Select, Input, Spin, Card, Modal, message } from "antd";
import Link from "next/link";

const { Option } = Select;

interface Repository {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    language: string | null;
    created_at: string;
    topics: string[];
    starred: boolean;
    owner: { login: string };
}

interface ExtendedSession extends Session {
    access_token?: string;
}
export const ShimmerPlaceholder = () => (
    <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-200/50 rounded mb-2"></div>
        <div className="h-4 bg-gray-200/50 rounded mb-2"></div>
        <div className="h-4 bg-gray-200/50 rounded mb-2"></div>
    </div>
);

const Repositories = () => {
    const { data: session } = useSession() as { data: ExtendedSession | null };
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
    const [description, setDescription] = useState<string>("");
    const [topics, setTopics] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState<boolean>(true);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [languageFilter, setLanguageFilter] = useState<string | undefined>(undefined);
    const [dateFilter, setDateFilter] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRepoModalVisible, setIsRepoModalVisible] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null); // State for selected repository

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            setError(null);

            if (session?.access_token) {
                try {
                    const response = await fetch('https://api.github.com/user/repos', {
                        headers: { Authorization: `Bearer ${session.access_token}` },
                    });

                    if (response.ok) {
                        const repos = await response.json();
                        setRepositories(repos);
                    } else {
                        setError("Failed to fetch repositories. Please try again later.");
                        message.error("Failed to fetch repositories.");
                    }
                } catch (error) {
                    setError("An error occurred while fetching repositories.");
                    message.error("An error occurred while fetching repositories.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [session]);

    const toggleStar = async (repo: Repository) => {
        const action = repo.starred ? 'DELETE' : 'PUT';
        const starUrl = `https://api.github.com/user/starred/${repo.owner.login}/${repo.name}`;
        setError(null);

        try {
            const response = await fetch(starUrl, {
                method: action,
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });

            if (response.ok) {
                setRepositories((prev) =>
                    prev.map((r) => (r.id === repo.id ? { ...r, starred: !r.starred } : r))
                );
                message.success(`Repository ${repo.starred ? "unstarred" : "starred"} successfully!`);
            } else {
                setError("Failed to star/unstar repository.");
                message.error("Failed to star/unstar repository.");
            }
        } catch (error) {
            setError("An error occurred while star/unstar repository.");
            message.error("An error occurred while star/unstar repository.");
        }
    };

    const openEditModal = (repo: Repository) => {
        setEditingRepo(repo);
        setDescription(repo.description || "");
        setTopics(repo.topics.join(", "));
        setIsModalVisible(true);
    };

    const updateRepository = async () => {
        setError(null);
        if (editingRepo && session?.access_token) {
            try {
                const response = await fetch(`https://api.github.com/repos/${editingRepo.owner.login}/${editingRepo.name}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        description,
                        topics: topics.split(',').map((topic) => topic.trim()),
                    }),
                });

                if (response.ok) {
                    const updatedRepo = await response.json();
                    setRepositories((prev) =>
                        prev.map((r) => (r.id === updatedRepo.id ? updatedRepo : r))
                    );
                    message.success("Repository updated successfully!");
                } else {
                    setError("Failed to update repository.");
                    message.error("Failed to update repository.");
                }
            } catch (error) {
                setError("An error occurred while updating repository.");
                message.error("An error occurred while updating repository.");
            } finally {
                setIsModalVisible(false);
                setEditingRepo(null);
            }
        }
    };

    const handleLanguageChange = (value: string | undefined) => {
        setLanguageFilter(value);
        setCurrentPage(1);
    };

    const filteredRepos = repositories.filter(repo =>
        repo.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (languageFilter ? repo.language?.toLowerCase() === languageFilter.toLowerCase() : true) &&
        (dateFilter ? new Date(repo.created_at).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true)
    );

    const uniqueLanguages = Array.from(new Set(repositories.map(repo => repo.language).filter(lang => lang)));
    const openDetailModal = (repo: Repository) => {
        setSelectedRepo(repo);
        setIsRepoModalVisible(true);
    };
    const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
    const currentRepos = filteredRepos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="p-8 font-medium">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Repositories</h2>

            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                <Input placeholder="Search by name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="mb-2 md:mb-0" />
                <Select placeholder="Select language" value={languageFilter} onChange={handleLanguageChange} className="w-full mb-2 md:mb-0">
                    {uniqueLanguages.map((lang) => (
                        <Option key={lang} value={lang}>
                            {lang}
                        </Option>
                    ))}
                </Select>
                <Input type="date" placeholder="Search by creation date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => <ShimmerPlaceholder key={index} />)
                ) : (
                    currentRepos.map((repo) => (
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
                                <Button className="mt-4 mr-2" type="primary" onClick={() => toggleStar(repo)}>
                                    {repo.starred ? "Unstar" : "Star"}
                                </Button>
                                <Button className="mt-4 mr-2" onClick={() => openEditModal(repo)}>
                                    Edit
                                </Button>
                                <Button className="mt-4" onClick={() => openDetailModal(repo)}>
                                    More info
                                </Button>
                            </Card>
                        </div>
                    ))
                )}
            </div>

            <Pagination
                className="mt-8"
                current={currentPage}
                total={filteredRepos.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
            />
            <Modal
                title={selectedRepo ? selectedRepo.name : "Repository Details"}
                visible={isRepoModalVisible}
                onCancel={() => setIsRepoModalVisible(false)}
                footer={null}
            >
                {selectedRepo && (
                    <div>
                        <h3 className="text-lg font-bold">Description:</h3>
                        <p>{selectedRepo.description || "No description available."}</p>
                        <h3 className="text-lg font-bold mt-4">Details:</h3>
                        <p>Stars: {selectedRepo.stargazers_count}</p>
                        <p>Forks: {selectedRepo.forks_count}</p>
                        <p>Created At: {new Date(selectedRepo.created_at).toLocaleDateString()}</p>
                        <p>Updated At: {new Date(selectedRepo.updated_at).toLocaleDateString()}</p>
                        <p>Language: {selectedRepo.language || "N/A"}</p>
                        <p>Topics: {selectedRepo.topics.length > 0 ? selectedRepo.topics.join(", ") : "No topics available"}</p>
                    </div>
                )}
            </Modal>
            <Modal
                title="Edit Repository"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={updateRepository}
                okText="Save"
                cancelText="Cancel"
            >
                <Input.TextArea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="mb-4"
                />
                <Input
                    placeholder="Topics (comma-separated)"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Repositories;


