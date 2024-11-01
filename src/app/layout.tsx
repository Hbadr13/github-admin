"use client";
import AuthGuard from "../components/AuthGuard";
import { NextAuthProvider } from "../components/NextAuthProvider";

import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Drawer } from "antd";
import { Content } from "antd/es/layout/layout";
import AppHeader from "../components/AppHeader";
import AppSideMenu from "../components/AppSideMenu";
import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import useWindowSize from "../hook/useWindowSize";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = useWindowSize();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const isMobile = (width ?? 0) < 700;

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AuthGuard>
            <AntdRegistry>
              <Layout style={{ minHeight: "100vh" }}>
                {!isLoginPage && <AppHeader />}
                {!isLoginPage && isMobile && (
                  <div className="md:hidden" style={{ position: "fixed", top: "64px", left: 0, zIndex: 1000 }}>
                    <MenuOutlined onClick={showDrawer} style={{ fontSize: "24px", padding: "16px" }} />
                  </div>
                )}
                {!isLoginPage && !isMobile && (
                  <div className="fixed h-screen pt-16 bg-white z-10">

                    <AppSideMenu />
                  </div>
                )}

                <Drawer
                  title="Menu"
                  placement="left"
                  closable={false}
                  onClose={closeDrawer}
                  visible={drawerVisible}
                  width={240} // Set drawer width
                >
                  <AppSideMenu />
                </Drawer>

                <Layout style={{ marginLeft: !isMobile ? '130px' : 0 }}>
                  <Content
                    style={{
                      padding: "16px",
                      minHeight: "calc(100vh - 64px)",
                      width: "100%", // Ensure Content takes full width
                    }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </AntdRegistry>
          </AuthGuard>
        </NextAuthProvider>
      </body>
    </html>
  );
}
