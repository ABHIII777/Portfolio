import { services } from "@/content/site";
import { Layers, ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <section id="services" aria-label="Services & Capabilities" className="py-20 md:py-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-line bg-surface flex items-center justify-center text-accent">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Services &amp; Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft">
                Full-stack development, backend fundamentals, and applied machine
                learning — built end to end.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline self-start md:self-auto"
          >
            <span>Discuss a project or role</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-surface/40 p-6 sm:p-8 transition-all hover:border-ink/50 hover:bg-surface/60"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm text-ink-soft leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-mono text-ink/70 uppercase tracking-wider">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink/90">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mt-6 pt-4 border-t border-line/60 flex flex-wrap gap-1.5">
                {service.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[10px] font-mono text-ink-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
