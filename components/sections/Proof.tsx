import { site } from "@/content/site";

export function Proof() {
  return (
    <section id="proof" aria-label="Key metrics" className="border-y border-line">
      <div className="wrap grid md:grid-cols-3">
        {site.proof.map((item, index) => (
          <div
            key={item.label}
            className="border-t border-line py-7 first:border-t-0 md:border-l md:border-t-0 md:px-8 md:py-9 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <p className="eyebrow">0{index + 1}</p>
            <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
