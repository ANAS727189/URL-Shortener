export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-yellow-400 bg-black">
      <div className="font-bold text-xl text-yellow-400">🔗 URLX</div>
      <div className="space-x-6">
        <a href="/" className="hover:text-yellow-400">Home</a>
        <a href="https://github.com/ANAS727189/url-shortener-redis" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
          GitHub
        </a>
      </div>
    </nav>
  );
}
