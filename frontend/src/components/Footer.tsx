export default function Footer() {
  return (
    <footer className="w-full py-6 text-center border-t-2 border-green-400 mt-12 bg-black/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {/* ASCII Art */}
        <div className="text-green-400 font-mono text-xs opacity-60">
          <pre>{`
    ╔══════════════════════════════════════════════════════════╗
    ║                    SYSTEM INFORMATION                    ║
    ╠══════════════════════════════════════════════════════════╣
    ║  Backend: Go + Fiber Framework                           ║
    ║  Database: Redis (In-Memory)                             ║
    ║  Frontend: Next.js + TypeScript                          ║
    ║  Theme: Classic Terminal (Green Phosphor)                ║
    ╚══════════════════════════════════════════════════════════╝
          `}</pre>
        </div>
        
        {/* Main Footer Text */}
        <div className="text-green-400 font-mono">
          <span className="text-gray-400">Designed & developed</span>{" "}
          <span className="text-gray-400">by</span>{" "}
          <span className="text-white">Anas</span>
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
          <span className="px-3 py-1 border border-green-400 text-green-400 rounded">
            Go v1.21
          </span>
          <span className="px-3 py-1 border border-red-400 text-red-400 rounded">
            Redis v7
          </span>
          <span className="px-3 py-1 border border-blue-400 text-blue-400 rounded">
            Next.js v14
          </span>
          <span className="px-3 py-1 border border-purple-400 text-purple-400 rounded">
            TypeScript
          </span>
        </div>
        
        {/* Links */}
        <div className="flex justify-center space-x-6 text-sm font-mono">
          <a 
            href="https://github.com/ANAS727189/URL-Shortener" 
            target="_blank" 
            rel="noreferrer" 
            className="text-green-400 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-green-400"
          >
            [SOURCE_CODE]
          </a>
          <a 
            href={`${process.env.NEXT_PUBLIC_API_URL}/health`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-green-400 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-green-400"
          >
            [HEALTH_CHECK]
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 font-mono text-xs pt-4 border-t border-gray-700">
          <div>
            © {new Date().getFullYear()} URLX Terminal Edition. All rights reserved.
          </div>
          <div className="mt-1">
            Licensed under MIT | No logs stored | Privacy first
          </div>
        </div>
      </div>
    </footer>
  );
}