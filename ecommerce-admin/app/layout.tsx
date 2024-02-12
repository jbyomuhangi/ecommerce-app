import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CreateStoreModalComponentProvider } from "@/component-providers/create-store-modal-component-provider";
import { ToastComponentProvider } from "@/component-providers/toast-component-provider";
import { QueryProvider } from "@/context-providers/query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={clsx(inter.className, "flex flex-col")}>
            <CreateStoreModalComponentProvider />
            <ToastComponentProvider />

            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
