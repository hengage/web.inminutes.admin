import type { Metadata } from "next";
import { Inter, Istok_Web } from "next/font/google";
import { ToastProvider } from "@/providers/ToastContext";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import ProgressProvider from "@/providers/ProgressProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const istok_web = Istok_Web({
  variable: "--font-istok-web",
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
      <body className={`${inter.variable} ${istok_web.variable}  antialiased`}>
        <ProgressProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
