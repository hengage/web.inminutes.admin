import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ToastProvider } from "@/providers/ToastContext";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import ProgressProvider from "@/providers/ProgressProvider";
import QueryProvider from "@/providers/QueryProvider";
import { validateEnvs } from "@/lib/env-checks";

validateEnvs();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Logistics Dashboard",
  description: "Logistics Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}  antialiased`}>
        <ProgressProvider>
          <QueryProvider>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </QueryProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
