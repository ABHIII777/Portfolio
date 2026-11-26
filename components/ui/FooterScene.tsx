"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type FigureVariant =
  | "hoodie"
  | "saree"
  | "kurta"
  | "student"
  | "office"
  | "cap"
  | "child"
  | "elder";

type CrowdFigure = {
  variant: FigureVariant;
  height: number;
  skin: string;
  garment: string;
  accent?: string;
  flip?: boolean;
  glasses?: boolean;
  expression?: "smile" | "calm" | "grin";
};

const BACK_CROWD: CrowdFigure[] = [
  { variant: "hoodie", height: 98, skin: "#e6d2bf", garment: "#4b4943", flip: true, expression: "calm" },
  { variant: "saree", height: 92, skin: "#d6b89c", garment: "#6e6a61", accent: "#c7c3b8", expression: "smile" },
  { variant: "student", height: 100, skin: "#eddcca", garment: "#595750", flip: true, glasses: true, expression: "grin" },
  { variant: "child", height: 68, skin: "#dfc4aa", garment: "#7a766c", expression: "grin" },
  { variant: "kurta", height: 96, skin: "#cfa987", garment: "#474540", flip: true, expression: "calm" },
  { variant: "elder", height: 90, skin: "#e0cbb6", garment: "#636058", glasses: true, expression: "smile" },
  { variant: "office", height: 102, skin: "#d8bc9f", garment: "#3f3d38", flip: true, expression: "calm" },
  { variant: "cap", height: 95, skin: "#e8d6c4", garment: "#55524b", expression: "smile" },
  { variant: "saree", height: 94, skin: "#c8a280", garment: "#524f49", flip: true, expression: "smile" },
  { variant: "hoodie", height: 99, skin: "#dfcab5", garment: "#66625a", glasses: true, expression: "calm" },
  { variant: "student", height: 94, skin: "#d2b192", garment: "#43413c", flip: true, expression: "smile" },
  { variant: "child", height: 70, skin: "#ebdac7", garment: "#6c6860", flip: true, expression: "grin" },
  { variant: "kurta", height: 97, skin: "#dcbda1", garment: "#5b5851", expression: "smile" },
  { variant: "elder", height: 92, skin: "#d5b79a", garment: "#4e4b45", flip: true, glasses: true, expression: "calm" },
];

const FRONT_CROWD: CrowdFigure[] = [
  { variant: "student", height: 146, skin: "#e4ceb9", garment: "#1f1f1d", accent: "#d8ff3e", glasses: true, expression: "smile" },
  { variant: "saree", height: 138, skin: "#cfa886", garment: "#2b2a27", accent: "#d8ff3e", flip: true, expression: "smile" },
  { variant: "hoodie", height: 148, skin: "#ecdac8", garment: "#33322e", expression: "calm" },
  { variant: "child", height: 98, skin: "#dcbda0", garment: "#46443e", accent: "#d8ff3e", expression: "grin" },
  { variant: "office", height: 150, skin: "#d4b394", garment: "#181816", flip: true, glasses: true, expression: "calm" },
  { variant: "kurta", height: 142, skin: "#c99f7c", garment: "#262522", accent: "#ecebe5", expression: "smile" },
  { variant: "cap", height: 144, skin: "#e8d5c2", garment: "#2e2d29", flip: true, expression: "grin" },
  { variant: "elder", height: 136, skin: "#dec4ab", garment: "#3c3a35", glasses: true, expression: "smile" },
  { variant: "saree", height: 140, skin: "#e1c7ae", garment: "#232220", expression: "calm" },
  { variant: "student", height: 145, skin: "#cfa988", garment: "#1b1b19", flip: true, expression: "grin" },
  { variant: "hoodie", height: 149, skin: "#e7d3bf", garment: "#2a2926", accent: "#d8ff3e", flip: true, glasses: true, expression: "smile" },
  { variant: "child", height: 102, skin: "#ebd8c5", garment: "#3a3934", flip: true, expression: "grin" },
  { variant: "office", height: 146, skin: "#d7b899", garment: "#20201d", expression: "calm" },
  { variant: "kurta", height: 143, skin: "#e0c4a8", garment: "#2f2e2a", flip: true, expression: "smile" },
];

function Face({
  cx = 40,
  cy = 24,
  skin,
  hairColor = "#141414",
  glasses = false,
  expression = "smile",
  variant,
}: {
  cx?: number;
  cy?: number;
  skin: string;
  hairColor?: string;
  glasses?: boolean;
  expression?: "smile" | "calm" | "grin";
  variant: FigureVariant;
}) {
  const isElder = variant === "elder";
  const actualHair = isElder ? "#8c8982" : hairColor;

  return (
    <g>
      {/* Back hair for saree / long hair */}
      {variant === "saree" && (
        <>
          <circle cx={cx - 11} cy={cy - 1} r="5.5" fill={actualHair} />
          <path
            d={`M${cx - 12} ${cy - 2}c0-10 24-10 24 0v9c-4 2-20 2-24 0z`}
            fill={actualHair}
          />
        </>
      )}

      {/* Ears */}
      <circle cx={cx - 11} cy={cy + 1} r="2.6" fill={skin} stroke="#141414" strokeWidth="1.2" />
      <circle cx={cx + 11} cy={cy + 1} r="2.6" fill={skin} stroke="#141414" strokeWidth="1.2" />

      {/* Head */}
      <ellipse
        cx={cx}
        cy={cy}
        rx="10.8"
        ry="12.4"
        fill={skin}
        stroke="#141414"
        strokeWidth="1.4"
      />

      {/* Hairstyles */}
      {variant === "cap" ? (
        <g>
          <path
            d={`M${cx - 11} ${cy - 4}c0-7 5-10.5 11-10.5s11 3.5 11 10.5z`}
            fill="#141414"
          />
          <path
            d={`M${cx - 12} ${cy - 4}h26c1.5 0 2 2.2.2 2.2H${cx - 11.5}z`}
            fill="#2b2a27"
            stroke="#141414"
            strokeWidth="1"
          />
        </g>
      ) : variant === "saree" ? (
        <g>
          <path
            d={`M${cx - 11} ${cy - 3}c0-7.5 5-11 11-11s11 3.5 11 11c-3-3-7-4.5-11-4.5s-8 1.5-11 4.5z`}
            fill={actualHair}
          />
          {/* Bindi */}
          <circle cx={cx} cy={cy - 3.8} r="1.1" fill="#141414" />
        </g>
      ) : variant === "child" ? (
        <path
          d={`M${cx - 10.5} ${cy - 3}c0-7 4.5-10.5 10.5-10.5s10.5 3.5 10.5 10.5c-2.5-2.5-5-3-7-2.5-2-2-6-1.5-14 2.5z`}
          fill={actualHair}
        />
      ) : (
        <path
          d={`M${cx - 11} ${cy - 2}c-.5-8 4.5-12.5 11-12.5s11.5 4.5 11 12.5c-1.5-3.5-4.5-5.5-11-5.5s-9.5 2-11 5.5z`}
          fill={actualHair}
        />
      )}

      {/* Eyebrows */}
      <path
        d={`M${cx - 6.5} ${cy - 3.5}q2.5-1.4 4.5 0M${cx + 2} ${cy - 3.5}q2.5-1.4 4.5 0`}
        stroke="#141414"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyes */}
      <circle cx={cx - 4.2} cy={cy - 0.5} r="1.35" fill="#141414" />
      <circle cx={cx + 4.2} cy={cy - 0.5} r="1.35" fill="#141414" />

      {/* Glasses */}
      {glasses && (
        <g stroke="#141414" strokeWidth="1.3" fill="none">
          <rect x={cx - 8.2} y={cy - 3.2} width="7" height="5.2" rx="1.8" />
          <rect x={cx + 1.2} y={cy - 3.2} width="7" height="5.2" rx="1.8" />
          <path d={`M${cx - 1.2} ${cy - 0.7}h2.4`} />
        </g>
      )}

      {/* Nose */}
      <path
        d={`M${cx} ${cy - 0.5}v3.4l1.4.8`}
        stroke="#141414"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Mouth / Expression */}
      {expression === "grin" ? (
        <path
          d={`M${cx - 3.8} ${cy + 5.2}q3.8 3.6 7.6 0z`}
          fill="#ecebe5"
          stroke="#141414"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      ) : expression === "smile" ? (
        <path
          d={`M${cx - 3.5} ${cy + 5.5}q3.5 2.6 7 0`}
          stroke="#141414"
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d={`M${cx - 2.8} ${cy + 5.8}h5.6`}
          stroke="#141414"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

function Figure({ figure }: { figure: CrowdFigure }) {
  const { variant, skin, garment, accent = "#d8ff3e", glasses, expression } = figure;
  const isChild = variant === "child";

  return (
    <svg
      viewBox="0 0 80 152"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="crowd-figure"
    >
      {/* Neck */}
      <rect
        x="35.5"
        y={isChild ? 44 : 34}
        width="9"
        height="9"
        rx="3"
        fill={skin}
        stroke="#141414"
        strokeWidth="1.2"
      />

      {/* Legs & Shoes */}
      {variant === "saree" ? (
        <g>
          <path d="M31 124l-1.5 19" stroke={skin} strokeWidth="5.5" strokeLinecap="round" />
          <path d="M48 124l1.5 19" stroke={skin} strokeWidth="5.5" strokeLinecap="round" />
          <rect x="25" y="142" width="9" height="4.5" rx="2" fill="#141414" />
          <rect x="45" y="142" width="9" height="4.5" rx="2" fill="#141414" />
        </g>
      ) : isChild ? (
        <g>
          <path d="M33 96l-3 26-2 18" stroke="#141414" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M47 96l3 26 2 18" stroke="#141414" strokeWidth="7.5" strokeLinecap="round" />
          <rect x="22" y="139" width="10" height="6" rx="2.5" fill={accent} stroke="#141414" strokeWidth="1.2" />
          <rect x="48" y="139" width="10" height="6" rx="2.5" fill={accent} stroke="#141414" strokeWidth="1.2" />
        </g>
      ) : (
        <g>
          <path d="M33 88l-4 32-3 22" stroke="#1c1c1a" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M47 88l4 32 3 22" stroke="#1c1c1a" strokeWidth="8.5" strokeLinecap="round" />
          <path
            d="M20 142h11v5.5H18.5c-1.8 0-2.5-2-.8-3.4z"
            fill={variant === "student" || variant === "hoodie" ? accent : "#141414"}
            stroke="#141414"
            strokeWidth="1.2"
          />
          <path
            d="M49 142h11l2.3 2.1c1.7 1.4 1 3.4-.8 3.4H49z"
            fill={variant === "student" || variant === "hoodie" ? accent : "#141414"}
            stroke="#141414"
            strokeWidth="1.2"
          />
        </g>
      )}

      {/* Torso / Outfit */}
      {variant === "saree" ? (
        <g>
          <path
            d="M27 46c0-4 4-7 13-7s13 3 13 7l6 80c.3 2.5-1.5 4.5-4 4.5H25c-2.5 0-4.3-2-4-4.5z"
            fill={garment}
            stroke="#141414"
            strokeWidth="1.4"
          />
          {/* Saree pallu diagonal drape */}
          <path
            d="M27 44l24 40 2 44H36z"
            fill={accent}
            opacity="0.22"
          />
          <path d="M27 45l25 42" stroke="#141414" strokeWidth="1.2" />
        </g>
      ) : variant === "kurta" ? (
        <g>
          <path
            d="M26 45c0-4 5-7 14-7s14 3 14 7l3 57c.2 2.5-1.5 4.5-4 4.5H27c-2.5 0-4.2-2-4-4.5z"
            fill={garment}
            stroke="#141414"
            strokeWidth="1.4"
          />
          {/* Kurta placket & stole */}
          <path d="M40 39v20" stroke="#ecebe5" strokeWidth="1.6" />
          <path d="M31 41l4 42M49 41l-4 42" stroke="#ecebe5" strokeWidth="2.5" opacity="0.45" />
        </g>
      ) : isChild ? (
        <g>
          <path
            d="M26 55c0-4 4-6 14-6s14 2 14 6l3 40c.2 2.5-1.5 4-4 4H27c-2.5 0-4.2-1.5-4-4z"
            fill={garment}
            stroke="#141414"
            strokeWidth="1.4"
          />
          <path d="M26 67h28M26 77h28" stroke="#ecebe5" strokeWidth="2" opacity="0.55" />
        </g>
      ) : (
        <g>
          <path
            d="M25 45c0-4 5-7 15-7s15 3 15 7l2 44c.2 2.5-1.5 4-4 4H27c-2.5 0-4.2-1.5-4-4z"
            fill={garment}
            stroke="#141414"
            strokeWidth="1.4"
          />
          {variant === "hoodie" && (
            <>
              <path d="M32 39q8 8 16 0" stroke="#141414" strokeWidth="1.5" fill="none" />
              <path d="M37 44v13M43 44v13" stroke="#ecebe5" strokeWidth="1.4" strokeLinecap="round" />
            </>
          )}
          {variant === "office" && (
            <path d="M34 39l6 11 6-11" fill="#ecebe5" stroke="#141414" strokeWidth="1.2" />
          )}
          {variant === "student" && (
            <>
              {/* Backpack straps */}
              <path d="M31 41v32M49 41v32" stroke="#141414" strokeWidth="2.6" opacity="0.65" />
            </>
          )}
        </g>
      )}

      {/* Arms & Props */}
      <path
        d={isChild ? "M26 57l-5 19-1 10" : "M26 47l-6 22-2 15"}
        stroke={garment}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={isChild ? "M26 57l-5 19-1 10" : "M26 47l-6 22-2 15"}
        stroke="#141414"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx={isChild ? 20 : 18} cy={isChild ? 87 : 85} r="3.4" fill={skin} stroke="#141414" strokeWidth="1.1" />

      {variant === "cap" ? (
        <>
          <path d="M54 47l6 17-3-12" stroke={garment} strokeWidth="7" strokeLinecap="round" />
          <rect x="55" y="41" width="6.5" height="11" rx="1.4" fill="#141414" stroke="#ecebe5" strokeWidth="0.8" />
          <circle cx="57" cy="52" r="3.3" fill={skin} stroke="#141414" strokeWidth="1.1" />
        </>
      ) : variant === "elder" ? (
        <>
          <path d="M54 47l6 20 1 11" stroke={garment} strokeWidth="7" strokeLinecap="round" />
          <circle cx="61" cy="79" r="3.3" fill={skin} stroke="#141414" strokeWidth="1.1" />
          {/* Walking stick */}
          <path d="M62 79l4 66" stroke="#141414" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M58 79c0-3 4-3 4 0" stroke="#141414" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </>
      ) : variant === "saree" || variant === "office" ? (
        <>
          <path d="M54 47l5 22 1 12" stroke={garment} strokeWidth="7" strokeLinecap="round" />
          <circle cx="60" cy="82" r="3.3" fill={skin} stroke="#141414" strokeWidth="1.1" />
          {/* Bag / Briefcase */}
          <rect x="53" y="84" width="15" height="16" rx="2" fill="#141414" stroke="#ecebe5" strokeWidth="0.9" />
          <path d="M57 84c0-5 7-5 7 0" stroke="#141414" strokeWidth="1.8" fill="none" />
        </>
      ) : (
        <>
          <path
            d={isChild ? "M54 57l5 19 1 10" : "M54 47l6 22 2 15"}
            stroke={garment}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx={isChild ? 60 : 62} cy={isChild ? 87 : 85} r="3.4" fill={skin} stroke="#141414" strokeWidth="1.1" />
        </>
      )}

      {/* Over-ear headphones for student */}
      {variant === "student" && (
        <g>
          <path d="M27 25c0-11 26-11 26 0" stroke={accent} strokeWidth="2.6" fill="none" />
          <rect x="25" y="21" width="4" height="9" rx="2" fill="#141414" stroke={accent} strokeWidth="1" />
          <rect x="51" y="21" width="4" height="9" rx="2" fill="#141414" stroke={accent} strokeWidth="1" />
        </g>
      )}

      {/* Face */}
      <Face
        cx={40}
        cy={isChild ? 34 : 24}
        skin={skin}
        glasses={glasses}
        expression={expression}
        variant={variant}
      />
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
          <span
            className="crowd-figure-bob"
            style={{
              animationDelay: `${(index * -0.45).toFixed(2)}s`,
            }}
          >
            <Figure figure={figure} />
          </span>
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

      {/* Sneakers — lime accent */}
      <path d="M49 286h17v13H44c-3 0-4-4-1-6z" fill="#d8ff3e" stroke="#141414" strokeWidth="1.6" />
      <path d="M74 286h17l7 7c2 2 0 6-3 6H74z" fill="#d8ff3e" stroke="#141414" strokeWidth="1.6" />

      {/* Jacket / Overshirt */}
      <path
        d="M36 106c0-14 15-22 34-22s34 8 34 22l-4 88H40z"
        fill="#141414"
      />

      {/* Collar & inner tee */}
      <path d="M58 86l12 16 12-16z" fill="#ecebe5" />
      <path d="M58 86l12 16 12-16" stroke="#141414" strokeWidth="1.8" />

      {/* Neck */}
      <rect x="62" y="72" width="16" height="18" rx="5" fill="#e2cbb5" stroke="#141414" strokeWidth="1.6" />

      {/* Ears */}
      <circle cx="47" cy="57" r="4.2" fill="#e2cbb5" stroke="#141414" strokeWidth="1.6" />
      <circle cx="93" cy="57" r="4.2" fill="#e2cbb5" stroke="#141414" strokeWidth="1.6" />

      {/* Head */}
      <ellipse cx="70" cy="55" rx="20.5" ry="24.5" fill="#e2cbb5" stroke="#141414" strokeWidth="1.8" />

      {/* Hair */}
      <path
        d="M48 53c-1-19 9-31 22-31s23 12 22 31c-3-6-9-11-22-11s-19 5-22 11z"
        fill="#141414"
      />

      {/* Eyebrows */}
      <path
        d="M54 46q5-2.5 9 0M77 46q5-2.5 9 0"
        stroke="#141414"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <circle cx="58.5" cy="53.5" r="2.1" fill="#141414" />
      <circle cx="81.5" cy="53.5" r="2.1" fill="#141414" />

      {/* Nose */}
      <path d="M70 55v7l2.5 1.5" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* Confident subtle smile */}
      <path d="M63 69q7 4 14 0" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" />

      {/* Glasses — the signature flash of lime */}
      <rect
        x="49"
        y="48"
        width="18"
        height="11.5"
        rx="4"
        stroke="#141414"
        strokeWidth="4"
      />
      <rect
        x="73"
        y="48"
        width="18"
        height="11.5"
        rx="4"
        stroke="#141414"
        strokeWidth="4"
      />
      <rect
        x="49"
        y="48"
        width="18"
        height="11.5"
        rx="4"
        stroke="#d8ff3e"
        strokeWidth="2.2"
      />
      <rect
        x="73"
        y="48"
        width="18"
        height="11.5"
        rx="4"
        stroke="#d8ff3e"
        strokeWidth="2.2"
      />
      <path d="M67 53.5h6" stroke="#141414" strokeWidth="4" />
      <path d="M67 53.5h6" stroke="#d8ff3e" strokeWidth="2.2" />

      {/* Hands in pockets */}
      <path
        d="M42 178c5 4 12 4 17 0"
        stroke="#ecebe5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M81 178c5 4 12 4 17 0"
        stroke="#ecebe5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FooterScene() {
  const [paused, setPaused] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Normalized [-1, 1] as scene passes through viewport
      const center = rect.top + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (center - vh / 2) / (vh / 2)));
      el.style.setProperty("--parallax-scroll", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      el.style.setProperty("--parallax-x", Math.max(-1, Math.min(1, nx)).toFixed(4));
    };

    const onPointerLeave = () => {
      el.style.setProperty("--parallax-x", "0");
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="footer-crowd-scene"
      data-paused={paused ? "true" : "false"}
    >
      <span className="footer-crowd-name" aria-hidden="true">
        ABHI.
      </span>

      <CrowdLayer figures={BACK_CROWD} className="footer-crowd-back" />

      <SelfPortrait />

      <CrowdLayer figures={FRONT_CROWD} className="footer-crowd-front" />

      <p className="sr-only">
        Illustrated commuters with distinct faces, outfits, and accessories walk
        in both directions across foreground and background parallax layers
        while Abhi stands still among them, hands in pockets, wearing lime
        glasses and sneakers.
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
