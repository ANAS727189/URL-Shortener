import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "URLX - Classic URL Shortener",
  description: "Old-school terminal-inspired URL shortener with Redis + Go backend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono min-h-screen">
        <div className="fixed inset-0 pointer-events-none"></div>
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-4xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}