import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ShowreelForm from "@/components/admin/ShowreelForm";
import { getShowreel } from "@/lib/settings";
import { ADMIN_COPY } from "@/lib/admin-copy";

export const dynamic = "force-dynamic";

export default async function ShowreelPage() {
  const current = await getShowreel();

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-5 md:px-8 md:py-10">
      <AdminPageHeader
        title={ADMIN_COPY.showreel.title}
        subtitle={ADMIN_COPY.showreel.subtitle}
        backHref="/admin"
        backLabel={ADMIN_COPY.showreel.back}
      />
      <ShowreelForm current={current} />
    </main>
  );
}
