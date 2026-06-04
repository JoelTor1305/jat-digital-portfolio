"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "6px",
        padding: "7px 14px",
        fontSize: "12px",
        color: "#888",
        cursor: "pointer",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.color = "#fff";
        (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.color = "#888";
        (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
      }}
    >
      Logout
    </button>
  );
}
