import { notFound } from "next/navigation";
import { StoreCopyProvider } from "@/components/cms/PageCopy";
import { getSanityStorePage } from "@/lib/sanity.content";
import { isStoreItemKey, STORE_ITEM_KEYS } from "@/lib/store-catalog";
import StoreRequest from "@/views/store/StoreRequest";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return STORE_ITEM_KEYS.map((item) => ({ item }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = await params;
  if (!isStoreItemKey(item)) notFound();
  const storeCopy = await getSanityStorePage();
  return (
    <StoreCopyProvider value={storeCopy}>
      <StoreRequest itemKey={item} />
    </StoreCopyProvider>
  );
}
