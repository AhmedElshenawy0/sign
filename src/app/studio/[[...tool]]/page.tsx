import { hasSanityConfig } from "@/sanity/env";
import StudioApp from "./StudioApp";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <StudioApp configured={hasSanityConfig()} />;
}
