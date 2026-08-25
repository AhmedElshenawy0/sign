import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminUser } from "@/lib/admin-auth";
import { safeAdminNext } from "@/lib/admin-path";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; message?: string }>;
}) {
  const { error, next, message } = await searchParams;
  const user = await getAdminUser();
  if (user) redirect(safeAdminNext(next));

  return <LoginForm error={error} message={message} next={next} />;
}
