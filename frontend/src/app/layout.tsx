import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "URL Shortener",
  description: "Minimal old-school URL shortener with Redis + Go backend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-mono">
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
