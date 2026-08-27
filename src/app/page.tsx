import Home from "@/views/home/Home";
import { getIntroVideo, getShowreel } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [showreel, intro] = await Promise.all([getShowreel(), getIntroVideo()]);
  return <Home showreel={showreel} intro={intro} />;
}
