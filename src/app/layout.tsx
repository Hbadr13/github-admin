// "use client"; // Add this directive to make the component a Client Component

// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { Layout } from "antd";
// import Sider from "antd/es/layout/Sider";
// import { Content } from "antd/es/layout/layout";
// import AppHeader from "../components/AppHeader";
// import AppSideMenu from "../components/AppSideMenu";
// import React from "react";
// import { NextAuthProvider } from "../components/NextAuthProvider";
// import AuthGuard from "../components/AuthGuard";
// import { usePathname } from "next/navigation"; // Import usePathname
// import { metadata } from "../components/metadata"; // Import metadata

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname(); // Get the current pathname

//   // Check if the current pathname is the login page
//   const isLoginPage = pathname === "/login"; // Adjust this based on your actual login route

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <NextAuthProvider>
//           <AuthGuard>
//             <AntdRegistry>
//               <Layout>
//                 {!isLoginPage && <AppHeader />} 
//                   {!isLoginPage && ( 
//                     <Sider
//                       theme="light"
//                       style={{
//                         position: "fixed",
//                         top: "64px",
//                         left: 0,
//                         borderRight: "1px solid #f1f1f1",
//                         height: "calc(100vh - 64px)",
//                       }}
//                     >
//                       <AppSideMenu />
//                     </Sider>
//                   )}
//                   <Layout style={{ marginLeft: isLoginPage ? 0 : "200px" }}> {/* Adjust marginLeft based on isLoginPage */}
//                     <Content
//                       style={{ padding: "16px", minHeight: "calc(100vh - 64px)" }}
//                     >
//                       {children}
//                     </Content>
//                   </Layout>
//                 </Layout>
//               </Layout>
//             </AntdRegistry>
//           </AuthGuard>
//         </NextAuthProvider>
//       </body>
//     </html>
//   );
// }


// "use client"; // Add this directive to make the component a Client Component
// import AuthGuard from "../components/AuthGuard";
// import { NextAuthProvider } from "../components/NextAuthProvider";

// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { Layout, Drawer } from "antd";
// import Sider from "antd/es/layout/Sider";
// import { Content } from "antd/es/layout/layout";
// import AppHeader from "../components/AppHeader";
// import AppSideMenu from "../components/AppSideMenu";
// import React, { useState } from "react";
// import { MenuOutlined } from "@ant-design/icons"; // Import Menu icon
// import { usePathname } from "next/navigation"; // Import usePathname
// import useWindowSize from "./hook/useWindowSize";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname(); // Get the current pathname
//   const isLoginPage = pathname === "/login"; // Adjust this based on your actual login route
//   const [drawerVisible, setDrawerVisible] = useState(false); // State for controlling drawer visibility
//   const { width } = useWindowSize(); // Get window width

//   const showDrawer = () => {
//     setDrawerVisible(true);
//   };

//   const closeDrawer = () => {
//     setDrawerVisible(false);
//   };

//   const isMobile = width < 700; // Determine if the screen size is mobile

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <NextAuthProvider>
//           <AuthGuard>
//             <AntdRegistry>
//               <Layout>
//                 {!isLoginPage && <AppHeader />}
//                 {!isLoginPage && (
//                   <>
//                     {isMobile ? (
//                       <div className="md:hidden" style={{ position: "fixed", top: "64px", left: 0, zIndex: 1000 }}>
//                         <MenuOutlined onClick={showDrawer} style={{ fontSize: "24px", padding: "16px" }} />
//                       </div>
//                     ) : (
//                       <Sider
//                         theme="light"
//                         style={{
//                           position: "fixed",
//                           top: "64px",
//                           left: 0,
//                           borderRight: "1px solid #f1f1f1",
//                           height: "calc(100vh - 64px)",
//                           zIndex: 1000,
//                         }}
//                       >
//                         <AppSideMenu />
//                       </Sider>
//                     )}
//                     <Drawer
//                       title="Menu"
//                       placement="left"
//                       closable={false}
//                       onClose={closeDrawer}
//                       visible={drawerVisible}
//                       width={240} // Set drawer width
//                     >
//                       <AppSideMenu />
//                     </Drawer>
//                   </>
//                 )}
//                 <Layout style={{ marginLeft: isMobile ? 0 : "200px" }}>
//                   <Content
//                     style={{
//                       padding: "16px",
//                       minHeight: "calc(100vh - 64px)",
//                       width: "100vw", // Ensure Content takes full width
//                       // marginLeft: isMobile ? 0 : "200px", // Adjust margin for mobile
//                     }}
//                   >
//                     {children}
//                   </Content>
//                 </Layout>
//               </Layout>
//             </AntdRegistry>
//           </AuthGuard>
//         </NextAuthProvider>
//       </body>
//     </html>
//   );
// }


"use client"; // Add this directive to make the component a Client Component
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
import { MenuOutlined } from "@ant-design/icons"; // Import Menu icon
import { usePathname } from "next/navigation"; // Import usePathname
import useWindowSize from "./hook/useWindowSize";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current pathname
  const isLoginPage = pathname === "/login"; // Adjust this based on your actual login route
  const [drawerVisible, setDrawerVisible] = useState(false); // State for controlling drawer visibility
  const { width } = useWindowSize(); // Get window width

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const isMobile = width < 700; // Determine if the screen size is mobile

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
