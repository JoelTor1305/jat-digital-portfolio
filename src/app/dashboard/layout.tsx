export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>
      {children}
    </div>
  );
}
