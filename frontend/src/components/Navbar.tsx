"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
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
          <div className="text-green-400 font-mono text-sm">
            [{time}]
          </div>
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
        </div>
      </nav>

  );
}