"use client";

import { useState, useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 border-b-2 border-green-400 bg-black/70 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <div className="font-bold text-xl text-green-400 flex items-center">
          <span className="animate-pulse mr-2">█</span>
          <span className="text-green-300">root@</span>
          <span className="text-white">urlx</span>
          <span className="text-green-400">:~#</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-green-400 font-mono text-sm">[{time}]</div>
        <a
          href="/"
          className="hover:text-white transition-colors duration-200 text-green-400 px-3 py-1 border border-transparent hover:border-green-400"
        >
          ./home
        </a>
        <a
          href="https://github.com/ANAS727189/URL-Shortener"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors duration-200 text-green-400 px-3 py-1 border border-transparent hover:border-green-400"
        >
          ./source
        </a>
        <div className="flex items-center space-x-3">
          <SignedOut>
            <SignInButton
              mode="modal"
              appearance={{
                elements: {
                  card: "bg-black border border-green-400 shadow-lg shadow-green-400/30",
                  headerTitle: "text-green-400 font-mono",
                  headerSubtitle: "text-gray-400 font-mono",
                  socialButtonsBlockButton:
                    "bg-black border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono",
                  formButtonPrimary:
                    "bg-green-500 text-black font-mono hover:bg-green-400",
                  footer: "text-gray-400 font-mono",
                },
              }}
              forceRedirectUrl="/"
            >
              <button className="px-4 py-1 font-mono text-sm text-green-400 border border-green-400 bg-black hover:bg-green-400 hover:text-black transition-colors">
                ./signin
              </button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/">
              <button className="px-4 py-1 font-mono text-sm text-yellow-400 border border-yellow-400 bg-black hover:bg-yellow-400 hover:text-black transition-colors">
                ./signup
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 border-2 border-green-400 shadow-lg shadow-green-400/40 rounded-full hover:scale-105 transition-transform",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
