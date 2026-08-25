export function safeAdminNext(next?: string | null): string {
  if (!next || !next.startsWith("/admin")) return "/admin/projects";

  const path = next.split("?")[0];
  if (
    path === "/admin/login" ||
    path.includes("://") ||
    path.includes("\\") ||
    path.includes("//")
  ) {
    return "/admin/projects";
  }

  if (path === "/admin") return "/admin/projects";
  if (
    path === "/admin/projects" ||
    path === "/admin/projects/new" ||
    path === "/admin/intro" ||
    path === "/admin/showreel" ||
    path === "/admin/update-password" ||
    /^\/admin\/projects\/[a-zA-Z0-9-]+$/.test(path)
  ) {
    return path;
  }

  return "/admin/projects";
}
