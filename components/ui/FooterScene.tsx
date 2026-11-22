type FigureProps = {
  x: number;
  scale?: number;
  accent?: boolean;
  variant?: "walk" | "phone" | "child" | "bag";
};

function Figure({ x, scale = 1, accent = false, variant = "walk" }: FigureProps) {
  const baseY = 96 - 27 * scale;

  return (
    <g
      transform={`translate(${x} ${baseY}) scale(${scale})`}
      fill="currentColor"
      className={accent ? "text-accent" : undefined}
    >
      <circle cx="0" cy="-46" r="7" />

      {variant === "child" ? (
        <>
          <path d="M-7 -36c0-4 3-6 7-6s7 2 7 6l2 20h-18z" />
          <path d="M-5 -16l-2 16h4l3-10 3 10h4l-2-16z" />
        </>
      ) : (
        <>
          <path d="M-9 -35c0-4.4 4-8 9-8s9 3.6 9 8l2 26h-22z" />

          {variant === "bag" && (
            <path d="M-12 -32c-3 0-5 2-5 5v14h4v-13h2z" opacity="0.8" />
          )}

          {variant === "phone" ? (
            <path d="M9 -30l8 8 2 8-4 2-4-7-4-4z" />
          ) : (
            <path d="M9 -31l6 16 3 10-4 1-6-12z" />
          )}

          <path d="M-9 -30l-6 16-3 10 4 1 6-12z" />

          {variant === "walk" ? (
            <path d="M-6 -9l-4 27h5l5-18 2 18h5l-4-27z" />
          ) : (
            <path d="M-7 -9l-2 27h5l3-16 3 16h5l-3-27z" />
          )}
        </>
      )}
    </g>
  );
}

function Crowd() {
  return (
    <svg
      viewBox="0 0 1200 100"
      width={1200}
      height={100}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-[92px] w-auto opacity-70 sm:h-[110px]"
    >
      <Figure x={75} variant="phone" />
      <Figure x={225} scale={0.92} variant="bag" />
      <Figure x={375} scale={1.05} accent />
      <Figure x={525} scale={0.78} variant="child" />
      <Figure x={675} variant="walk" />
      <Figure x={825} scale={0.95} variant="bag" />
      <Figure x={975} scale={1.03} variant="phone" />
      <Figure x={1125} scale={0.9} />
    </svg>
  );
}

export function FooterScene() {
  return (
    <div className="mt-10 md:mt-14">
      <div className="flex items-end justify-between gap-4">
        <p className="eyebrow">Off the clock</p>
        <p className="eyebrow hidden sm:block">The commute home</p>
      </div>

      <div className="footer-scene mt-4 border-y border-line py-3">
        <div className="footer-crowd text-ink">
          <Crowd />
          <Crowd />
        </div>
      </div>
    </div>
  );
}
