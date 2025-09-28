"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen border-r border-black/10 dark:border-white/10">
      <div className="p-6 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6">
        <div className="h-20 w-20 rounded-full overflow-hidden border">
          <Image src="/profile.jpg" alt="Joel Torres" width={160} height={160} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-semibold leading-tight">Joel Torres</h1>
          <p className="text-sm text-foreground/70">MIS · Backend Automation</p>
        </div>
      </div>
      <nav className="px-6 pb-4">
        <ul className="flex lg:flex-col gap-3">
          {navLinks.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    "text-sm transition-colors hover:underline underline-offset-4" +
                    (isActive ? " font-semibold" : " text-foreground/80")
                  }
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-6 pb-6 flex items-center gap-3">
        <ThemeToggle />
        <a href="#" className="text-sm text-foreground/80 hover:underline">GitHub</a>
        <a href="#" className="text-sm text-foreground/80 hover:underline">LinkedIn</a>
      </div>
    </aside>
  );
}


