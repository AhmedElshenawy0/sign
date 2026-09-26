import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminProviders from "@/components/admin/AdminProviders";
import { getAdminUser } from "@/lib/admin-auth";
import { safeAdminNext } from "@/lib/admin-path";
import GridBg from "@/components/global/GridBg";

export const metadata = {
  title: "Admin — Sign Up",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isLogin = pathname === "/admin/login";
  const user = await getAdminUser();

  if (isLogin) {
    if (user) redirect("/admin");
    return <AdminProviders>{children}</AdminProviders>;
  }

  if (!user) {
    const next = safeAdminNext(pathname);
    redirect(`/admin/login?next=${encodeURIComponent(next)}`);
  }

  return (
    <AdminProviders>
      <div className="admin-shell relative min-h-screen bg-[#05070c] text-white" dir="ltr">
        <GridBg variant="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,152,93,0.12),transparent_34%)]" />
        <div className="relative flex min-h-screen flex-col lg:flex-row">
          <AdminHeader email={user.email} />
          <div className="min-w-0 flex-1 overflow-x-hidden lg:min-h-screen">{children}</div>
        </div>
      </div>
    </AdminProviders>
  );
}
