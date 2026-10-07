import { createClient, type SanityClient } from "next-sanity";
import {
  hasSanityConfig,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "@/sanity/env";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!hasSanityConfig()) return null;
  if (!client) {
    client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      token: sanityReadToken || undefined,
      perspective: "published",
    });
  }
  return client;
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const sanity = getSanityClient();
  if (!sanity) return null;
  try {
    return await sanity.fetch<T>(query, params, { cache: "no-store" });
  } catch (error) {
    console.error("[sanity]", error);
    return null;
  }
}
