import StatsDashboard from "@/components/admin/StatsDashboard";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const items = await listProjects();
  return <StatsDashboard items={items} />;
}
