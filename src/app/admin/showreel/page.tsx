import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ShowreelForm from "@/components/admin/ShowreelForm";
import { getShowreel } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function ShowreelPage() {
  const current = await getShowreel();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <AdminPageHeader
        title="Showreel"
        subtitle="Home page compilation video and the English / Arabic headings above it."
        backHref="/admin/projects"
        backLabel="Back to dashboard"
      />
      <ShowreelForm current={current} />
    </main>
  );
}
