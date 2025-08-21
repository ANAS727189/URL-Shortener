"use client";

import { useState } from "react";
import { ShortenResponse } from "@/lib/api";
import { useQRCode } from 'next-qrcode';

type Props = {
  result: ShortenResponse;
};

export default function ResultCard({ result }: Props) {
  const [copied, setCopied] = useState(false);
   const { Image } = useQRCode();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.ceil(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${Math.ceil(minutes % 60)}m`;
  };

  return (
    <div className="bg-black border-2 border-green-400 rounded-lg shadow-2xl shadow-green-400/20 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-900 px-4 py-2 border-b border-green-400 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400 text-sm font-mono">result.log</div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="text-green-400 font-mono text-sm">
          <span className="text-green-300">root@urlx</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/success</span>
          <span className="text-white">$ </span>
          <span className="text-yellow-400">cat result.log</span>
        </div>

        {/* Success Message */}
        <div className="bg-gray-900 border border-green-600 rounded p-4 space-y-3">
          <div className="text-green-400 font-mono text-sm font-bold">
            ✓ OPERATION COMPLETED SUCCESSFULLY
          </div>
          
          {/* URL Display */}
          <div className="space-y-2">
            <div className="text-green-300 text-sm font-mono">SHORTENED_URL:</div>
            <div className="flex items-center space-x-2 bg-black border border-gray-600 rounded p-3">
              <a
                href={result.short}
                target="_blank"
                rel="noreferrer"
                className="text-yellow-400 underline break-all font-mono hover:text-yellow-300 transition-colors flex-1"
              >
                {result.short}
              </a>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-green-400 text-black font-mono text-sm rounded hover:bg-green-300 transition-colors duration-200 flex items-center space-x-1 whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Original URL */}
          <div className="space-y-2">
            <div className="text-green-300 text-sm font-mono">ORIGINAL_URL:</div>
            <div className="bg-black border border-gray-600 rounded p-3">
              <div className="text-gray-400 break-all font-mono text-sm">
                {result.url}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-600">
            <div className="text-center">
              <div className="text-green-400 font-mono text-lg font-bold">
                {result.expiry}h
              </div>
              <div className="text-gray-400 font-mono text-xs">EXPIRES_IN</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-mono text-lg font-bold">
                {result.rate_limit}
              </div>
              <div className="text-gray-400 font-mono text-xs">QUOTA_LEFT</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-mono text-lg font-bold">
                {formatTime(result.rate_limit_reset)}
              </div>
              <div className="text-gray-400 font-mono text-xs">RESET_IN</div>
            </div>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center pt-4">
          <div className="bg-white p-4 rounded border-2 border-green-400">
            <div className="w-32 h-32 bg-black flex items-center justify-center">
              <Image
                text={result.url}
                options={{
                  type: 'image/jpeg',
                  quality: 0.3,
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#010599FF',
                    light: '#FFBF60FF',
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <button
            onClick={() => window.open(result.short, '_blank')}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm rounded transition-colors duration-200"
          >
            TEST_LINK
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-500 text-white font-mono text-sm rounded transition-colors duration-200"
          >
            {copied ? "COPIED!" : "COPY_URL"}
          </button>
        </div>
      </div>
    </div>
  );
}