"use server";

import { redirect } from "next/navigation";
import { apiFetch, readApiError } from "@/lib/api";

export async function getAdminUser() {
  const res = await apiFetch("/api/auth/me");
  if (!res.ok) return null;
  const data = (await res.json()) as { user?: { id: string; email: string } };
  return data.user ?? null;
}

export async function requireAdminUser() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
