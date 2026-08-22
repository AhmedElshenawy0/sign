import AdminHeader from "@/components/admin/AdminHeader";
import AdminProviders from "@/components/admin/AdminProviders";
import { getAdminUser } from "@/lib/admin-auth";
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
  const user = await getAdminUser();

  if (!user) {
    return <AdminProviders>{children}</AdminProviders>;
  }

  return (
    <AdminProviders>
      <div className="relative min-h-screen bg-slate-950 text-white">
        <GridBg variant="dark" />
        <div className="relative">
          <AdminHeader email={user.email} />
          {children}
        </div>
      </div>
    </AdminProviders>
  );
}
