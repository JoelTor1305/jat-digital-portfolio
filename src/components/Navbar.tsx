"use client";

import Link from "next/link";
import Image from "next/image";
// removed theme toggle

const links: Array<{ href: string; label: string }> = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contacts" },
];

export function Navbar() {

  return (
    <header className="w-full sticky top-0 z-30 bg-transparent">
      <nav className="mx-auto max-w-7xl px-4 lg:px-8 py-3">
        <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] px-4 sm:px-8 py-2">
          <Link href="/" className="flex items-center gap-2 -my-1" aria-label="Home">
          <Image
            src="https://d36vu4awtdgnqw.cloudfront.net/1y4cd%2Fpreview%2F71166130%2Fmain_large.png?response-content-disposition=inline%3Bfilename%3D%22main_large.png%22%3B&response-content-type=&Expires=1758648399&Signature=RhoaiTGj6bpjXm7-Q44E30MGUhpWQb5~whR1Xxl1A7hfO21OlYB5sloRyKdKVfSO0B~Jnx6uMq7EndHSliE1nLLg-oIanAj8~nn-H0WI3QznqD~s66NXB4-~TxeJri9Lvs0RyafGXCSKQlp26ixaSyVNGXK5uF2e2pX6l0n4IO4Wekhwg-3-hZwvAz8zJO2twql0hBGkpEcgjslaqEMVPLTYh62gIOWmw8cshWKOPAM1Hq-E0qPRAa9gNGkKtSDuIDI2XCNl2FvMESWrSyNLMocNq~YJSFxRyrFJ8Ho4EWtyUBAgJkoAnybcXY36vanTgYCXPCo76dJ8m2btM15y4Q__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ"
            alt="Joel Torres logo"
            width={200}
            height={200}
            className="h-[34px] md:h-[40px] w-auto object-contain"
            priority
          />
          </Link>
          <div className="flex-1 flex items-center justify-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={"text-sm transition-colors hover:underline underline-offset-4 text-foreground/80"}
                scroll
              >
                {label}
              </Link>
            ))}
          </div>
          <Link href="https://calendly.com/joelatorres1305/lets-chat" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition whitespace-nowrap">
            Book a Call
          </Link>
        </div>
      </nav>
    </header>
  );
}


