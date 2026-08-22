import UpdatePasswordForm from "@/components/admin/UpdatePasswordForm";
import { getAdminUser } from "@/lib/admin-auth";

export default async function UpdatePasswordPage() {
  const user = await getAdminUser();

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-6xl items-start justify-center px-4 py-10 md:px-8">
      <UpdatePasswordForm email={user?.email} />
    </main>
  );
}
