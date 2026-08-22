import ProjectsBoard from "@/components/admin/ProjectsBoard";
import { listProjects } from "@/lib/projects";
import { PROJECT_TYPES, type ProjectType } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const selected =
    type && PROJECT_TYPES.includes(type as ProjectType)
      ? (type as ProjectType)
      : undefined;
  const items = await listProjects();

  return <ProjectsBoard items={items} selected={selected} />;
}
