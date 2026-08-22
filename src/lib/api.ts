import { COOKIE_NAME } from "@/lib/constants";

export function getApiBase() {
  if (typeof window !== "undefined") return "";
  return process.env.API_INTERNAL_URL ?? "http://127.0.0.1:4000";
}

export async function apiFetch(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);

  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (token) headers.set("cookie", `${COOKIE_NAME}=${token}`);
  }

  return fetch(`${getApiBase()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    credentials: "include",
  });
}

export async function readApiError(res: Response) {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}
