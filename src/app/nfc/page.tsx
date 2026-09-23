import NfcProducts from "@/views/nfc/NfcProducts";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = await listProjects();
  const nfcItems = items.filter((item) =>
    item.type === "nfc_card" ||
    item.type === "nfc_ring" ||
    item.type === "nfc_medal",
  );
  return <NfcProducts items={nfcItems} />;
}
