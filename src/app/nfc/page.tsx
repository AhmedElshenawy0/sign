import NfcProducts from "@/views/nfc/NfcProducts";
import { NfcCopyProvider } from "@/components/cms/PageCopy";
import { listProjects } from "@/lib/projects";
import { getSanityNfcPage } from "@/lib/sanity.content";
import type { Project, ProjectType } from "@/types/project";

export const dynamic = "force-dynamic";

const NFC_TYPES = ["nfc_card", "nfc_ring", "nfc_medal"] as const;

function pickNfcExamples(
  items: Project[],
  ids: string[] | null | undefined,
  type: ProjectType,
): Project[] {
  const ofType = items
    .filter((item) => item.type === type)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const picked = (ids ?? [])
    .map((id) => ofType.find((item) => item.id === id))
    .filter((item): item is Project => Boolean(item));
  if (picked.length) return picked.slice(0, 2);
  return ofType.slice(0, 2);
}

export default async function Page() {
  const [items, nfcCopy] = await Promise.all([
    listProjects(),
    getSanityNfcPage(),
  ]);
  const examples = NFC_TYPES.flatMap((type) =>
    pickNfcExamples(
      items,
      type === "nfc_card"
        ? nfcCopy?.cardExampleIds
        : type === "nfc_ring"
          ? nfcCopy?.ringExampleIds
          : nfcCopy?.medalExampleIds,
      type,
    ),
  );
  return (
    <NfcCopyProvider value={nfcCopy}>
      <NfcProducts items={examples} />
    </NfcCopyProvider>
  );
}
