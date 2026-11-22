import { education, experiences } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience and education" className="section-pad">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">04 / Experience</p>
            <h2 className="mt-3 font-display text-display font-semibold leading-[0.9] tracking-[-0.05em] text-ink">
              Experience.
            </h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-ink-soft">
              Current work. Back to the foundations.
            </p>
          </header>

          <div className="lg:col-span-8">
            <ol>
              {experiences.map((job) => (
                <li key={job.id} className="experience-row">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-soft">
                      {job.start} — {job.end}
                    </p>
                    {job.end.toLowerCase() === "present" && (
                      <span className="mt-2 inline-flex items-center gap-1.5 border border-line px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-soft">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="experience-role">{job.role}</h3>
                    <p className="mt-1.5 text-sm text-ink-soft">
                      {job.company} · {job.location}
                    </p>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                      {job.blurb}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {job.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                        >
                          <span
                            className="mt-[0.15em] shrink-0 font-mono text-[0.65rem] text-ink-soft"
                            aria-hidden="true"
                          >
                            ↳
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-soft">
                      {job.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <p className="eyebrow">Education</p>
              <ol className="mt-4">
                {education.map((item) => (
                  <li
                    key={item.degree}
                    className="experience-row"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-soft">
                      {item.year}
                    </p>
                    <div>
                      <h3 className="experience-role">{item.degree}</h3>
                      <p className="mt-1.5 text-sm text-ink-soft">
                        {item.institution}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                        {item.notes}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
