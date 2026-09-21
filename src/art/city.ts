/**
 * Slide 7 — Kolkata as space.
 * An evocative panorama, not a map. Landmarks establish the city only; nothing
 * here is attributed to any developer.
 */
import { P, rect, openRect, line, arch, archWindow, shutter, balcony, windowGrid, tree, ripples, boat, person, canopy, door, potPlant } from './prims';

export const BANK = 806;
export const WATER = 858;

/** The foreground block the slide 7 exit pushes toward. */
export const ANCHOR = { x: 1306, y: 556, w: 214, h: BANK - 556 };

const S = (arr: string[]) => arr.filter(Boolean);

/* ---------------- layer 1 · ground, embankment, river ---------------- */

export const ground = () => {
  const ghatX = 612;
  const ghatW = 250;
  const out = [
    line(-20, BANK, 1940, BANK),
    line(-20, WATER, 1940, WATER),
  ];
  // ghat steps descending into the water
  for (let i = 0; i < 6; i++) {
    const y = BANK + i * 11;
    out.push(line(ghatX - i * 9, y, ghatX + ghatW + i * 9, y));
  }
  out.push(line(ghatX - 45, BANK, ghatX - 45, WATER + 6));
  out.push(line(ghatX + ghatW + 45, BANK, ghatX + ghatW + 45, WATER + 6));
  return S(out);
};

export const river = () => S(ripples(-40, WATER + 34, 1960, 12));

export const riverFill = `M-40,${WATER} L1960,${WATER} L1960,1090 L-40,1090 Z`;

/* ---------------- layer 2 · architecture ---------------- */

/** A restrained Howrah Bridge silhouette: twin portals, dipped top chord. */
export const bridge = () => {
  const deck = 706;
  const t1 = 156;
  const t2 = 474;
  const top1 = 448;
  const mid = 566;
  const out = [
    line(-20, deck, 616, deck),
    line(-20, deck + 16, 616, deck + 16),
    P([-20, 700], [t1, top1], [(t1 + t2) / 2, mid], [t2, top1], [616, 700]),
    // portals
    line(t1 - 24, deck, t1 - 14, top1 + 6),
    line(t1 + 24, deck, t1 + 14, top1 + 6),
    line(t1 - 14, top1 + 6, t1 + 14, top1 + 6),
    line(t2 - 24, deck, t2 - 14, top1 + 6),
    line(t2 + 24, deck, t2 + 14, top1 + 6),
    line(t2 - 14, top1 + 6, t2 + 14, top1 + 6),
    line(t1 - 19, 560, t1 + 19, 560),
    line(t2 - 19, 560, t2 + 19, 560),
    // piers into the water
    line(t1 - 30, deck + 16, t1 - 22, WATER + 20),
    line(t1 + 30, deck + 16, t1 + 22, WATER + 20),
    line(t1 - 26, 800, t1 + 26, 800),
    line(t2 - 30, deck + 16, t2 - 22, WATER + 20),
    line(t2 + 30, deck + 16, t2 + 22, WATER + 20),
    line(t2 - 26, 800, t2 + 26, 800),
  ];
  // hangers and bracing
  const chord = (x: number) => {
    if (x <= t1) return 700 + ((x + 20) / (t1 + 20)) * (top1 - 700);
    if (x <= (t1 + t2) / 2) return top1 + ((x - t1) / ((t2 - t1) / 2)) * (mid - top1);
    if (x <= t2) return mid + ((x - (t1 + t2) / 2) / ((t2 - t1) / 2)) * (top1 - mid);
    return top1 + ((x - t2) / (616 - t2)) * (700 - top1);
  };
  for (let x = 20; x < 616; x += 44) {
    const cy = chord(x);
    if (deck - cy > 16) out.push(line(x, cy, x, deck));
  }
  for (let x = 20; x < 594; x += 88) {
    out.push(line(x, deck, Math.min(x + 88, 616), chord(Math.min(x + 88, 616))));
  }
  return S(out);
};

/** Older terrace: arcaded ground floor, shuttered windows, iron balconies. */
export const colonial = () => {
  const x = 884;
  const w = 398;
  const top = 542;
  const floorH = 101;
  const out = [openRect(x, top, w, BANK - top)];
  out.push(line(x - 16, top, x + w + 16, top));
  out.push(line(x - 16, top - 15, x + w + 16, top - 15));
  out.push(line(x - 16, top - 15, x - 16, top));
  out.push(line(x + w + 16, top - 15, x + w + 16, top));
  for (let i = 0; i < 9; i++) {
    const bx = x - 6 + (i * (w + 12)) / 9 + 6;
    out.push(line(bx, top - 15, bx, top - 40));
  }
  out.push(line(x - 16, top - 40, x + w + 16, top - 40));

  const bays = 5;
  const bw = w / bays;
  for (let f = 0; f < 3; f++) {
    const fy = top + f * floorH;
    if (f > 0) out.push(line(x, fy, x + w, fy));
    for (let b = 0; b < bays; b++) {
      const cx = x + b * bw + bw * 0.24;
      const ww = bw * 0.52;
      if (f === 2) {
        out.push(archWindow(cx, fy + 26, ww, floorH - 26));
      } else {
        out.push(archWindow(cx, fy + 22, ww, floorH - 44));
        shutter(cx + 2, fy + 22 + ww / 2, ww / 2 - 3, floorH - 48 - ww / 2, 4).forEach((d) => out.push(d));
        shutter(cx + ww / 2 + 1, fy + 22 + ww / 2, ww / 2 - 3, floorH - 48 - ww / 2, 4).forEach((d) => out.push(d));
      }
    }
    if (f === 1) balcony(x + 8, fy + floorH - 18, w - 16, 14, 16).forEach((d) => out.push(d));
  }
  return S(out);
};

/** A domed civic pavilion, sitting behind the terrace. */
export const pavilion = () => {
  const cx = 800;
  const base = BANK;
  const w = 118;
  const top = base - 176;
  const out = [
    openRect(cx - w / 2, top, w, base - top),
    line(cx - w / 2 - 12, top, cx + w / 2 + 12, top),
    arch(cx - 46, top, 92, 58),
    line(cx, top - 58, cx, top - 82),
    `M${cx - 8},${top - 82} a8,8 0 1 0 16,0 a8,8 0 1 0 -16,0`,
  ];
  for (let i = 0; i < 4; i++) {
    const px = cx - w / 2 + 14 + i * ((w - 28) / 3);
    out.push(line(px, top + 14, px, base));
  }
  return S(out);
};

/** The foreground mid-rise used as the exit anchor. */
export const anchorBlock = () => {
  const { x, y, w, h } = ANCHOR;
  const out = [openRect(x, y, w, h)];
  out.push(line(x - 12, y, x + w + 12, y));
  out.push(line(x - 12, y - 14, x + w + 12, y - 14));
  out.push(line(x - 12, y - 14, x - 12, y));
  out.push(line(x + w + 12, y - 14, x + w + 12, y));
  windowGrid(x + 16, y + 26, w - 32, h - 118, 4, 5, 0.34, 0.36).forEach((d) => out.push(d));
  canopy(x + w / 2 - 54, BANK - 78, 108, 34).forEach((d) => out.push(d));
  door(x + w / 2 - 30, BANK - 62, 60, 62, true).forEach((d) => out.push(d));
  return S(out);
};

export const towers = () => {
  const out: string[] = [];
  const mk = (x: number, w: number, h: number, cols: number, rows: number) => {
    const top = BANK - h;
    out.push(openRect(x, top, w, h));
    out.push(line(x - 8, top, x + w + 8, top));
    windowGrid(x + 12, top + 20, w - 24, h - 60, cols, rows, 0.36, 0.42).forEach((d) => out.push(d));
  };
  mk(1548, 128, 392, 3, 9);
  mk(1700, 156, 300, 4, 7);
  mk(1878, 90, 214, 2, 5);
  out.push(line(1612, BANK - 392, 1612, BANK - 440));
  return S(out);
};

/* ---------------- layer 3 · life and landscape ---------------- */

export const treesFront = () =>
  [tree(566, BANK, 150), tree(868, BANK, 120), tree(1292, BANK, 142), tree(1534, BANK, 108)];

export const figuresOnGhat = () => [
  person(660, BANK + 24, 74, 'sitFloor', 1),
  person(712, BANK + 46, 76, 'stand', -1),
  person(792, BANK + 35, 74, 'stand', 1),
  person(820, BANK + 35, 72, 'walk', 1),
];

export const figuresOnBank = () => [
  person(1058, BANK, 82, 'walk', 1),
  person(1096, BANK, 80, 'stand', -1),
  person(1408, BANK, 80, 'carry', -1),
  person(1620, BANK, 78, 'walk', -1),
];

export const boats = () => ({
  still: boat(1180, WATER + 96, 108),
  drifting: (x: number) => boat(x, WATER + 138, 128),
});

export const streetDetail = () =>
  S([
    ...potPlant(1266, BANK, 54),
    line(950, BANK, 950, BANK - 34),
    line(938, BANK - 34, 962, BANK - 34),
    line(1700, BANK, 1700, BANK - 34),
    line(1688, BANK - 34, 1712, BANK - 34),
  ]);
