"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// removed theme toggle

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const links = isHomePage ? [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contacts" },
  ] : [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#blog", label: "Blog" },
    { href: "/#resume", label: "Resume" },
    { href: "/#contact", label: "Contacts" },
  ];

  return (
    <header className="w-full sticky top-0 z-30 bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 lg:px-8 py-3">
        <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] px-4 sm:px-8 py-2">
          <Link href="/" className="flex items-center gap-2 -my-1" aria-label="Home">
          <Image
            src="/images/logo.webp"
            alt="JAT Digital logo"
            width={200}
            height={200}
            className="h-[34px] md:h-[40px] w-auto object-contain"
            priority
          />
          </Link>
          <div className="flex-1 flex items-center justify-center gap-6">
            {links.map(({ href, label }) => {
              const isActive = (isHomePage && href.startsWith("#")) || 
                              (!isHomePage && href === "/" && pathname === "/");
              
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm transition-colors hover:underline underline-offset-4 ${
                    isActive ? "text-white font-semibold" : "text-foreground/80"
                  }`}
                  scroll
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <Link href="https://calendly.com/joelatorres1305/lets-chat" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition whitespace-nowrap">
            Book a Call
          </Link>
        </div>
      </nav>
    </header>
  );
}


