import { education, certifications } from "@/content/site";
import { GraduationCap, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" aria-label="Education and Certifications" className="py-16 md:py-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education Block */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg border border-line bg-surface flex items-center justify-center text-accent">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                Education &amp; Foundations
              </h2>
            </div>

            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-line bg-surface/30 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display font-bold text-ink text-base">
                      {item.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-accent mt-0.5">
                      {item.institution}
                    </p>
                    <p className="text-xs text-ink-soft mt-1">
                      {item.notes}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-ink-soft self-start sm:self-center">
                    {item.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Block */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg border border-line bg-surface flex items-center justify-center text-accent">
                <Award className="h-4 w-4" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-line bg-surface/30 p-6 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display font-bold text-ink text-sm sm:text-base">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-accent mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-ink-soft shrink-0">
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
