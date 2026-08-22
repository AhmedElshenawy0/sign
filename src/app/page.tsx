import IntroPage from "@/views/IntroPage";
import { getIntroVideo } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const intro = await getIntroVideo();
  return <IntroPage videoSrc={intro.media_url} />;
}
