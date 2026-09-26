import UpdatePasswordForm from "@/components/admin/UpdatePasswordForm";
import { getAdminUser } from "@/lib/admin-auth";

export default async function UpdatePasswordPage() {
  const user = await getAdminUser();

  return (
    <main className="relative mx-auto flex min-h-[70vh] w-full min-w-0 max-w-6xl items-start justify-center px-4 py-6 sm:px-5 md:px-8 md:py-10">
      <UpdatePasswordForm email={user?.email} />
    </main>
  );
}
