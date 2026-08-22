import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; message?: string }>;
}) {
  const { error, next, message } = await searchParams;

  return <LoginForm error={error} message={message} next={next} />;
}
