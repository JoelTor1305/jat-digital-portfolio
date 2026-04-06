export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 mt-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-base font-semibold text-white mb-2">Joel Torres</p>
            <p className="text-sm text-foreground/60 max-w-xs mb-4">
              BA&IS student at Penn State building AI systems, automation tools, and real products.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/joel-torres-psu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-foreground/70">
                  <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.35V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.35 4.22 5.41v6.33ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
              <a href="https://github.com/JoelTor1305" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-foreground/70">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="mailto:joelatorres1305@gmail.com" aria-label="Email"
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-foreground/70">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.14l8 5.85 8-5.85V18H4Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-4">Navigation</p>
            <ul className="space-y-2">
              {[["/#about", "About"], ["/#projects", "Projects"], ["/#blog", "Blog"], ["/#resume", "Resume"], ["/#contact", "Contact"]].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-foreground/60 hover:text-white transition">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-4">Work Together</p>
            <p className="text-sm text-foreground/60 mb-4">Open to consulting, co-op, and collaboration opportunities.</p>
            <a
              href="https://calendly.com/joelatorres1305/lets-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2"
              style={{ minHeight: "36px" }}
            >
              Book a Call
            </a>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground/40">
          <p>© {year} Joel Torres. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
