import Projects from "@/views/projects/Projects";
import { listProjects } from "@/lib/projects";
import { getSanityOurServicesPage } from "@/lib/sanity.content";
import { resolveServiceGroups } from "@/lib/service-groups";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [items, services] = await Promise.all([
    listProjects(),
    getSanityOurServicesPage(),
  ]);
  return (
    <Projects items={items} groups={resolveServiceGroups(services)} />
  );
}
