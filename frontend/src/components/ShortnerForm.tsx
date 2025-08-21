"use client";

import { useState } from "react";
import { shortenURL } from "@/lib/api";
import ResultCard from "./ResultCard";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const short = await shortenURL(url, custom);
      setResult(short);
    } catch (err) {
      console.error(err);
      setResult("Error shortening URL");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 border border-yellow-400 p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="p-2 rounded bg-black border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-500"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {result && <ResultCard shortUrl={result} />}
    </div>
  );
}
