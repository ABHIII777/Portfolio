import { skillGroups } from "@/content/site";

export function Skills() {
  return (
    <section id="skills" aria-label="Technical skills" className="section-pad">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">02 / Toolkit</p>
            <h2 className="mt-3 font-display text-display font-semibold leading-[0.9] tracking-[-0.05em] text-ink">
              Tech Stack
            </h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-ink-soft">
              The tools behind my work, grouped by where they earn their keep.
            </p>
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {skillGroups.map((group, index) => (
              <article
                key={group.category}
                className="group flex flex-col bg-canvas p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-ink">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[0.6rem] text-ink-soft">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  {group.note}
                </p>

                <ul className="type-mosaic mt-6">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
