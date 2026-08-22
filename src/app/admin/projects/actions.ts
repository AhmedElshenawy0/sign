"use server";

import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/admin-auth";
import { createProject, deleteProject, updateProject } from "@/lib/projects";
import type { ProjectInput } from "@/types/project";

export async function saveProjectAction(
  id: string | null,
  input: ProjectInput,
) {
  await requireAdminUser();

  const saved = id
    ? await updateProject(id, input)
    : await createProject(input);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return saved;
}

export async function deleteProjectAction(id: string) {
  await requireAdminUser();
  await deleteProject(id);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
