import Store from "@/views/store/Store";
import { StoreCopyProvider } from "@/components/cms/PageCopy";
import { getSanityStorePage } from "@/lib/sanity.content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const storeCopy = await getSanityStorePage();
  return (
    <StoreCopyProvider value={storeCopy}>
      <Store />
    </StoreCopyProvider>
  );
}
