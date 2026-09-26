import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProject } from "@/lib/projects";
import { ADMIN_COPY } from "@/lib/admin-copy";

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
    <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-5 md:px-8 md:py-10">
      <AdminPageHeader
        title={ADMIN_COPY.project.editTitle}
        subtitle={ADMIN_COPY.project.editSubtitle}
        deleteId={project.id}
        backLabel={ADMIN_COPY.project.back}
      />
      <ProjectForm project={project} />
    </main>
  );
}
