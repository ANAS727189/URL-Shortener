"use client";

import { useState, useEffect } from "react";
import ShortenerForm from "@/components/ShortenerForm";

export default function HomePage() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "INITIALIZING URL SHORTENER...";
  
  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    const timer = setTimeout(typeWriter, 500);
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="text-center space-y-8 w-full mt-12">
      <div className="bg-black border-2 border-green-400 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4 border-b border-green-400 pb-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-400 text-sm font-mono">terminal v1.0.0</div>
        </div>
        
        <div className="text-left font-mono text-sm space-y-2">
          <div className="text-green-400">
            <span className="text-green-300">user@localhost</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/url-shortener</span>
            <span className="text-white">$ </span>
            <span className="text-yellow-400">./start-service</span>
          </div>
          <div className="text-green-400 min-h-[24px]">
            {displayText}
            {showCursor && <span className="animate-pulse">█</span>}
          </div>
          {displayText === fullText && (
            <div className="text-green-400 animate-fadeIn">
              <div>✓ Redis connection established</div>
              <div>✓ Go backend online</div>
              <div>✓ Ready to shorten URLs</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-6xl font-extrabold text-green-400 tracking-wider">
          URL<span className="text-white">X</span>
        </h1>
        <div className="text-xl text-green-300 font-mono">
          &gt; SECURE_YOUR_<span className="text-yellow-400 animate-pulse">LINKS.exe</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        <div className="bg-black border border-green-400 p-4 rounded">
          <div className="text-2xl font-bold text-green-400">50+</div>
          <div className="text-sm text-gray-400 font-mono">URLs Shortened</div>
        </div>
        <div className="bg-black border border-green-400 p-4 rounded">
          <div className="text-2xl font-bold text-green-400">&lt;1ms</div>
          <div className="text-sm text-gray-400 font-mono">Avg Response</div>
        </div>
        <div className="bg-black border border-green-400 p-4 rounded">
          <div className="text-2xl font-bold text-green-400">99.9%</div>
          <div className="text-sm text-gray-400 font-mono">Uptime</div>
        </div>
      </div>

      <ShortenerForm />
      
      <div className="mt-12 text-green-400 font-mono text-xs opacity-60">
        <pre>{`
    ╔══════════════════════════════════╗
    ║     URLX - TERMINAL EDITION      ║
    ╚══════════════════════════════════╝
        `}</pre>
      </div>
    </div>
  );
}