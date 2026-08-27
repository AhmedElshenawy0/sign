import AdminPageHeader from "@/components/admin/AdminPageHeader";
import IntroVideoForm from "@/components/admin/IntroVideoForm";
import { getIntroVideo } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function IntroVideoPage() {
  const current = await getIntroVideo();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <AdminPageHeader
        title="Intro video"
        subtitle="This plays full-screen behind the home hero. Change it here and the live site updates."
        backHref="/admin/projects"
        backLabel="Back to dashboard"
      />
      <IntroVideoForm current={current} />
    </main>
  );
}
