import { site } from "@/content/site";

type PortraitProps = {
  className?: string;
  rotate?: string;
};

/**
 * A code-built portrait card. Swap the monogram block for an <img> when a
 * real photo is ready — the flip, frame and caption stay the same.
 */
export function Portrait({ className = "", rotate = "" }: PortraitProps) {
  return (
    <figure
      className={`portrait group ${rotate} ${className}`}
      aria-label={`Portrait card for ${site.name}`}
    >
      <div className="portrait-inner">
        <div className="portrait-face portrait-front">
          <div className="relative flex items-start justify-between eyebrow">
            <span>Portrait</span>
            <span aria-hidden="true">01 / 01</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <span className="portrait-monogram">
              AP<span className="portrait-slash">/</span>
            </span>
          </div>

          <div className="relative flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold leading-tight">{site.name}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{site.role}</p>
            </div>
            <span className="portrait-meta text-right">
              {site.location.split(",")[0]}
              <br />
              {site.timezone.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="portrait-face portrait-back" aria-hidden="true">
          <div className="flex items-center justify-between eyebrow opacity-60">
            <span>Status</span>
            <span>02</span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] opacity-60">
              Most recently
            </p>
            <p className="font-display text-2xl font-semibold leading-[1.05] tracking-tight">
              {site.current.role}
              <br />
              <span className="opacity-60">at {site.current.company}</span>
            </p>
            <p className="max-w-[22ch] text-sm leading-relaxed opacity-70">
              {site.availability}
            </p>
          </div>

          <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-60">
            <span>{site.timezone}</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-canvas" />
              Open
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
