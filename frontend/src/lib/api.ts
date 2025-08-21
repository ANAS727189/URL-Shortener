export async function shortenURL(url: string, custom?: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, short: custom }),
  });

  if (!res.ok) {
    throw new Error("Failed to shorten URL");
  }

  const data = await res.json();
  return data.short;
}
