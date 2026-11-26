import { site } from "@/content/site";
import { Portrait } from "@/components/ui/Portrait";
import { ArrowUpRight } from "lucide-react";

export function Bio() {
  return (
    <section id="about" aria-label="About" className="section-pad pt-8 md:pt-12">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display font-semibold leading-[0.88] tracking-[-0.055em] text-ink">
              Hi, I&apos;m
              <br />
              Abhi.
            </h2>

            <p className="mt-6 text-lead leading-tight text-ink">
              Full Stack Engineer
              <span className="text-ink-soft"> across web, systems &amp; ML.</span>
            </p>

            <div className="mt-9 border-t border-line pt-4">
              <p className="eyebrow">Most recently at</p>
              <p className="mt-2 text-base font-semibold text-ink">
                {site.current.company}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                {site.current.role}
                <br />
                {site.current.location}
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-4">
            <div className="w-full max-w-[17rem] lg:sticky lg:top-24">
              <Portrait rotate="-rotate-[1.5deg]" />
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <p className="text-lead leading-snug text-ink-soft">
                I build{" "}
                <strong className="font-semibold text-ink">
                  full-stack web apps
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-ink">
                  small, understandable systems
                </strong>
                , from Go servers and relational schemas to React interfaces and
                applied machine learning.
              </p>

              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                I&apos;m finishing a B.S. in Computer Science at Adani
                University. I care about the layer below the framework: how
                requests are framed, how data is modelled, and why a model gets
                it wrong.
              </p>
            </div>

            <div className="mt-9">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Explore projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-1 text-sm text-ink">{site.location}</dd>
              </div>
              <div>
                <dt className="eyebrow">Timezone</dt>
                <dd className="mt-1 text-sm text-ink">{site.timezone}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
