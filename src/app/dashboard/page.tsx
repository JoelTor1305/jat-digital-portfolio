import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { pool } from "@/lib/db";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dashboard-token")?.value;

  if (!token) redirect("/dashboard/login");

  let clientId: string;
  let clientName: string;

  try {
    const payload = await verifyToken(token);
    clientId = payload.clientId;
    clientName = payload.clientName;
  } catch {
    redirect("/dashboard/login");
  }

  const [leadsResult, statsResult] = await Promise.all([
    pool.query(
      `SELECT id, parent_name, phone, child_age, program_name,
              callback_datetime, summary, priority, priority_reason,
              transcript, call_time, recording_url, created_at
       FROM leads
       WHERE client_id = $1
       ORDER BY created_at DESC
       LIMIT 200`,
      [clientId]
    ),
    pool.query(
      `SELECT
         COUNT(*)::text AS total_calls,
         COUNT(*) FILTER (WHERE phone IS NOT NULL AND phone != 'Not captured')::text AS leads_caught,
         COUNT(*) FILTER (WHERE priority = 'HOT')::text AS hot_leads
       FROM leads
       WHERE client_id = $1`,
      [clientId]
    ),
  ]);

  return (
    <DashboardView
      clientName={clientName}
      leads={leadsResult.rows}
      stats={statsResult.rows[0] ?? { total_calls: "0", leads_caught: "0", hot_leads: "0" }}
    />
  );
}
