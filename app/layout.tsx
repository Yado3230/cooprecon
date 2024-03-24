"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/providers/toast-provider";
import { AuthProvider } from "./api/auth/contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AuthProvider>
            <ToasterProvider />
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
