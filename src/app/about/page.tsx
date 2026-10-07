import About from "@/views/about/About";
import { AboutCopyProvider } from "@/components/cms/PageCopy";
import { getSanityAboutPage } from "@/lib/sanity.content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const aboutCopy = await getSanityAboutPage();
  return (
    <AboutCopyProvider value={aboutCopy}>
      <About />
    </AboutCopyProvider>
  );
}
