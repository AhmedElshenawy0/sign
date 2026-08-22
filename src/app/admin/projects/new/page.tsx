import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <AdminPageHeader
        title="Add project"
        subtitle="Choose a category, then upload an image or a video."
      />
      <ProjectForm />
    </main>
  );
}
