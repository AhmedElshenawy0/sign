import AdminPageHeader from "@/components/admin/AdminPageHeader";
import IntroVideoForm from "@/components/admin/IntroVideoForm";
import { getIntroVideo } from "@/lib/settings";
import { ADMIN_COPY } from "@/lib/admin-copy";

export const dynamic = "force-dynamic";

export default async function IntroVideoPage() {
  const current = await getIntroVideo();

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-5 md:px-8 md:py-10">
      <AdminPageHeader
        title={ADMIN_COPY.intro.title}
        subtitle={ADMIN_COPY.intro.subtitle}
        backHref="/admin"
        backLabel={ADMIN_COPY.intro.back}
      />
      <IntroVideoForm current={current} />
    </main>
  );
}
