import { galleries } from "@/dummyData";
import { apiFetch, getApiBase, readApiError } from "@/lib/api";
import type { Project, ProjectInput, ProjectType } from "@/types/project";
import { PROJECT_TYPES } from "@/types/project";

function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

function fromDummyData(): Project[] {
  return galleries.map((item, index) => ({
    id: `local-${index + 1}`,
    title: item.title,
    type: isProjectType(item.type) ? item.type : "designs",
    media_url: item.src,
    poster_url: "poster" in item && item.poster ? item.poster : null,
    sort_order: index + 1,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  }));
}

export async function listProjects(type?: ProjectType): Promise<Project[]> {
  try {
    const res = await fetch(`${getApiBase()}/api/projects`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const items = (await res.json()) as Project[];
    return type ? items.filter((item) => item.type === type) : items;
  } catch {
    const items = fromDummyData();
    return type ? items.filter((item) => item.type === type) : items;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const encoded = encodeURIComponent(id);
  try {
    const res = await fetch(`${getApiBase()}/api/projects/${encoded}`, {
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as Project;
  } catch {
    // Fall through to dummy data if the API is down.
  }
  return fromDummyData().find((item) => item.id === id) ?? null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const res = await apiFetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res));
  return (await res.json()) as Project;
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>,
): Promise<Project> {
  const res = await apiFetch(`/api/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res));
  return (await res.json()) as Project;
}

export async function deleteProject(id: string) {
  const res = await apiFetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res));
}
