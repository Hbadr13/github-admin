"use client";
import { Menu, Button } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchOutlined, HomeOutlined, GithubOutlined, StarOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";

export default function AppSideMenu() {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string[]>([]);

  useEffect(() => {
    if (pathname === "/") {
      setSelectedKey(["1"]);
    } else if (pathname.startsWith("/repositories")) {
      setSelectedKey(["2"]);
    } else if (pathname.startsWith("/starred-repositories")) {
      setSelectedKey(["3"]);
    } else if (pathname.startsWith("/settings")) {
      setSelectedKey(["4"]);
    } else if (pathname.startsWith("/organization-reps")) {
      setSelectedKey(["10"]);
    } else {
      setSelectedKey([]);
    }
  }, [pathname]);

  const handleLogout = () => {
    signOut();
  };

  const menuItems = [
    { label: <Link href="/"><HomeOutlined /> Home</Link>, key: "1" },
    { label: <Link href="/organization-reps"><SearchOutlined /> Organization Rep</Link>, key: "10" },
    { type: "divider" },
    { label: <Link href="/repositories"><GithubOutlined /> Repositories</Link>, key: "2" },
    { label: <Link href="/starred-repositories"><StarOutlined /> Starred Repos</Link>, key: "3" },
    { label: <Link href="/settings"><SettingOutlined /> User Settings</Link>, key: "4" },
    { type: "divider" },
    {
      label: (
        <Button className="text-red-600" type="link" onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </Button>
      ),
      key: "5",
    },
  ];

  return (
    <div>
      <Menu mode="inline" selectedKeys={selectedKey}>
        {menuItems.map(item =>
          item.type === "divider" ? <Menu.Divider key={Math.random()} /> : <Menu.Item key={item.key}>{item.label}</Menu.Item>
        )}
      </Menu>
    </div>
  );
}
