import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { ADMIN_COPY } from "@/lib/admin-copy";

export default function NewProjectPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-5 md:px-8 md:py-10">
      <AdminPageHeader
        title={ADMIN_COPY.project.addTitle}
        subtitle={ADMIN_COPY.project.addSubtitle}
        backLabel={ADMIN_COPY.project.back}
      />
      <ProjectForm />
    </main>
  );
}
