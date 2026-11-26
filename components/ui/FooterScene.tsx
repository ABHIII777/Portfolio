"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

type FigureVariant =
  | "coat"
  | "dress"
  | "phone"
  | "bag"
  | "child"
  | "elder"
  | "cap";

type CrowdFigure = {
  variant: FigureVariant;
  height: number;
  flip?: boolean;
};

const BACK_CROWD: CrowdFigure[] = [
  { variant: "coat", height: 86, flip: true },
  { variant: "dress", height: 78 },
  { variant: "phone", height: 90 },
  { variant: "child", height: 58 },
  { variant: "bag", height: 84, flip: true },
  { variant: "elder", height: 80 },
  { variant: "cap", height: 88 },
  { variant: "coat", height: 76 },
  { variant: "dress", height: 92, flip: true },
  { variant: "phone", height: 82 },
  { variant: "bag", height: 90 },
  { variant: "child", height: 62, flip: true },
  { variant: "coat", height: 84 },
  { variant: "elder", height: 88, flip: true },
  { variant: "dress", height: 80 },
  { variant: "cap", height: 94, flip: true },
];

const FRONT_CROWD: CrowdFigure[] = [
  { variant: "coat", height: 128, flip: true },
  { variant: "dress", height: 112 },
  { variant: "phone", height: 132 },
  { variant: "child", height: 82 },
  { variant: "bag", height: 120, flip: true },
  { variant: "elder", height: 116 },
  { variant: "cap", height: 134, flip: true },
  { variant: "coat", height: 122 },
  { variant: "dress", height: 138, flip: true },
  { variant: "phone", height: 118 },
  { variant: "bag", height: 130 },
  { variant: "child", height: 88, flip: true },
  { variant: "coat", height: 126 },
  { variant: "elder", height: 132, flip: true },
  { variant: "dress", height: 120 },
  { variant: "cap", height: 136 },
];

function Figure({ variant }: { variant: FigureVariant }) {
  const isChild = variant === "child";

  return (
    <svg
      viewBox="0 0 64 128"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="crowd-figure"
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle
          cx="32"
          cy={isChild ? 18 : 14}
          r={isChild ? 10 : 8.5}
          stroke="none"
        />

        {variant === "dress" && (
          <circle cx="22" cy="17" r="3.5" stroke="none" />
        )}

        {variant === "cap" && (
          <path
            d="M22 9c1-6 5-9 10-9s9 3 10 9h4c1.2 0 1.6 2 .4 2H17.6c-1.2 0-.8-2 .4-2z"
            stroke="none"
          />
        )}

        {/* Torso */}
        {variant === "dress" ? (
          <path
            d="M23 29c0-3 2-5 5-5h8c3 0 5 2 5 5l3 19 12 52c.7 3-1.3 5-4 5H16c-2.7 0-4.7-2-4-5l12-52z"
            stroke="none"
          />
        ) : isChild ? (
          <path
            d="M22 32c0-3 2-5 5-5h10c3 0 5 2 5 5l3 25c.3 3-1.5 5-4.5 5H21.5c-3 0-4.8-2-4.5-5z"
            stroke="none"
          />
        ) : (
          <path
            d="M23 29c0-3 2-5 5-5h8c3 0 5 2 5 5l4 33c.3 3-1.5 5-4.5 5H23.5c-3 0-4.8-2-4.5-5z"
            stroke="none"
          />
        )}

        {/* Arms */}
        <path d="M24 33l-5 17-2 13" fill="none" strokeWidth="6" />

        {variant === "phone" ? (
          <>
            <path d="M40 33l6 13 1-12" fill="none" strokeWidth="6" />
            <rect x="44" y="24" width="6" height="11" rx="1.5" stroke="none" />
          </>
        ) : variant === "bag" ? (
          <>
            <path d="M40 33l5 19" fill="none" strokeWidth="6" />
            <rect x="41" y="52" width="13" height="16" rx="2" stroke="none" />
            <path d="M45 52c0-5 5-5 5 0" fill="none" strokeWidth="1.8" />
          </>
        ) : variant === "elder" ? (
          <>
            <path d="M40 33l7 18 2 9" fill="none" strokeWidth="6" />
            <path d="M47 48l5 72" fill="none" strokeWidth="2.4" />
          </>
        ) : (
          <path d="M40 33l6 16 1 14" fill="none" strokeWidth="6" />
        )}

        {/* Legs */}
        {variant === "dress" ? (
          <>
            <path d="M28 101l-2 17" fill="none" strokeWidth="5.5" />
            <path d="M36 101l3 17" fill="none" strokeWidth="5.5" />
            <path d="M23 119h6M36 119h6" fill="none" strokeWidth="4" />
          </>
        ) : isChild ? (
          <>
            <path d="M26 62l-2 30-4 24" fill="none" strokeWidth="7" />
            <path d="M37 62l3 30 4 24" fill="none" strokeWidth="7" />
          </>
        ) : (
          <>
            <path d="M27 63l-3 29-5 27" fill="none" strokeWidth="7.5" />
            <path d="M37 63l3 29 6 27" fill="none" strokeWidth="7.5" />
          </>
        )}
      </g>
    </svg>
  );
}

function CrowdSet({ figures }: { figures: CrowdFigure[] }) {
  return (
    <div className="crowd-set">
      {figures.map((figure, index) => (
        <span
          key={`${figure.variant}-${index}`}
          className="crowd-figure-wrap"
          style={{
            height: `${figure.height}px`,
            transform: figure.flip ? "scaleX(-1)" : undefined,
          }}
        >
          <Figure variant={figure.variant} />
        </span>
      ))}
    </div>
  );
}

function CrowdLayer({
  figures,
  className,
}: {
  figures: CrowdFigure[];
  className: string;
}) {
  return (
    <div className={`footer-crowd-layer ${className}`} aria-hidden="true">
      <div className="crowd-track">
        <CrowdSet figures={figures} />
        <CrowdSet figures={figures} />
      </div>
    </div>
  );
}

function SelfPortrait() {
  return (
    <svg
      className="footer-self"
      viewBox="0 0 140 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Legs */}
      <path d="M48 186h20l-1 100H51z" fill="#141414" />
      <path d="M72 186h20l-2 100H74z" fill="#141414" />

      {/* Sneakers */}
      <path d="M49 286h17v13H44c-3 0-4-4-1-6z" fill="#d8ff3e" />
      <path d="M74 286h17l7 7c2 2 0 6-3 6H74z" fill="#d8ff3e" />

      {/* Shirt */}
      <path
        d="M36 106c0-14 15-22 34-22s34 8 34 22l-4 88H40z"
        fill="#141414"
      />

      {/* Collar */}
      <path d="M59 88l11 13 11-13" stroke="#ecebe5" strokeWidth="3" />

      {/* Neck */}
      <rect x="62" y="72" width="16" height="18" rx="5" fill="#141414" />

      {/* Head */}
      <circle cx="46" cy="55" r="4" fill="#141414" />
      <circle cx="94" cy="55" r="4" fill="#141414" />
      <ellipse cx="70" cy="52" rx="23" ry="27" fill="#141414" />
      <ellipse cx="70" cy="57" rx="18.5" ry="22" fill="#ecebe5" />

      {/* Hair */}
      <path
        d="M47 54c-1-19 8-32 23-32s24 13 23 32l-4 4c0-14-7-23-19-23s-19 9-19 23z"
        fill="#141414"
      />

      {/* Face */}
      <path d="M70 62v7l3 2" stroke="#141414" strokeWidth="1.6" />
      <path d="M64 73c4 2 8 2 12 0" stroke="#141414" strokeWidth="1.8" />

      {/* Glasses — the one flash of colour */}
      <rect
        x="49"
        y="49"
        width="17"
        height="11"
        rx="5"
        stroke="#141414"
        strokeWidth="4.5"
      />
      <rect
        x="74"
        y="49"
        width="17"
        height="11"
        rx="5"
        stroke="#141414"
        strokeWidth="4.5"
      />
      <rect
        x="49"
        y="49"
        width="17"
        height="11"
        rx="5"
        stroke="#d8ff3e"
        strokeWidth="2.5"
      />
      <rect
        x="74"
        y="49"
        width="17"
        height="11"
        rx="5"
        stroke="#d8ff3e"
        strokeWidth="2.5"
      />
      <path d="M66 54h8" stroke="#141414" strokeWidth="4.5" />
      <path d="M66 54h8" stroke="#d8ff3e" strokeWidth="2.5" />

      {/* Hands in pockets */}
      <path
        d="M42 178c5 4 12 4 17 0"
        stroke="#ecebe5"
        strokeWidth="1.6"
      />
      <path
        d="M81 178c5 4 12 4 17 0"
        stroke="#ecebe5"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function FooterScene() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="footer-crowd-scene" data-paused={paused ? "true" : "false"}>
      <span className="footer-crowd-name" aria-hidden="true">
        ABHI.
      </span>

      <CrowdLayer figures={BACK_CROWD} className="footer-crowd-back" />

      <SelfPortrait />

      <CrowdLayer figures={FRONT_CROWD} className="footer-crowd-front" />

      <p className="sr-only">
        A stylised crowd of commuters walks past while Abhi stands still among
        them, hands in his pockets, wearing lime glasses and sneakers.
      </p>

      <button
        type="button"
        className="footer-crowd-toggle"
        onClick={() => setPaused((current) => !current)}
        aria-label={paused ? "Play crowd animation" : "Pause crowd animation"}
      >
        {paused ? (
          <Play className="h-3 w-3" aria-hidden="true" />
        ) : (
          <Pause className="h-3 w-3" aria-hidden="true" />
        )}
        {paused ? "Play crowd" : "Pause crowd"}
      </button>
    </div>
  );
}
