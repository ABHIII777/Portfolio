"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const INK = "#141414";
const CREAM = "#ecebe5";
const MOUTH = "#7a2f2f";
const BLUSH = "#ff8f7a";

type HairStyle =
  | "afro"
  | "curls"
  | "bun"
  | "long"
  | "ponytail"
  | "pigtails"
  | "buzz"
  | "bald"
  | "hijab"
  | "cap"
  | "beanie"
  | "bucket";

type Outfit =
  | "tee"
  | "hoodie"
  | "jacket"
  | "saree"
  | "kurta"
  | "coat"
  | "dress"
  | "dungarees"
  | "sweater";

type Accessory =
  | "none"
  | "headphones"
  | "skateboard"
  | "tote"
  | "camera"
  | "book"
  | "balloon"
  | "briefcase"
  | "guitar"
  | "coffee"
  | "phone"
  | "boombox"
  | "stick"
  | "ball";

type Expression = "smile" | "grin" | "calm" | "open";

type Character = {
  name: string;
  height: number;
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  outfit: Outfit;
  top: string;
  bottom: string;
  shoes: string;
  accent: string;
  accessory: Accessory;
  glasses?: boolean;
  beard?: boolean;
  expression?: Expression;
  child?: boolean;
  flip?: boolean;
};

const BACK_CROWD: Character[] = [
  { name: "Asha", height: 98, skin: "#a9714b", hair: "#1a1310", hairStyle: "bun", outfit: "saree", top: "#e07a5f", bottom: "#2b2a27", shoes: "#141414", accent: "#ffd166", accessory: "tote", expression: "smile" },
  { name: "Om", height: 102, skin: "#8d5a3b", hair: "#141414", hairStyle: "buzz", outfit: "hoodie", top: "#5b7cfa", bottom: "#22303f", shoes: "#f8f7f4", accent: "#d8ff3e", accessory: "headphones", expression: "grin" },
  { name: "Lily", height: 96, skin: "#f2d3b3", hair: "#d9a441", hairStyle: "long", outfit: "dress", top: "#6fe3b0", bottom: "#6fe3b0", shoes: "#ffd166", accent: "#ff7a59", accessory: "ball", expression: "smile" },
  { name: "Hari", height: 100, skin: "#b07a52", hair: "#9a968c", hairStyle: "bald", outfit: "sweater", top: "#b5651d", bottom: "#3a3a35", shoes: "#141414", accent: "#ffd166", accessory: "stick", beard: true, expression: "calm" },
  { name: "Jiya", height: 78, skin: "#c08a5e", hair: "#2a1a10", hairStyle: "pigtails", outfit: "dress", top: "#ff9fb2", bottom: "#ff9fb2", shoes: "#f8f7f4", accent: "#ff7a59", accessory: "balloon", expression: "grin", child: true },
  { name: "Noor", height: 99, skin: "#c08a5e", hair: "#2fbfa0", hairStyle: "hijab", outfit: "coat", top: "#ffd166", bottom: "#2b2a27", shoes: "#141414", accent: "#ff7a59", accessory: "book", expression: "smile" },
  { name: "Rohan", height: 101, skin: "#6f4a2f", hair: "#141414", hairStyle: "cap", outfit: "tee", top: "#ff7a59", bottom: "#24405f", shoes: "#f8f7f4", accent: "#d8ff3e", accessory: "skateboard", expression: "grin" },
  { name: "Sana", height: 97, skin: "#d9a97c", hair: "#141414", hairStyle: "ponytail", outfit: "jacket", top: "#c9a7ff", bottom: "#2b2a27", shoes: "#f8f7f4", accent: "#ffd166", accessory: "phone", expression: "smile" },
  { name: "Vik", height: 100, skin: "#e8c39e", hair: "#3b2a20", hairStyle: "curls", outfit: "sweater", top: "#2f7d5b", bottom: "#3a3a35", shoes: "#141414", accent: "#ffd166", accessory: "coffee", glasses: true, expression: "smile" },
  { name: "Diya", height: 98, skin: "#8d5a3b", hair: "#1b1512", hairStyle: "afro", outfit: "tee", top: "#ffd166", bottom: "#2b2a27", shoes: "#f8f7f4", accent: "#ff7a59", accessory: "headphones", expression: "grin" },
  { name: "Amar", height: 101, skin: "#b07a52", hair: "#241a14", hairStyle: "buzz", outfit: "coat", top: "#2a3f6b", bottom: "#22303f", shoes: "#141414", accent: "#d8ff3e", accessory: "briefcase", expression: "calm" },
  { name: "Nisha", height: 96, skin: "#c98a5c", hair: "#1a1310", hairStyle: "bun", outfit: "kurta", top: "#ff9fb2", bottom: "#2b2a27", shoes: "#141414", accent: "#ffd166", accessory: "book", expression: "smile" },
];

const FRONT_CROWD: Character[] = [
  { name: "Nia", height: 148, skin: "#8d5a3b", hair: "#1b1512", hairStyle: "afro", outfit: "hoodie", top: "#ff7a59", bottom: "#2b2a27", shoes: "#f8f7f4", accent: "#d8ff3e", accessory: "headphones", expression: "grin" },
  { name: "Dev", height: 146, skin: "#c98a5c", hair: "#241a14", hairStyle: "cap", outfit: "tee", top: "#2fbfa0", bottom: "#24405f", shoes: "#ffd166", accent: "#ff7a59", accessory: "skateboard", expression: "grin" },
  { name: "Meera", height: 142, skin: "#a9714b", hair: "#1a1310", hairStyle: "bun", outfit: "saree", top: "#ff5a4e", bottom: "#2b2a27", shoes: "#141414", accent: "#ffd166", accessory: "tote", expression: "smile" },
  { name: "Kabir", height: 150, skin: "#6f4a2f", hair: "#16110d", hairStyle: "curls", outfit: "jacket", top: "#ffd166", bottom: "#22303f", shoes: "#f8f7f4", accent: "#ff7a59", accessory: "camera", glasses: true, expression: "calm" },
  { name: "Zoya", height: 144, skin: "#c08a5e", hair: "#8f6ae0", hairStyle: "hijab", outfit: "coat", top: "#6b4fd1", bottom: "#2b2a27", shoes: "#141414", accent: "#ffd166", accessory: "book", expression: "smile" },
  { name: "Ravi", height: 138, skin: "#b07a52", hair: "#9a968c", hairStyle: "bald", outfit: "sweater", top: "#2f7d5b", bottom: "#3a3a35", shoes: "#141414", accent: "#ffd166", accessory: "stick", beard: true, expression: "calm" },
  { name: "Pihu", height: 108, skin: "#d9a97c", hair: "#2a1a10", hairStyle: "pigtails", outfit: "dress", top: "#ff9fb2", bottom: "#ff9fb2", shoes: "#ffd166", accent: "#ff7a59", accessory: "balloon", expression: "grin", child: true },
  { name: "Arjun", height: 149, skin: "#d9a97c", hair: "#241a14", hairStyle: "buzz", outfit: "coat", top: "#2a3f6b", bottom: "#22303f", shoes: "#141414", accent: "#d8ff3e", accessory: "briefcase", expression: "calm" },
  { name: "Tara", height: 145, skin: "#f2d3b3", hair: "#b5651d", hairStyle: "ponytail", outfit: "jacket", top: "#7fc8ff", bottom: "#2b2a27", shoes: "#f8f7f4", accent: "#ffd166", accessory: "guitar", expression: "grin" },
  { name: "Sam", height: 143, skin: "#e8c39e", hair: "#3b2a20", hairStyle: "beanie", outfit: "sweater", top: "#8a9a3b", bottom: "#3a3a35", shoes: "#141414", accent: "#ffd166", accessory: "coffee", glasses: true, expression: "smile" },
  { name: "Ira", height: 146, skin: "#c08a5e", hair: "#141414", hairStyle: "long", outfit: "dungarees", top: "#f8f7f4", bottom: "#5b7cfa", shoes: "#ff7a59", accent: "#ffd166", accessory: "phone", expression: "smile" },
  { name: "Bunty", height: 141, skin: "#8d5a3b", hair: "#141414", hairStyle: "bucket", outfit: "tee", top: "#ffd166", bottom: "#ff7a59", shoes: "#f8f7f4", accent: "#2fbfa0", accessory: "boombox", expression: "grin" },
  { name: "Anya", height: 144, skin: "#f2d3b3", hair: "#d9a441", hairStyle: "ponytail", outfit: "dress", top: "#6fe3b0", bottom: "#6fe3b0", shoes: "#f8f7f4", accent: "#ff7a59", accessory: "ball", expression: "smile" },
  { name: "Imran", height: 147, skin: "#9c6b43", hair: "#141414", hairStyle: "buzz", outfit: "hoodie", top: "#5b7cfa", bottom: "#2b2a27", shoes: "#d8ff3e", accent: "#d8ff3e", accessory: "none", expression: "calm" },
];

function Head({ character }: { character: Character }) {
  const { skin, hair, hairStyle, glasses, beard } = character;
  const expression = character.expression ?? "smile";
  const child = Boolean(character.child);
  const cx = 48;
  const cy = child ? 40 : 37;
  const rx = child ? 18.5 : 16.5;
  const ry = child ? 20.5 : 18.5;
  const eyeY = cy - 1.5;
  const isHijab = hairStyle === "hijab";

  return (
    <g>
      {/* Back hair, buns, ponytails and headscarves sit behind the head */}
      {hairStyle === "afro" && (
        <circle cx={cx} cy={cy - 5} r={ry + 7.5} fill={hair} stroke={INK} strokeWidth="2" />
      )}
      {hairStyle === "curls" && (
        <circle cx={cx} cy={cy - 4} r={ry + 3.5} fill={hair} stroke={INK} strokeWidth="2" />
      )}
      {hairStyle === "long" && (
        <path
          d={`M${cx - rx - 1} ${cy - 2} Q${cx - rx - 3} ${cy - ry - 6} ${cx} ${cy - ry - 6} Q${cx + rx + 3} ${cy - ry - 6} ${cx + rx + 1} ${cy - 2} L${cx + rx + 4} ${cy + 26} Q${cx} ${cy + 30} ${cx - rx - 4} ${cy + 26} Z`}
          fill={hair}
          stroke={INK}
          strokeWidth="2"
        />
      )}
      {hairStyle === "ponytail" && (
        <>
          <ellipse
            cx={cx + rx + 3}
            cy={cy + 8}
            rx="6.5"
            ry="12"
            fill={hair}
            stroke={INK}
            strokeWidth="2"
            transform={`rotate(12 ${cx + rx + 3} ${cy + 8})`}
          />
          <path
            d={`M${cx - rx - 1} ${cy - 2} Q${cx - rx - 3} ${cy - ry - 6} ${cx} ${cy - ry - 6} Q${cx + rx + 3} ${cy - ry - 6} ${cx + rx + 1} ${cy - 2} L${cx + rx + 3} ${cy + 10} L${cx + rx - 4} ${cy + 8} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
        </>
      )}
      {hairStyle === "pigtails" && (
        <>
          <circle cx={cx - rx - 4} cy={cy + 2} r="8" fill={hair} stroke={INK} strokeWidth="2" />
          <circle cx={cx + rx + 4} cy={cy + 2} r="8" fill={hair} stroke={INK} strokeWidth="2" />
        </>
      )}
      {hairStyle === "bun" && (
        <circle cx={cx} cy={cy - ry - 3} r="8.5" fill={hair} stroke={INK} strokeWidth="2" />
      )}
      {isHijab && (
        <path
          d={`M${cx - rx - 5} ${cy - 4} Q${cx - rx - 5} ${cy - ry - 9} ${cx} ${cy - ry - 9} Q${cx + rx + 5} ${cy - ry - 9} ${cx + rx + 5} ${cy - 4} L${cx + rx + 7} ${cy + 26} Q${cx} ${cy + 32} ${cx - rx - 7} ${cy + 26} Z`}
          fill={hair}
          stroke={INK}
          strokeWidth="2"
        />
      )}

      {/* Ears */}
      {!isHijab && (
        <>
          <circle cx={cx - rx - 0.5} cy={cy + 2} r="3.6" fill={skin} stroke={INK} strokeWidth="2" />
          <circle cx={cx + rx + 0.5} cy={cy + 2} r="3.6" fill={skin} stroke={INK} strokeWidth="2" />
        </>
      )}

      {/* Head */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={skin} stroke={INK} strokeWidth="2.2" />

      {/* Front hair and headwear */}
      {(hairStyle === "afro" || hairStyle === "long" || hairStyle === "ponytail" || hairStyle === "pigtails" || hairStyle === "bun" || hairStyle === "curls") && (
        <path
          d={`M${cx - 15} ${cy - 8} Q${cx - 15} ${cy - ry - 3} ${cx} ${cy - ry - 3} Q${cx + 15} ${cy - ry - 3} ${cx + 15} ${cy - 8} Q${cx + 9} ${cy - 12} ${cx} ${cy - 12} Q${cx - 9} ${cy - 12} ${cx - 15} ${cy - 8} Z`}
          fill={hair}
          stroke={INK}
          strokeWidth="2"
        />
      )}
      {hairStyle === "curls" && (
        <g fill={hair} stroke={INK} strokeWidth="2">
          <circle cx={cx - 12} cy={cy - 11} r="6" />
          <circle cx={cx - 4} cy={cy - 15} r="7" />
          <circle cx={cx + 5} cy={cy - 15} r="7" />
          <circle cx={cx + 13} cy={cy - 10} r="6" />
        </g>
      )}
      {hairStyle === "long" && (
        <>
          <path
            d={`M${cx - 15} ${cy - 8} Q${cx - 17} ${cy + 8} ${cx - 13} ${cy + 18} L${cx - 8} ${cy + 16} Q${cx - 11} ${cy + 2} ${cx - 10} ${cy - 8} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d={`M${cx + 15} ${cy - 8} Q${cx + 17} ${cy + 8} ${cx + 13} ${cy + 18} L${cx + 8} ${cy + 16} Q${cx + 11} ${cy + 2} ${cx + 10} ${cy - 8} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
        </>
      )}
      {hairStyle === "ponytail" && (
        <circle cx={cx + 14} cy={cy - 4} r="3" fill={character.accent} stroke={INK} strokeWidth="1.6" />
      )}
      {hairStyle === "pigtails" && (
        <>
          <circle cx={cx - 16} cy={cy - 2} r="3" fill={character.accent} stroke={INK} strokeWidth="1.6" />
          <circle cx={cx + 16} cy={cy - 2} r="3" fill={character.accent} stroke={INK} strokeWidth="1.6" />
        </>
      )}
      {hairStyle === "buzz" && (
        <path
          d={`M${cx - 15} ${cy - 8} Q${cx - 15} ${cy - ry} ${cx} ${cy - ry} Q${cx + 15} ${cy - ry} ${cx + 15} ${cy - 8} Q${cx + 9} ${cy - 11} ${cx} ${cy - 11} Q${cx - 9} ${cy - 11} ${cx - 15} ${cy - 8} Z`}
          fill={hair}
          stroke={INK}
          strokeWidth="2"
        />
      )}
      {hairStyle === "bald" && (
        <>
          <ellipse cx={cx - 14.5} cy={cy + 1} rx="3" ry="5.5" fill={hair} stroke={INK} strokeWidth="1.6" />
          <ellipse cx={cx + 14.5} cy={cy + 1} rx="3" ry="5.5" fill={hair} stroke={INK} strokeWidth="1.6" />
        </>
      )}
      {isHijab && (
        <>
          <path
            d={`M${cx - rx} ${cy - 6} Q${cx - rx} ${cy - ry - 2} ${cx} ${cy - ry - 2} Q${cx + rx} ${cy - ry - 2} ${cx + rx} ${cy - 6} Q${cx + rx - 4} ${cy - 12} ${cx} ${cy - 12} Q${cx - rx + 4} ${cy - 12} ${cx - rx} ${cy - 6} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d={`M${cx - rx} ${cy - 6} Q${cx - rx - 3} ${cy + 8} ${cx - rx + 3} ${cy + 15} L${cx - rx + 8} ${cy + 12} Q${cx - rx + 2} ${cy + 4} ${cx - rx + 4} ${cy - 6} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d={`M${cx + rx} ${cy - 6} Q${cx + rx + 3} ${cy + 8} ${cx + rx - 3} ${cy + 15} L${cx + rx - 8} ${cy + 12} Q${cx + rx - 2} ${cy + 4} ${cx + rx - 4} ${cy - 6} Z`}
            fill={hair}
            stroke={INK}
            strokeWidth="2"
          />
        </>
      )}
      {hairStyle === "cap" && (
        <g>
          <path
            d={`M${cx - 16} ${cy - 8} Q${cx - 16} ${cy - ry - 4} ${cx} ${cy - ry - 4} Q${cx + 16} ${cy - ry - 4} ${cx + 16} ${cy - 8} Z`}
            fill={character.accent}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d={`M${cx - 16} ${cy - 9} H${cx + 6} Q${cx + 20} ${cy - 9} ${cx + 20} ${cy - 5} Q${cx + 12} ${cy - 2} ${cx} ${cy - 3} H${cx - 16} Z`}
            fill={character.accent}
            stroke={INK}
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy - ry - 3} r="2.2" fill={INK} />
        </g>
      )}
      {hairStyle === "beanie" && (
        <g>
          <path
            d={`M${cx - 16} ${cy - 8} Q${cx - 16} ${cy - ry - 6} ${cx} ${cy - ry - 6} Q${cx + 16} ${cy - ry - 6} ${cx + 16} ${cy - 8} Z`}
            fill={character.accent}
            stroke={INK}
            strokeWidth="2"
          />
          <rect x={cx - 17} y={cy - 14} width="34" height="8" rx="3" fill={character.accent} stroke={INK} strokeWidth="2" />
          <circle cx={cx} cy={cy - ry - 8} r="4.5" fill={CREAM} stroke={INK} strokeWidth="2" />
          <path
            d={`M${cx - 8} ${cy - ry - 4} V${cy - 8} M${cx} ${cy - ry - 5} V${cy - 8} M${cx + 8} ${cy - ry - 4} V${cy - 8}`}
            stroke={INK}
            strokeWidth="1.2"
            opacity="0.5"
          />
        </g>
      )}
      {hairStyle === "bucket" && (
        <g>
          <path
            d={`M${cx - 12} ${cy - 11} L${cx - 9} ${cy - ry - 4} H${cx + 9} L${cx + 12} ${cy - 11} Z`}
            fill={character.accent}
            stroke={INK}
            strokeWidth="2"
          />
          <path
            d={`M${cx - 21} ${cy - 12} H${cx + 21} Q${cx + 25} ${cy - 12} ${cx + 23} ${cy - 7} Q${cx + 21} ${cy - 4} ${cx + 15} ${cy - 4} H${cx - 15} Q${cx - 21} ${cy - 4} ${cx - 23} ${cy - 7} Q${cx - 25} ${cy - 12} ${cx - 21} ${cy - 12} Z`}
            fill={character.accent}
            stroke={INK}
            strokeWidth="2"
          />
          <path d={`M${cx - 12} ${cy - 9} H${cx + 12}`} stroke={INK} strokeWidth="1.4" opacity="0.5" />
        </g>
      )}

      {/* Eyebrows */}
      <path d={`M${cx - 10.5} ${cy - 9} q4 -2.4 7.5 0`} stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d={`M${cx + 3} ${cy - 9} q4 -2.4 7.5 0`} stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Big cartoon eyes */}
      <ellipse cx={cx - 6.6} cy={eyeY} rx="4.3" ry="5" fill="#fff" stroke={INK} strokeWidth="1.6" />
      <ellipse cx={cx + 6.6} cy={eyeY} rx="4.3" ry="5" fill="#fff" stroke={INK} strokeWidth="1.6" />
      <circle cx={cx - 6.6} cy={eyeY + 0.4} r="2.1" fill={INK} />
      <circle cx={cx + 6.6} cy={eyeY + 0.4} r="2.1" fill={INK} />
      <circle cx={cx - 7.5} cy={eyeY - 0.8} r="0.9" fill="#fff" />
      <circle cx={cx + 5.7} cy={eyeY - 0.8} r="0.9" fill="#fff" />

      {glasses && (
        <g stroke={INK} strokeWidth="1.8" fill="none">
          <circle cx={cx - 6.6} cy={eyeY} r="6.3" />
          <circle cx={cx + 6.6} cy={eyeY} r="6.3" />
          <path d={`M${cx - 0.4} ${eyeY} h0.8`} />
          <path d={`M${cx - 13} ${eyeY - 1} L${cx - rx - 1} ${eyeY - 3}`} />
          <path d={`M${cx + 13} ${eyeY - 1} L${cx + rx + 1} ${eyeY - 3}`} />
        </g>
      )}

      {/* Nose and blush */}
      <path d={`M${cx} ${cy + 2.5} q1.8 2.2 0 3.4`} stroke={INK} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <circle cx={cx - 12} cy={cy + 5} r="3.2" fill={BLUSH} opacity="0.35" />
      <circle cx={cx + 12} cy={cy + 5} r="3.2" fill={BLUSH} opacity="0.35" />

      {/* Mouth */}
      {expression === "smile" && (
        <path d={`M${cx - 4.5} ${cy + 8.5} Q${cx} ${cy + 12.5} ${cx + 4.5} ${cy + 8.5}`} stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
      {expression === "grin" && (
        <g>
          <path d={`M${cx - 5.5} ${cy + 7.5} Q${cx} ${cy + 15} ${cx + 5.5} ${cy + 7.5} Z`} fill={MOUTH} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          <path d={`M${cx - 4.6} ${cy + 8.2} Q${cx} ${cy + 10.4} ${cx + 4.6} ${cy + 8.2}`} stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}
      {expression === "open" && (
        <g>
          <ellipse cx={cx} cy={cy + 9.5} rx="4.2" ry="4.6" fill={MOUTH} stroke={INK} strokeWidth="1.6" />
          <ellipse cx={cx} cy={cy + 11.8} rx="2.2" ry="1.4" fill="#ff7a8a" />
        </g>
      )}
      {expression === "calm" && (
        <path d={`M${cx - 3.6} ${cy + 9.5} h7.2`} stroke={INK} strokeWidth="2" strokeLinecap="round" />
      )}

      {beard && (
        <path
          d={`M${cx - rx + 1} ${cy + 2} Q${cx - rx + 3} ${cy + ry - 0.5} ${cx} ${cy + ry - 0.5} Q${cx + rx - 3} ${cy + ry - 0.5} ${cx + rx - 1} ${cy + 2}`}
          stroke={hair}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </g>
  );
}

function Torso({ character }: { character: Character }) {
  const { outfit, top, bottom, accent } = character;
  const child = Boolean(character.child);
  const sx = child ? 33 : 32;
  const sx2 = child ? 63 : 64;
  const topY = child ? 69 : 63;
  const shoulderY = child ? 78 : 72;
  const hipY = 112;
  const torso = `M${sx} ${shoulderY} Q${sx} ${topY} 48 ${topY} Q${sx2} ${topY} ${sx2} ${shoulderY} L${sx2 - 2} ${hipY} Q${sx2 - 2} 118 ${sx2 - 8} 118 H${sx + 8} Q${sx + 2} 118 ${sx + 2} ${hipY} Z`;
  const sareeHem = child ? 134 : 138;
  const kurtaHem = child ? 122 : 126;
  const coatHem = child ? 130 : 134;
  const longPath = (hem: number) =>
    `M${sx} ${shoulderY} Q${sx} ${topY} 48 ${topY} Q${sx2} ${topY} ${sx2} ${shoulderY} L${sx2 + 4} ${hem} Q${sx2 + 4} ${hem + 6} ${sx2 - 2} ${hem + 6} H${sx + 2} Q${sx - 4} ${hem + 6} ${sx - 4} ${hem} Z`;

  return (
    <g>
      {outfit === "hoodie" && (
        <path
          d={`M${sx + 7} ${topY + 2} Q${sx + 9} ${topY - 12} 48 ${topY - 12} Q${sx2 - 9} ${topY - 12} ${sx2 - 7} ${topY + 2} Q${sx2 - 12} ${topY - 2} 48 ${topY - 2} Q${sx + 12} ${topY - 2} ${sx + 7} ${topY + 2} Z`}
          fill={top}
          stroke={INK}
          strokeWidth="2"
        />
      )}

      {outfit === "saree" && (
        <g>
          <path d={longPath(sareeHem)} fill={top} stroke={INK} strokeWidth="2.2" />
          <path
            d={`M${sx + 4} ${topY + 3} Q${sx + 12} ${topY - 1} ${sx + 18} ${topY + 5} L${sx2} ${sareeHem} L${sx2 - 12} ${sareeHem} L${sx + 8} ${topY + 16} Z`}
            fill={accent}
            stroke={INK}
            strokeWidth="1.6"
          />
          <path d={`M${sx - 3} ${sareeHem + 2} H${sx2 + 3}`} stroke={accent} strokeWidth="3" />
          <path d={`M${sx + 4} 96 H${sx2 - 4}`} stroke={INK} strokeWidth="1.4" opacity="0.45" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 12} ${sx2 - 8} ${topY + 1}`} stroke={INK} strokeWidth="1.8" fill="none" />
        </g>
      )}

      {outfit === "kurta" && (
        <g>
          <path d={longPath(kurtaHem)} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M48 ${topY + 4} V${kurtaHem - 6}`} stroke={CREAM} strokeWidth="2.2" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 12} ${sx2 - 8} ${topY + 1}`} stroke={CREAM} strokeWidth="2" fill="none" />
          <path d={`M${sx - 2} ${kurtaHem + 2} H${sx2 + 2}`} stroke={accent} strokeWidth="3" />
          <path d={`M${sx + 2} ${kurtaHem - 12} V${kurtaHem + 4} M${sx2 - 2} ${kurtaHem - 12} V${kurtaHem + 4}`} stroke={INK} strokeWidth="1.4" opacity="0.5" />
        </g>
      )}

      {outfit === "coat" && (
        <g>
          <path d={longPath(coatHem)} fill={top} stroke={INK} strokeWidth="2.2" />
          <path
            d={`M41 ${topY + 1} L48 ${topY + 17} L55 ${topY + 1} L58 ${coatHem + 6} H38 Z`}
            fill={CREAM}
            stroke={INK}
            strokeWidth="1.6"
          />
          <path
            d={`M37 ${topY + 1} L48 ${topY + 17} L43 ${topY + 30} L33 ${topY + 8} Z`}
            fill={top}
            stroke={INK}
            strokeWidth="1.8"
          />
          <path
            d={`M59 ${topY + 1} L48 ${topY + 17} L53 ${topY + 30} L63 ${topY + 8} Z`}
            fill={top}
            stroke={INK}
            strokeWidth="1.8"
          />
          <circle cx="48" cy={topY + 40} r="1.9" fill={accent} stroke={INK} strokeWidth="1" />
          <circle cx="48" cy={topY + 56} r="1.9" fill={accent} stroke={INK} strokeWidth="1" />
          <path d={`M${sx + 2} ${topY + 46} H${sx2 - 2}`} stroke={INK} strokeWidth="2" />
        </g>
      )}

      {outfit === "dress" && (
        <g>
          <path
            d={`M${sx} ${shoulderY} Q${sx} ${topY} 48 ${topY} Q${sx2} ${topY} ${sx2} ${shoulderY} L${sx2 - 4} 94 L${sx2 + 6} 128 Q${sx2 + 6} 134 ${sx2} 134 H${sx - 2} Q${sx - 6} 134 ${sx - 6} 128 L${sx + 4} 94 Z`}
            fill={top}
            stroke={INK}
            strokeWidth="2.2"
          />
          <path d={`M${sx - 4} 128 H${sx2 + 4}`} stroke={accent} strokeWidth="3" />
          <path d={`M${sx + 4} 94 H${sx2 - 4}`} stroke={INK} strokeWidth="1.4" opacity="0.5" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 12} ${sx2 - 8} ${topY + 1}`} stroke={INK} strokeWidth="1.8" fill="none" />
        </g>
      )}

      {outfit === "dungarees" && (
        <g>
          <path d={torso} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M39 84 H57 V116 Q57 120 53 120 H43 Q39 120 39 116 Z`} fill={bottom} stroke={INK} strokeWidth="2" />
          <path d={`M39 84 L${sx + 2} ${topY + 2}`} stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <path d={`M57 84 L${sx2 - 2} ${topY + 2}`} stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <path d={`M39 84 L${sx + 2} ${topY + 2}`} stroke={bottom} strokeWidth="4.5" strokeLinecap="round" />
          <path d={`M57 84 L${sx2 - 2} ${topY + 2}`} stroke={bottom} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="39" cy="84" r="2" fill={accent} stroke={INK} strokeWidth="1" />
          <circle cx="57" cy="84" r="2" fill={accent} stroke={INK} strokeWidth="1" />
          <path d="M44 94 H52 V102 H44 Z" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.6" />
        </g>
      )}

      {outfit === "sweater" && (
        <g>
          <path d={torso} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 11} ${sx2 - 8} ${topY + 1}`} stroke={INK} strokeWidth="2" fill="none" />
          <path d={`M${sx + 2} 108 H${sx2 - 2} M${sx + 2} 113 H${sx2 - 2}`} stroke={INK} strokeWidth="1.2" opacity="0.35" />
          <path d={`M40 108 V118 M46 108 V118 M52 108 V118 M58 108 V118`} stroke={INK} strokeWidth="1" opacity="0.2" />
        </g>
      )}

      {outfit === "tee" && (
        <g>
          <path d={torso} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 11} ${sx2 - 8} ${topY + 1}`} stroke={INK} strokeWidth="1.8" fill="none" />
          <circle cx="48" cy="94" r="6.5" fill={accent} stroke={INK} strokeWidth="1.6" />
          <circle cx="48" cy="94" r="2.6" fill={top} />
          <path d={`M${sx + 2} 116 H${sx2 - 2}`} stroke={INK} strokeWidth="1.4" opacity="0.4" />
        </g>
      )}

      {outfit === "hoodie" && (
        <g>
          <path d={torso} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M${sx + 8} ${topY + 1} Q48 ${topY + 12} ${sx2 - 8} ${topY + 1}`} stroke={INK} strokeWidth="2" fill="none" />
          <path d="M44 67 V82 M52 67 V82" stroke={CREAM} strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="83" r="1.3" fill={CREAM} stroke={INK} strokeWidth="0.8" />
          <circle cx="52" cy="83" r="1.3" fill={CREAM} stroke={INK} strokeWidth="0.8" />
          <path d={`M37 96 H59 Q61 96 61 98 V110 H35 V98 Q35 96 37 96 Z`} stroke={INK} strokeWidth="1.6" fill="none" opacity="0.55" />
        </g>
      )}

      {outfit === "jacket" && (
        <g>
          <path d={torso} fill={top} stroke={INK} strokeWidth="2.2" />
          <path d={`M41 ${topY + 1} L48 ${topY + 16} L55 ${topY + 1} L58 116 H38 Z`} fill={CREAM} stroke={INK} strokeWidth="1.6" />
          <path d={`M37 ${topY + 1} L48 ${topY + 16} L43 ${topY + 30} L33 ${topY + 8} Z`} fill={top} stroke={INK} strokeWidth="1.8" />
          <path d={`M59 ${topY + 1} L48 ${topY + 16} L53 ${topY + 30} L63 ${topY + 8} Z`} fill={top} stroke={INK} strokeWidth="1.8" />
          <path d={`M48 ${topY + 16} V116`} stroke={INK} strokeWidth="1.6" />
          <path d="M38 100 H44 M52 100 H58" stroke={INK} strokeWidth="1.6" />
        </g>
      )}
    </g>
  );
}

function Legs({ character }: { character: Character }) {
  const { bottom, shoes } = character;
  const child = Boolean(character.child);
  const hipY = 112;
  const ankleY = child ? 145 : 147;

  return (
    <g>
      <path d={`M40 ${hipY} L38 ${ankleY}`} stroke={INK} strokeWidth="13" strokeLinecap="round" />
      <path d={`M56 ${hipY} L58 ${ankleY}`} stroke={INK} strokeWidth="13" strokeLinecap="round" />
      <path d={`M40 ${hipY} L38 ${ankleY}`} stroke={bottom} strokeWidth="9" strokeLinecap="round" />
      <path d={`M56 ${hipY} L58 ${ankleY}`} stroke={bottom} strokeWidth="9" strokeLinecap="round" />
      {child ? (
        <>
          <path d="M31 145 H43 V151 Q43 155 39 155 H30 Q27 155 27.5 152 Q28 149 31 148 Z" fill={shoes} stroke={INK} strokeWidth="2" />
          <path d="M53 145 H65 L68 148 Q70 149 69.5 152 Q69 155 65 155 H57 Q53 155 53 151 Z" fill={shoes} stroke={INK} strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M31 147 H44 V153 Q44 157 40 157 H30 Q27 157 27.5 154 Q28 151 31 150 Z" fill={shoes} stroke={INK} strokeWidth="2" />
          <path d="M52 147 H65 L68.5 150 Q71 151 70.5 154 Q70 157 66 157 H56 Q52 157 52 153 Z" fill={shoes} stroke={INK} strokeWidth="2" />
        </>
      )}
    </g>
  );
}

function Arms({ character }: { character: Character }) {
  const { top, skin, outfit } = character;
  const child = Boolean(character.child);
  const short = outfit === "tee" || outfit === "dress" || outfit === "saree";
  const shoulderY = child ? 80 : 74;
  const handY = child ? 108 : 110;
  const leftX = child ? 29 : 28;
  const rightX = child ? 67 : 68;
  const leftShoulder = child ? 35 : 34;
  const rightShoulder = child ? 61 : 62;
  const leftElbow = { x: 30.5, y: 94 };
  const rightElbow = { x: 65.5, y: 94 };
  const leftArm = `M${leftShoulder} ${shoulderY} Q30 94 ${leftX} ${handY}`;
  const rightArm = `M${rightShoulder} ${shoulderY} Q66 94 ${rightX} ${handY}`;

  return (
    <g fill="none" strokeLinecap="round">
      <path d={leftArm} stroke={INK} strokeWidth="12" />
      <path d={rightArm} stroke={INK} strokeWidth="12" />
      <path d={leftArm} stroke={top} strokeWidth="8.5" />
      <path d={rightArm} stroke={top} strokeWidth="8.5" />
      {short && (
        <>
          <path d={`M${leftElbow.x} ${leftElbow.y} L${leftX} ${handY}`} stroke={INK} strokeWidth="9" />
          <path d={`M${rightElbow.x} ${rightElbow.y} L${rightX} ${handY}`} stroke={INK} strokeWidth="9" />
          <path d={`M${leftElbow.x} ${leftElbow.y} L${leftX} ${handY}`} stroke={skin} strokeWidth="5.5" />
          <path d={`M${rightElbow.x} ${rightElbow.y} L${rightX} ${handY}`} stroke={skin} strokeWidth="5.5" />
        </>
      )}
    </g>
  );
}

function Hands({ character }: { character: Character }) {
  const child = Boolean(character.child);
  const handY = child ? 108 : 110;
  const leftX = child ? 29 : 28;
  const rightX = child ? 67 : 68;

  return (
    <g fill={character.skin} stroke={INK} strokeWidth="1.8">
      <circle cx={leftX} cy={handY} r="4.6" />
      <circle cx={rightX} cy={handY} r="4.6" />
    </g>
  );
}

function BackAccessory({ character }: { character: Character }) {
  const { accessory, accent } = character;
  const child = Boolean(character.child);
  const handY = child ? 108 : 110;
  const rightX = child ? 67 : 68;

  switch (accessory) {
    case "skateboard":
      return (
        <g transform="rotate(-12 74 122)">
          <rect x="68" y="88" width="12" height="66" rx="6" fill={accent} stroke={INK} strokeWidth="2" />
          <path d="M68 110 H80 M68 132 H80" stroke={INK} strokeWidth="1.4" opacity="0.4" />
          <circle cx="66" cy="100" r="3.4" fill={INK} />
          <circle cx="82" cy="100" r="3.4" fill={INK} />
          <circle cx="66" cy="144" r="3.4" fill={INK} />
          <circle cx="82" cy="144" r="3.4" fill={INK} />
        </g>
      );
    case "balloon":
      return (
        <g>
          <path d={`M${rightX} ${handY} Q74 70 80 34`} stroke={INK} strokeWidth="1.3" fill="none" />
          <ellipse cx="80" cy="20" rx="10.5" ry="12.5" fill={accent} stroke={INK} strokeWidth="2" />
          <path d="M77 32 L80 36 L83 32 Z" fill={accent} stroke={INK} strokeWidth="1.4" />
          <ellipse cx="76.5" cy="16" rx="2.6" ry="4" fill="#fff" opacity="0.55" />
        </g>
      );
    default:
      return null;
  }
}

function FrontAccessory({ character }: { character: Character }) {
  const { accessory, accent } = character;
  const child = Boolean(character.child);
  const handY = child ? 108 : 110;
  const rightX = child ? 67 : 68;

  switch (accessory) {
    case "tote":
      return (
        <g>
          <path
            d={`M${rightX - 4} ${handY + 6} Q${rightX - 4} ${handY - 6} ${rightX} ${handY - 6} Q${rightX + 4} ${handY - 6} ${rightX + 4} ${handY + 6}`}
            stroke={INK}
            strokeWidth="2.4"
            fill="none"
          />
          <rect x={rightX - 9} y={handY + 5} width="20" height="22" rx="3" fill={accent} stroke={INK} strokeWidth="2" />
          <path d={`M${rightX - 9} ${handY + 11} H${rightX + 11}`} stroke={INK} strokeWidth="1.4" opacity="0.45" />
        </g>
      );
    case "briefcase":
      return (
        <g>
          <rect x={rightX - 12} y={handY + 4} width="24" height="15" rx="3" fill={accent} stroke={INK} strokeWidth="2" />
          <path
            d={`M${rightX - 5} ${handY + 4} V${handY - 2} Q${rightX - 5} ${handY - 6} ${rightX} ${handY - 6} Q${rightX + 5} ${handY - 6} ${rightX + 5} ${handY - 2} V${handY + 4}`}
            stroke={INK}
            strokeWidth="2.2"
            fill="none"
          />
          <rect x={rightX - 2} y={handY + 9} width="4" height="4" rx="1" fill={INK} />
        </g>
      );
    case "book":
      return (
        <g>
          <rect x={rightX - 7} y={handY - 6} width="14" height="18" rx="2" fill={accent} stroke={INK} strokeWidth="2" />
          <path d={`M${rightX - 4} ${handY - 6} V${handY + 12}`} stroke={INK} strokeWidth="1.4" />
          <path
            d={`M${rightX - 1} ${handY - 1} H${rightX + 4} M${rightX - 1} ${handY + 3} H${rightX + 4}`}
            stroke={INK}
            strokeWidth="1.2"
            opacity="0.6"
          />
        </g>
      );
    case "coffee":
      return (
        <g>
          <path
            d={`M${rightX - 6} ${handY} H${rightX + 6} L${rightX + 4.5} ${handY + 13} Q${rightX + 4} ${handY + 15} ${rightX + 2} ${handY + 15} H${rightX - 2} Q${rightX - 4} ${handY + 15} ${rightX - 4.5} ${handY + 13} Z`}
            fill={CREAM}
            stroke={INK}
            strokeWidth="2"
          />
          <rect x={rightX - 7} y={handY - 4} width="14" height="4" rx="2" fill={accent} stroke={INK} strokeWidth="1.6" />
        </g>
      );
    case "phone":
      return (
        <g>
          <rect x={rightX - 4} y={handY - 7} width="9" height="16" rx="2" fill={INK} />
          <rect x={rightX - 2.5} y={handY - 5} width="6" height="11" rx="1" fill={accent} />
        </g>
      );
    case "boombox":
      return (
        <g>
          <rect x={rightX + 1} y={handY - 8} width="24" height="18" rx="3" fill={accent} stroke={INK} strokeWidth="2" />
          <circle cx={rightX + 8} cy={handY + 1} r="5" fill={INK} />
          <circle cx={rightX + 18} cy={handY + 1} r="5" fill={INK} />
          <circle cx={rightX + 8} cy={handY + 1} r="2" fill={accent} />
          <circle cx={rightX + 18} cy={handY + 1} r="2" fill={accent} />
          <path
            d={`M${rightX + 5} ${handY - 8} Q${rightX + 13} ${handY - 18} ${rightX + 21} ${handY - 8}`}
            stroke={INK}
            strokeWidth="2.4"
            fill="none"
          />
        </g>
      );
    case "camera":
      return (
        <g>
          <path d="M38 66 Q48 86 58 66" stroke={INK} strokeWidth="2" fill="none" />
          <rect x="41" y="82" width="16" height="11" rx="2.5" fill={INK} stroke={INK} strokeWidth="1.5" />
          <circle cx="49" cy="87.5" r="3.4" fill={accent} stroke={CREAM} strokeWidth="1" />
          <rect x="43" y="80" width="5" height="3" rx="1" fill={INK} />
        </g>
      );
    case "guitar":
      return (
        <g>
          <ellipse cx="64" cy="104" rx="12" ry="15" fill={accent} stroke={INK} strokeWidth="2.2" transform="rotate(-15 64 104)" />
          <circle cx="64" cy="104" r="4" fill={INK} />
          <path d="M70 94 L80 54" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M70 94 L80 54" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          <rect x="76" y="46" width="9" height="10" rx="2" fill={INK} transform="rotate(-18 80 51)" />
        </g>
      );
    case "stick":
      return (
        <g>
          <path d={`M${rightX} ${handY} L${rightX + 10} 156`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
          <path
            d={`M${rightX - 2} ${handY} Q${rightX} ${handY - 5} ${rightX + 2} ${handY}`}
            stroke={INK}
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case "ball":
      return (
        <g>
          <circle cx={rightX + 8} cy={handY + 26} r="9" fill={accent} stroke={INK} strokeWidth="2" />
          <path
            d={`M${rightX - 1} ${handY + 26} Q${rightX + 8} ${handY + 18} ${rightX + 17} ${handY + 26}`}
            stroke={INK}
            strokeWidth="1.4"
            fill="none"
          />
          <path d={`M${rightX + 8} ${handY + 17} V${handY + 35}`} stroke={INK} strokeWidth="1.4" />
        </g>
      );
    default:
      return null;
  }
}

function Headphones({ character }: { character: Character }) {
  const child = Boolean(character.child);
  const cx = 48;
  const cy = child ? 40 : 37;
  const rx = child ? 18.5 : 16.5;
  const ry = child ? 20.5 : 18.5;

  return (
    <g>
      <path
        d={`M${cx - rx - 1} ${cy + 2} Q${cx - rx - 1} ${cy - ry - 6} ${cx} ${cy - ry - 6} Q${cx + rx + 1} ${cy - ry - 6} ${cx + rx + 1} ${cy + 2}`}
        stroke={character.accent}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect x={cx - rx - 4} y={cy - 2} width="6" height="13" rx="2.5" fill={INK} stroke={character.accent} strokeWidth="1.6" />
      <rect x={cx + rx - 2} y={cy - 2} width="6" height="13" rx="2.5" fill={INK} stroke={character.accent} strokeWidth="1.6" />
    </g>
  );
}

function CharacterFigure({ character }: { character: Character }) {
  return (
    <svg viewBox="0 0 96 160" fill="none" aria-hidden="true" focusable="false" className="crowd-figure">
      <ellipse cx="48" cy={character.child ? 156 : 157} rx="23" ry="3" fill={INK} opacity="0.13" />
      <BackAccessory character={character} />
      <Legs character={character} />
      <Torso character={character} />
      <Arms character={character} />
      <FrontAccessory character={character} />
      <Hands character={character} />
      <Head character={character} />
      {character.accessory === "headphones" && <Headphones character={character} />}
    </svg>
  );
}

function CrowdSet({ characters }: { characters: Character[] }) {
  return (
    <div className="crowd-set">
      {characters.map((character, index) => (
        <span
          key={`${character.name}-${index}`}
          className="crowd-figure-wrap"
          style={{
            height: `calc(${character.height}px * var(--crowd-scale, 1))`,
            transform:
              (character.flip ?? index % 2 === 1) ? "scaleX(-1)" : undefined,
          }}
        >
          <span
            className="crowd-figure-bob"
            style={{ animationDelay: `${(index * -0.45).toFixed(2)}s` }}
          >
            <CharacterFigure character={character} />
          </span>
        </span>
      ))}
    </div>
  );
}

function CrowdLayer({
  characters,
  className,
}: {
  characters: Character[];
  className: string;
}) {
  return (
    <div className={`footer-crowd-layer ${className}`} aria-hidden="true">
      <div className="crowd-track">
        <CrowdSet characters={characters} />
        <CrowdSet characters={characters} />
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
      <path d="M36 106c0-14 15-22 34-22s34 8 34 22l-4 88H40z" fill="#141414" />

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
      <path d="M48 53c-1-19 9-31 22-31s23 12 22 31c-3-6-9-11-22-11s-19 5-22 11z" fill="#141414" />

      {/* Eyebrows */}
      <path d="M54 46q5-2.5 9 0M77 46q5-2.5 9 0" stroke="#141414" strokeWidth="2" strokeLinecap="round" />

      {/* Big cartoon eyes */}
      <ellipse cx="58.5" cy="53.5" rx="4.6" ry="5.2" fill="#fff" stroke="#141414" strokeWidth="1.8" />
      <ellipse cx="81.5" cy="53.5" rx="4.6" ry="5.2" fill="#fff" stroke="#141414" strokeWidth="1.8" />
      <circle cx="58.5" cy="54" r="2.2" fill="#141414" />
      <circle cx="81.5" cy="54" r="2.2" fill="#141414" />
      <circle cx="57.6" cy="52.8" r="0.9" fill="#fff" />
      <circle cx="80.6" cy="52.8" r="0.9" fill="#fff" />

      {/* Blush */}
      <circle cx="50" cy="64" r="3.6" fill="#ff8f7a" opacity="0.3" />
      <circle cx="90" cy="64" r="3.6" fill="#ff8f7a" opacity="0.3" />

      {/* Nose */}
      <path d="M70 55v7l2.5 1.5" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* Confident subtle smile */}
      <path d="M63 69q7 4 14 0" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" />

      {/* Glasses — the signature flash of lime */}
      <rect x="49" y="48" width="18" height="11.5" rx="4" stroke="#141414" strokeWidth="4" />
      <rect x="73" y="48" width="18" height="11.5" rx="4" stroke="#141414" strokeWidth="4" />
      <rect x="49" y="48" width="18" height="11.5" rx="4" stroke="#d8ff3e" strokeWidth="2.2" />
      <rect x="73" y="48" width="18" height="11.5" rx="4" stroke="#d8ff3e" strokeWidth="2.2" />
      <path d="M67 53.5h6" stroke="#141414" strokeWidth="4" />
      <path d="M67 53.5h6" stroke="#d8ff3e" strokeWidth="2.2" />

      {/* Hands in pockets */}
      <path d="M42 178c5 4 12 4 17 0" stroke="#ecebe5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M81 178c5 4 12 4 17 0" stroke="#ecebe5" strokeWidth="1.6" strokeLinecap="round" />
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

      <CrowdLayer characters={BACK_CROWD} className="footer-crowd-back" />

      <SelfPortrait />

      <CrowdLayer characters={FRONT_CROWD} className="footer-crowd-front" />

      <p className="sr-only">
        A cartoon crowd of neighbours walks in both directions across foreground
        and background parallax layers: a DJ in headphones, a skater with a
        board, a reader in a hijab, a guitarist, a kid with a balloon, an elder
        with a cane, and more. Abhi stands still among them, hands in pockets,
        wearing lime glasses and sneakers.
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




