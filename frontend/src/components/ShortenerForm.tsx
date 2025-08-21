"use client";

import { useState } from "react";
import { apiClient, ShortenResponse } from "@/lib/api";
import ResultCard from "./ResultCard";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [expiry, setExpiry] = useState(24);
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // validate URL on frontend
      if (!await apiClient.validateUrl(url)) {
        throw new Error("Please enter a valid URL starting with http:// or https://");
      }

      const data = await apiClient.shortenURL(url, custom, expiry);
      setResult(data);
      
      // Clear form on success
      setUrl("");
      setCustom("");
      setExpiry(24);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error shortening URL");
      setResult(null);
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gray-900 border border-green-500 rounded p-4">
          {/* Terminal Header */}
          <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
            <div className="flex space-x-1 mr-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <span className="text-green-400 text-xs font-mono">~/shorten</span>
          </div>

          {/* Terminal Prompt */}
          <div className="text-green-400 font-mono text-sm mb-3">
            <span className="text-gray-400">user@urlx:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="text-yellow-400">./url-shortener</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL Input */}
            <div>
              <label className="block text-green-400 text-sm font-mono mb-1">
                URL:
              </label>
              <input
                type="text"
                placeholder="https://example.com/long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 bg-black border border-gray-600 text-green-400 font-mono text-sm focus:outline-none focus:border-green-400 placeholder-gray-500"
                required
              />
            </div>

            {/* Custom Alias */}
            <div>
              <label className="block text-green-400 text-sm font-mono mb-1">
                Custom (optional):
              </label>
              <input
                type="text"
                placeholder="custom-alias"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="w-full p-2 bg-black border border-gray-600 text-green-400 font-mono text-sm focus:outline-none focus:border-green-400 placeholder-gray-500"
              />
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-green-400 text-sm font-mono mb-1">
                Expires in:
              </label>
             <div className="relative">
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(Number(e.target.value))}
                  className="w-full p-2 pr-8 bg-black border border-gray-600 text-green-400 font-mono text-sm focus:outline-none focus:border-green-400 appearance-none"
                >
                  <option value={1}>1 hour</option>
                  <option value={6}>6 hours</option>
                  <option value={24}>24 hours</option>
                  <option value={72}>3 days</option>
                  <option value={168}>1 week</option>
                  <option value={720}>1 month</option>
                </select>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className={`w-full p-2 font-mono text-sm border transition-colors ${
                loading || !url.trim()
                  ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
                  : "bg-green-500 text-black border-green-500 hover:bg-green-400"
              }`}
            >
              {loading ? "Processing..." : "Shorten URL"}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-2 bg-red-900 border-l-4 border-red-500">
              <div className="text-red-400 font-mono text-sm">
                Error: {error}
              </div>
            </div>
          )}

          {/* Success Message */}
          {result && !error && (
            <div className="mt-4 p-2 bg-green-900 border-l-4 border-green-500">
              <div className="text-green-400 font-mono text-sm">
                ✓ URL shortened successfully
              </div>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-gray-900 border border-green-500 rounded p-4">
          {/* Terminal Header */}
          <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
            <div className="flex space-x-1 mr-4">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <span className="text-green-400 text-xs font-mono">~/result</span>
          </div>

          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div className="text-gray-500 font-mono text-sm">
                <div className="mb-2">╔════════════════════╗</div>
                <div className="mb-2">║   Awaiting input   ║</div>
                <div>╚════════════════════╝</div>
                <div className="mt-4 text-xs">
                  Enter a URL to get started
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}