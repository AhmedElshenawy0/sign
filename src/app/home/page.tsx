import Home from "@/views/home/Home";
import { getShowreel } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const showreel = await getShowreel();
  return <Home showreel={showreel} />;
}
