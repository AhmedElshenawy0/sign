import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <AdminPageHeader
        title="Edit project"
        subtitle="Change the title, category, or replace the file."
        deleteId={project.id}
      />
      <ProjectForm project={project} />
    </main>
  );
}
