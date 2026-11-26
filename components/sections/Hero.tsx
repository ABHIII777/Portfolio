import { site, experiences, projects } from "@/content/site";
import { Portrait } from "@/components/ui/Portrait";
import { HeroCodeBackground } from "@/components/ui/HeroCodeBackground";

const year = new Date().getFullYear();

const heroCode = `const abhi = {
  name: "${site.name}",
  role: "${site.role}",
  location: "${site.location}",
  timezone: "${site.timezone}",
  status: "${site.availability}",
  focus: ["distributed systems", "interfaces", "performance"],
  experience: [
${experiences
  .map(
    (job) =>
      `    { role: "${job.role}", company: "${job.company}", since: "${job.start}" }`
  )
  .join(",\n")}
  ],
  projects: {
${projects.map((project) => `    ${project.name}: "${project.tagline}"`).join(",\n")}
  },
  links: {
    email: "${site.links.email.replace("mailto:", "")}",
    github: "${site.links.github}",
    linkedin: "${site.links.linkedin}"
  }
};`;

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative overflow-hidden pt-16"
    >
      <HeroCodeBackground code={heroCode} />

      <div className="wrap relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between pb-7 pt-8 md:pt-12">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="eyebrow rise">Portfolio / {year}</p>
          <p className="eyebrow flex items-center gap-2 rise [animation-delay:120ms]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.availability}
          </p>
        </div>

        <div className="grid items-end gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-14">
          <div>
            <h1
              aria-label={`${site.name} — ${site.role}`}
              className="rise font-display text-[clamp(3.2rem,11.2vw,10rem)] font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-ink [animation-delay:80ms]"
            >
              <span className="block">
                <span className="hero-bracket mr-[0.06em]" aria-hidden="true">
                  {"{"}
                </span>
                Full Stack
              </span>
              <span className="block">
                Engineer
                <span className="hero-bracket ml-[0.06em]" aria-hidden="true">
                  {"}"}
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft rise [animation-delay:200ms] sm:text-lg">
              {site.pitch}
            </p>
          </div>

          <div className="relative mx-auto w-[clamp(8.5rem,23vw,15rem)] shrink-0 rise [animation-delay:260ms] lg:mx-0 lg:mb-1">
            <Portrait rotate="rotate-[2deg]" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-4 rise [animation-delay:340ms] sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">
            ©{year} / {site.role}
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft">
            <span aria-hidden="true">{"{{ "}</span>
            /Full-stack engineering
            <span className="terminal-caret" aria-hidden="true" />
            <span aria-hidden="true">{" }}"}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
