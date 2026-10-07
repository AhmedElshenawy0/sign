import NfcProducts from "@/views/nfc/NfcProducts";
import { NfcCopyProvider } from "@/components/cms/PageCopy";
import { listProjects } from "@/lib/projects";
import { getSanityNfcPage } from "@/lib/sanity.content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [items, nfcCopy] = await Promise.all([
    listProjects(),
    getSanityNfcPage(),
  ]);
  const nfcItems = items.filter(
    (item) =>
      item.type === "nfc_card" ||
      item.type === "nfc_ring" ||
      item.type === "nfc_medal",
  );
  return (
    <NfcCopyProvider value={nfcCopy}>
      <NfcProducts items={nfcItems} />
    </NfcCopyProvider>
  );
}
