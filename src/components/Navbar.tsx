"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
// removed theme toggle

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6">
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
          
          {/* Desktop Book a Call Button */}
          <Link href="https://calendly.com/joelatorres1305/lets-chat" target="_blank" rel="noopener noreferrer" className="hidden md:block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition whitespace-nowrap">
            Book a Call
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] p-4">
            <div className="flex flex-col space-y-3">
              {links.map(({ href, label }) => {
                const isActive = (isHomePage && href.startsWith("#")) || 
                                (!isHomePage && href === "/" && pathname === "/");
                
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 px-4 rounded-lg text-sm transition-colors ${
                      isActive ? "text-white font-semibold bg-white/10" : "text-foreground/80 hover:bg-white/5"
                    }`}
                    scroll
                  >
                    {label}
                  </Link>
                );
              })}
              <Link 
                href="https://calendly.com/joelatorres1305/lets-chat" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 py-3 px-4 rounded-lg border border-white/20 bg-white/10 text-sm font-medium hover:bg-white/15 transition text-center"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


