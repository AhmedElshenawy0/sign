import ProjectsBoard from "@/components/admin/ProjectsBoard";
import { listProjects } from "@/lib/projects";
import { SERVICE_GROUP_IDS, type ServiceGroupId } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group } = await searchParams;
  const selected =
    group && SERVICE_GROUP_IDS.includes(group as ServiceGroupId)
      ? (group as ServiceGroupId)
      : undefined;
  const items = await listProjects();

  return <ProjectsBoard items={items} selected={selected} />;
}
