/**
 * Slide 8 — the places within the city.
 * Conceptual drawings of place types. None of these depicts a named property.
 */
import {
  P, rect, openRect, line, arch, archWindow, windowGrid, balcony, canopy, awning,
  door, steps, ramp, tree, palm, person, table, chair, desk, potPlant, pitchedRoof,
} from './prims';

export type Vignette = {
  label: string;
  strokes: string[];
  fills: { d: string; tone: 1 | 2 | 3 }[];
  /** Index of the stroke group that ambient motion may touch. */
  accent?: string[];
};

export const SLOTS = [285, 622, 960, 1298, 1635];
export const BASE = 806;

const S = (...groups: (string | string[])[]) =>
  groups.flat().filter(Boolean) as string[];

/* ---------------- group one ---------------- */

const homes = (cx: number, b: number): Vignette => {
  const w = 214;
  const x = cx - w / 2;
  const top = b - 392;
  const strokes = S(
    openRect(x, top, w, b - top),
    line(x - 14, top, x + w + 14, top),
    line(x - 14, top - 12, x + w + 14, top - 12),
    line(x - 14, top - 12, x - 14, top),
    line(x + w + 14, top - 12, x + w + 14, top),
    [0, 1, 2, 3].map((f) => line(x, top + 30 + f * 88, x + w, top + 30 + f * 88)),
    [0, 1, 2, 3].map((f) => balcony(x + 16, top + 30 + f * 88 + 62, w - 32, 14, 8)).flat(),
    [0, 1, 2, 3]
      .map((f) => [
        rect(x + 22, top + 42 + f * 88, 52, 50),
        rect(x + w - 74, top + 42 + f * 88, 52, 50),
        line(x + 48, top + 42 + f * 88, x + 48, top + 92 + f * 88),
        line(x + w - 48, top + 42 + f * 88, x + w - 48, top + 92 + f * 88),
      ])
      .flat(),
    door(cx - 27, b - 74, 54, 74),
    potPlant(x + w + 32, b, 62),
  );
  return {
    label: 'Homes',
    strokes,
    fills: [
      { d: rect(x + 22, top + 130, 52, 50), tone: 2 },
      { d: rect(x + w - 74, top + 306, 52, 50), tone: 1 },
    ],
  };
};

const hotels = (cx: number, b: number): Vignette => {
  const w = 246;
  const x = cx - w / 2;
  const top = b - 318;
  const wingTop = b - 412;
  const strokes = S(
    openRect(x + w - 74, wingTop, 74, b - wingTop),
    openRect(x, top, w - 74, b - top),
    line(x - 16, top, x + w - 58, top),
    line(x + w - 90, wingTop, x + w + 16, wingTop),
    windowGrid(x + 18, top + 26, w - 118, 172, 3, 3, 0.34, 0.36),
    windowGrid(x + w - 64, wingTop + 24, 52, 268, 2, 7, 0.34, 0.4),
    canopy(x + (w - 74) / 2 - 74, b - 124, 148, 52),
    steps(x + (w - 74) / 2 - 58, b, 116, 3, 9, 15),
    door(x + (w - 74) / 2 - 38, b - 92, 76, 92, true),
    line(x + w - 40, wingTop, x + w - 40, wingTop - 46),
    P([x + w - 40, wingTop - 46], [x + w - 6, wingTop - 38], [x + w - 40, wingTop - 30]),
    person(cx - 162, b, 96, 'stand', 1).paths,
  );
  const head = person(cx - 162, b, 96, 'stand', 1).head;
  return {
    label: 'Hotels',
    strokes: [...strokes, circle(head.cx, head.cy, head.r)],
    fills: [
      { d: rect(x + w - 74, wingTop, 74, b - wingTop), tone: 1 },
      { d: rect(x + (w - 74) / 2 - 38, b - 92, 76, 92), tone: 2 },
    ],
  };
};

const hospitals = (cx: number, b: number): Vignette => {
  const w = 300;
  const x = cx - w / 2;
  const top = b - 286;
  const strokes = S(
    openRect(x, top, w, b - top),
    line(x - 18, top, x + w + 18, top),
    line(x - 18, top - 13, x + w + 18, top - 13),
    line(x - 18, top - 13, x - 18, top),
    line(x + w + 18, top - 13, x + w + 18, top),
    line(x, top + 76, x + w, top + 76),
    line(x, top + 152, x + w, top + 152),
    windowGrid(x + 14, top + 18, w - 28, 48, 7, 1, 0.3, 0.2),
    windowGrid(x + 14, top + 94, w - 28, 48, 7, 1, 0.3, 0.2),
    windowGrid(x + 14, top + 170, w - 28, 48, 7, 1, 0.3, 0.2),
    canopy(cx - 142, b - 126, 284, 58),
    door(cx - 100, b - 96, 96, 96, true),
    ramp(cx + 34, b, 112, 30),
    person(cx - 178, b, 96, 'walk', 1).paths,
  );
  const head = person(cx - 178, b, 96, 'walk', 1).head;
  return {
    label: 'Hospitals',
    strokes: [...strokes, circle(head.cx, head.cy, head.r)],
    fills: [
      { d: rect(x + 14, top + 18, w - 28, 48), tone: 1 },
      { d: rect(cx - 100, b - 96, 96, 96), tone: 2 },
    ],
  };
};

const restaurants = (cx: number, b: number): Vignette => {
  const w = 236;
  const x = cx - w / 2;
  const top = b - 304;
  const strokes = S(
    openRect(x, top, w, b - top),
    line(x - 14, top, x + w + 14, top),
    windowGrid(x + 16, top + 22, w - 32, 128, 3, 2, 0.26, 0.3),
    awning(x + 10, b - 150, w - 20, 34, 5),
    rect(x + 24, b - 116, 80, 116),
    line(x + 64, b - 116, x + 64, b),
    door(x + w - 92, b - 116, 68, 116),
    table(cx + 6, b - 64, 76, 64),
    chair(cx - 26, b - 36, 26, 48, 1),
    chair(cx + 100, b - 36, 26, 48, -1),
    person(cx - 14, b - 8, 96, 'sit', 1).paths,
    person(cx + 110, b - 8, 96, 'sit', -1).paths,
    potPlant(x - 34, b, 64),
  );
  const h1 = person(cx - 14, b - 8, 96, 'sit', 1).head;
  const h2 = person(cx + 110, b - 8, 96, 'sit', -1).head;
  return {
    label: 'Restaurants',
    strokes: [...strokes, circle(h1.cx, h1.cy, h1.r), circle(h2.cx, h2.cy, h2.r)],
    fills: [
      { d: rect(x + 24, b - 116, 80, 116), tone: 2 },
      { d: rect(x + 16, top + 22, w - 32, 128), tone: 1 },
    ],
  };
};

const schools = (cx: number, b: number): Vignette => {
  const wingW = 104;
  const courtW = 114;
  const left = cx - (wingW * 2 + courtW) / 2;
  const top = b - 286;
  const rightX = left + wingW + courtW;
  const strokes = S(
    openRect(left, top, wingW, b - top),
    openRect(rightX, top, wingW, b - top),
    pitchedRoof(left, top, wingW, 52, 14),
    pitchedRoof(rightX, top, wingW, 52, 14),
    windowGrid(left + 14, top + 26, wingW - 28, 190, 2, 4, 0.3, 0.34),
    windowGrid(rightX + 14, top + 26, wingW - 28, 190, 2, 4, 0.3, 0.34),
    line(left + wingW, b - 88, rightX, b - 88),
    line(left + wingW, b - 88, left + wingW, b - 74),
    line(rightX, b - 88, rightX, b - 74),
    line(cx - courtW / 2 - 4, b - 6, cx + courtW / 2 + 4, b - 6),
    line(cx, b - 88, cx, b - 168),
    P([cx, b - 168], [cx + 34, b - 158], [cx, b - 148]),
    tree(rightX + wingW + 54, b, 150).trunk,
    tree(rightX + wingW + 54, b, 150).canopy,
    person(cx - 28, b, 92, 'walk', 1).paths,
    person(cx + 26, b, 90, 'stand', -1).paths,
  );
  const h1 = person(cx - 28, b, 92, 'walk', 1).head;
  const h2 = person(cx + 26, b, 90, 'stand', -1).head;
  return {
    label: 'Schools',
    strokes: [...strokes, circle(h1.cx, h1.cy, h1.r), circle(h2.cx, h2.cy, h2.r)],
    fills: [
      { d: tree(rightX + wingW + 54, b, 150).fill, tone: 2 },
      { d: rect(left + 14, top + 26, wingW - 28, 44), tone: 1 },
    ],
  };
};

/* ---------------- group two ---------------- */

const retail = (cx: number, b: number): Vignette => {
  const w = 310;
  const x = cx - w / 2;
  const top = b - 286;
  const bays = 4;
  const bw = w / bays;
  const strokes = S(
    line(x - 20, top, x + w + 20, top),
    line(x - 20, top - 14, x + w + 20, top - 14),
    line(x - 20, top - 14, x - 20, top),
    line(x + w + 20, top - 14, x + w + 20, top),
    Array.from({ length: bays + 1 }, (_, i) => line(x + i * bw, top, x + i * bw, b)),
    Array.from({ length: bays }, (_, i) => line(x + i * bw + 6, top + 74, x + (i + 1) * bw - 6, top + 74)),
    Array.from({ length: bays }, (_, i) => windowGrid(x + i * bw + 14, top + 22, bw - 28, 46, 2, 1, 0.3, 0.2)).flat(),
    Array.from({ length: bays }, (_, i) => arch(x + i * bw + 10, top + 150, bw - 20, 36)),
    Array.from({ length: bays }, (_, i) => awning(x + i * bw + 12, top + 166, bw - 24, 26, 3)).flat(),
    Array.from({ length: bays }, (_, i) => rect(x + i * bw + 18, b - 104, bw - 36, 104)),
    steps(x + 40, b, w - 80, 2, 8, 16),
    person(x - 58, b, 94, 'walk', 1).paths,
    person(cx + 26, b - 8, 92, 'stand', -1).paths,
    potPlant(x + w + 46, b, 64),
  );
  const h1 = person(x - 58, b, 94, 'walk', 1).head;
  const h2 = person(cx + 26, b - 8, 92, 'stand', -1).head;
  return {
    label: 'Retail destinations',
    strokes: [...strokes, circle(h1.cx, h1.cy, h1.r), circle(h2.cx, h2.cy, h2.r)],
    fills: [
      { d: rect(x + 18, b - 104, bw - 36, 104), tone: 2 },
      { d: rect(x + 2 * bw + 18, b - 104, bw - 36, 104), tone: 1 },
    ],
  };
};

const workplaces = (cx: number, b: number): Vignette => {
  const w = 238;
  const x = cx - w / 2;
  const top = b - 408;
  const floors = 5;
  const fh = (b - top - 20) / floors;
  const strokes = S(
    openRect(x, top, w, b - top),
    line(x - 16, top, x + w + 16, top),
    line(x - 16, top - 12, x + w + 16, top - 12),
    line(x - 16, top - 12, x - 16, top),
    line(x + w + 16, top - 12, x + w + 16, top),
    Array.from({ length: floors }, (_, i) => line(x, top + 20 + i * fh, x + w, top + 20 + i * fh)),
    Array.from({ length: floors - 1 }, (_, i) => desk(x + 26, top + 20 + (i + 1) * fh - 28, 76, 28)).flat(),
    Array.from({ length: floors - 1 }, (_, i) => desk(x + w - 102, top + 20 + (i + 1) * fh - 28, 76, 28)).flat(),
    Array.from({ length: floors - 1 }, (_, i) =>
      person(x + 62, top + 20 + (i + 1) * fh, 60, 'sit', 1).paths
    ).flat(),
    Array.from({ length: floors - 1 }, (_, i) =>
      person(x + w - 66, top + 20 + (i + 1) * fh, 58, 'sit', -1).paths
    ).flat(),
    door(cx - 34, b - 68, 68, 68, true),
  );
  const heads = [
    ...Array.from({ length: floors - 1 }, (_, i) => person(x + 62, top + 20 + (i + 1) * fh, 60, 'sit', 1).head),
    ...Array.from({ length: floors - 1 }, (_, i) => person(x + w - 66, top + 20 + (i + 1) * fh, 58, 'sit', -1).head),
  ];
  return {
    label: 'Workplaces',
    strokes: [...strokes, ...heads.map((h) => circle(h.cx, h.cy, h.r))],
    fills: [
      { d: rect(x, top + 20, w, fh), tone: 1 },
      { d: rect(x, top + 20 + 2 * fh, w, fh), tone: 1 },
    ],
  };
};

const healthcare = (cx: number, b: number): Vignette => {
  const w = 226;
  const x = cx - w / 2;
  const top = b - 248;
  const strokes = S(
    openRect(x, top, w, b - top),
    pitchedRoof(x, top, w, 68, 20),
    line(x - 12, top, x + w + 12, top),
    archWindow(x + 24, top + 40, 58, 106),
    archWindow(x + w - 82, top + 40, 58, 106),
    canopy(cx - 48, b - 92, 96, 36),
    door(cx - 30, b - 78, 60, 78),
    line(x + 24 + 29, top + 69, x + 24 + 29, top + 146),
    line(x + w - 82 + 29, top + 69, x + w - 82 + 29, top + 146),
    potPlant(x - 28, b, 62),
    potPlant(x + w + 28, b, 62),
    person(cx + 96, b, 94, 'stand', -1).paths,
  );
  const h = person(cx + 96, b, 94, 'stand', -1).head;
  return {
    label: 'Healthcare environments',
    strokes: [...strokes, circle(h.cx, h.cy, h.r)],
    fills: [
      { d: archWindow(x + 24, top + 40, 58, 106) + ' Z', tone: 2 },
      { d: archWindow(x + w - 82, top + 40, 58, 106) + ' Z', tone: 1 },
    ],
  };
};

const community = (cx: number, b: number): Vignette => {
  const w = 244;
  const x = cx - w / 2;
  const top = b - 232;
  const strokes = S(
    P([x - 26, top + 8], [cx, top - 62], [x + w + 26, top + 8]),
    line(x - 26, top + 8, x + w + 26, top + 8),
    line(x + 10, top + 8, x + 10, b),
    line(x + w - 10, top + 8, x + w - 10, b),
    line(cx - 60, top + 8, cx - 60, b),
    line(cx + 60, top + 8, cx + 60, b),
    line(x - 4, b, x + w + 4, b),
    line(cx - 96, b - 44, cx - 26, b - 44),
    line(cx - 96, b - 44, cx - 96, b),
    line(cx - 26, b - 44, cx - 26, b),
    line(cx + 26, b - 44, cx + 96, b - 44),
    line(cx + 26, b - 44, cx + 26, b),
    line(cx + 96, b - 44, cx + 96, b),
    person(cx - 70, b - 44, 92, 'sit', 1).paths,
    person(cx + 54, b - 44, 90, 'sit', -1).paths,
    tree(x - 84, b, 196).trunk,
    tree(x - 84, b, 196).canopy,
    tree(x + w + 84, b, 168).trunk,
    tree(x + w + 84, b, 168).canopy,
  );
  const h1 = person(cx - 70, b - 44, 92, 'sit', 1).head;
  const h2 = person(cx + 54, b - 44, 90, 'sit', -1).head;
  return {
    label: 'Community spaces',
    strokes: [...strokes, circle(h1.cx, h1.cy, h1.r), circle(h2.cx, h2.cy, h2.r)],
    fills: [
      { d: tree(x - 84, b, 196).fill, tone: 2 },
      { d: tree(x + w + 84, b, 168).fill, tone: 1 },
      { d: P([x - 26, top + 8], [cx, top - 62], [x + w + 26, top + 8]) + ' Z', tone: 1 },
    ],
  };
};

const hospitality = (cx: number, b: number): Vignette => {
  const w = 284;
  const x = cx - w / 2;
  const cottage = (px: number, ph: number, pw: number) =>
    S(
      openRect(px, b - ph, pw, ph),
      pitchedRoof(px, b - ph, pw, 34, 14),
      rect(px + 14, b - ph + 30, 32, 38),
      rect(px + pw - 46, b - ph + 30, 32, 38),
      rect(px + 14, b - ph + 86, 32, 38),
      rect(px + pw - 46, b - ph + 86, 32, 38),
      door(px + pw / 2 - 18, b - 58, 36, 58)
    );
  const poolY = b + 6;
  const strokes = S(
    cottage(x, 180, 104),
    cottage(x + 128, 216, 116),
    palm(x + w + 6, b, 196),
    palm(x - 40, b, 158),
    `M${cx - 96},${poolY} q96,26 192,0 q-96,-16 -192,0 Z`,
    line(cx - 60, poolY + 10, cx - 10, poolY + 10),
    line(cx + 14, poolY + 16, cx + 64, poolY + 16),
    chair(cx - 134, b, 28, 40, 1),
    chair(cx + 114, b, 28, 40, -1),
    person(cx - 168, b, 92, 'stand', 1).paths,
    circle(person(cx - 168, b, 92, 'stand', 1).head.cx, person(cx - 168, b, 92, 'stand', 1).head.cy, person(cx - 168, b, 92, 'stand', 1).head.r),
  );
  return {
    label: 'Hospitality destinations',
    strokes,
    fills: [{ d: `M${cx - 96},${poolY} q96,26 192,0 q-96,-16 -192,0 Z`, tone: 2 }],
  };
};

export const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r},${cy} a${r},${r} 0 1 0 ${r * 2},0 a${r},${r} 0 1 0 ${-r * 2},0`;

export const GROUP_A = (b = BASE): Vignette[] => [
  homes(SLOTS[0] - 20, b),
  hotels(SLOTS[1] + 24, b),
  hospitals(SLOTS[2] + 30, b),
  restaurants(SLOTS[3] + 24, b),
  schools(SLOTS[4] - 34, b),
];

export const GROUP_B = (b = BASE): Vignette[] => [
  retail(SLOTS[0] + 10, b),
  workplaces(SLOTS[1], b),
  healthcare(SLOTS[2], b),
  community(SLOTS[3], b),
  hospitality(SLOTS[4], b),
];
