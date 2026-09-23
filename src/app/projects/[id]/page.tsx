import { notFound } from "next/navigation";
import ProjectJourney from "@/views/projects/ProjectJourney";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  return <ProjectJourney project={project} />;
}
