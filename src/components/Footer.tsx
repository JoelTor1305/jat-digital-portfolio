export function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145] mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Joel Torres. All rights reserved.</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs">Built with Next.js + Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}


