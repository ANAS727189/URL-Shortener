"use client";

import { useState, useEffect } from "react";

interface LoadingProps {
  message?: string;
  showProgress?: boolean;
}

export default function TerminalLoading({ 
  message = "PROCESSING REQUEST", 
  showProgress = true 
}: LoadingProps) {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    let progressInterval: NodeJS.Timeout;
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + Math.random() * 15);
      }, 200);
    }

    return () => {
      clearInterval(dotsInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [showProgress]);

  return (
    <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6 font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-yellow-400">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-yellow-400 text-sm">system.exe</div>
      </div>

      {/* Loading Content */}
      <div className="space-y-4">
        <div className="text-yellow-400">
          <span className="text-green-400">root@urlx</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/processing</span>
          <span className="text-white">$ </span>
          <span className="animate-pulse">█</span>
        </div>

        <div className="text-yellow-400">
          {message}{dots}
        </div>

        {showProgress && (
          <div className="space-y-2">
            {/* Progress Bar */}
            <div className="w-full bg-black border border-gray-600 rounded overflow-hidden">
              <div 
                className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-200"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-sm text-center">
              {Math.floor(Math.min(progress, 100))}% COMPLETE
            </div>
          </div>
        )}

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-1 text-green-400">
          <span className="animate-bounce">▓</span>
          <span className="animate-bounce delay-100">▓</span>
          <span className="animate-bounce delay-200">▓</span>
          <span className="animate-bounce delay-300">▓</span>
          <span className="animate-bounce delay-400">▓</span>
        </div>
      </div>
    </div>
  );
}

// Simple spinner component
export function SimpleSpinner({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin text-green-400`}>
      ⟳
    </div>
  );
}