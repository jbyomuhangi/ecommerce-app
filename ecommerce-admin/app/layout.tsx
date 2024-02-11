import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import CreateStoreModalComponentProvider from "@/componentProviders/CreateStoreModalComponentProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={clsx(inter.className, "flex flex-col")}>
          <CreateStoreModalComponentProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
