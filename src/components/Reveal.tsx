"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

type RevealProps = PropsWithChildren<{
  /** Optional additional class names applied to the wrapper */
  className?: string;
  /** Once visible, keep it shown */
  once?: boolean;
}>;

export function Reveal({ children, className, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={
        (className ? className + " " : "") +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6") +
        " transition-all duration-700 ease-out will-change-transform"
      }
    >
      {children}
    </div>
  );
}


