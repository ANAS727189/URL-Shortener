import ShortenerForm from "@/components/ShortnerForm";

export default function HomePage() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-extrabold">
        SECURE YOUR <span className="text-yellow-400">LINKS</span>
      </h1>
      <p className="text-gray-400 max-w-xl mx-auto">
        Shorten URLs with style. Redis-powered. Go backend. Lightning fast.
      </p>
      <ShortenerForm />
    </div>
  );
}
