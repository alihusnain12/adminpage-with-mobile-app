"use client";

import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react"; // Ensure the useEffect hook is imported
import i18n from "../../i18"; // Make sure to import the i18n configuration
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Uncomment if you plan to use metadata in the future
// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  // Initialize i18n
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (

<html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {showSidebar ? <Sidebar>{children}</Sidebar> : children}
            <NextTopLoader/>
          </body>
        </html>
  );
}
