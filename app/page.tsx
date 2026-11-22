import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Proof } from "@/components/sections/Proof";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Bio />
      <Proof />
      <Work />
      <Services />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
