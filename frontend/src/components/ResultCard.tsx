type Props = {
  shortUrl: string;
};

export default function ResultCard({ shortUrl }: Props) {
  return (
    <div className="mt-6 p-4 bg-gray-800 border border-blue-400 rounded-lg">
      <p className="text-lg">Your shortened URL:</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 underline break-words"
      >
        {shortUrl}
      </a>
    </div>
  );
}
