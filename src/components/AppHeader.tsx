import { Header } from "antd/es/layout/layout";
import React from "react";
import { Avatar, Popover, Button } from "antd";
import { useSession, signOut } from "next-auth/react";

function AppHeader() {
  const { data: session } = useSession();
  if (!session) return null;

  const content = () => (
    <div className="flex flex-col p-4">
      <div className="flex items-center mb-2">
        <Avatar size={36} src={session.user?.image} />
        <div className="ml-2">{session.user?.name || "User"}</div>
      </div>
      <div>Email: {session.user?.email || "Not provided"}</div>
      <div>Username: {session.user?.username || "Not provided"}</div>
      <div>Profile URL: <a href={session.user?.profileUrl} target="_blank" rel="noopener noreferrer">{session.user?.profileUrl || "Not provided"}</a></div>
      <div>Bio: {session.user?.bio || "Not provided"}</div>
      <Button type="primary" onClick={() => signOut()} className="mt-2">
        Logout
      </Button>
    </div>
  );

  return (
    <Header className=" text-lg font-medium !bg-white border-b border-[#f1f1f1] flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Avatar size={36} src="/profile.png" />
        <div>GitHub Admin</div>
      </div>
      <div className="flex items-center gap-2">
        <Popover className="cursor-pointer" content={content} title="User Info" trigger="click">
          <Avatar size={40} src={session.user?.image} /> {/* User's profile image */}
        </Popover>
      </div>
    </Header>
  );
}

export default AppHeader;
