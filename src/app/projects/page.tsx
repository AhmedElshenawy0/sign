import Projects from "@/views/projects/Projects";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = await listProjects();
  return <Projects items={items} />;
}
