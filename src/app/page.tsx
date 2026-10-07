import Home from "@/views/home/Home";
import { HomeCopyProvider } from "@/components/cms/PageCopy";
import { getSanityHomePage } from "@/lib/sanity.content";
import { getIntroVideo, getShowreel } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [showreel, intro, homeCopy] = await Promise.all([
    getShowreel(),
    getIntroVideo(),
    getSanityHomePage(),
  ]);
  return (
    <HomeCopyProvider value={homeCopy}>
      <Home showreel={showreel} intro={intro} />
    </HomeCopyProvider>
  );
}
