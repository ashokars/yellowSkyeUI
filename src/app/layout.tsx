import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import NavBar from "./navbar";
import { CmrContextProvider } from "@/context/cmrContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeX yellowSkye",
  description: "Drone Exchange App by YellowSkye",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-none bg-white`}>
        <main data-theme="light" className="bg-white">
            <Suspense>
              <NavBar />
            </Suspense>
          {children}
        </main>
      </body>
    </html>
  );
}
