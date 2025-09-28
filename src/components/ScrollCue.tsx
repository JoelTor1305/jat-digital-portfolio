"use client";

import { useEffect, useState } from "react";

export function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrolled < 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "scroll-cue absolute left-1/2 -translate-x-1/2 bottom-3 text-[11px] text-foreground/70 transition-opacity duration-300" +
        (visible ? " opacity-100" : " opacity-0 pointer-events-none")
      }
    >
      Scroll down
    </div>
  );
}


