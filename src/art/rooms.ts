/**
 * Slide 9 — the life within the space.
 * Warm cutaways, inhabited. Feeling is shown through posture, daylight and
 * gathering, never through symbols.
 */
import {
  P, rect, line, person, table, roundTable, chair, sofa, desk, screen,
  lamp, rug, mat, potPlant, tree, curtain, lightShaft, windowWall, easel,
} from './prims';
import { circle } from './places';

export const FLOOR = 806;
export const CEIL = 296;

const S = (...g: (string | string[])[]) => g.flat().filter(Boolean) as string[];

/** A person including their head, as one stroke list. */
export const fig = (
  x: number, base: number, h: number,
  pose: Parameters<typeof person>[3] = 'stand',
  face: 1 | -1 = 1
) => {
  const f = person(x, base, h, pose, face);
  return [...f.paths, circle(f.head.cx, f.head.cy, f.head.r)];
};

/* ---------------- shells ---------------- */

export const BAY2 = [
  { x: 132, w: 802 },
  { x: 986, w: 802 },
];

export const BAY3 = [
  { x: 116, w: 570 },
  { x: 712, w: 496 },
  { x: 1234, w: 570 },
];

const shell = (bays: { x: number; w: number }[], openIdx: number[] = []) => {
  const out: string[] = [line(-20, FLOOR, 1940, FLOOR)];
  bays.forEach((b, i) => {
    const open = openIdx.includes(i);
    out.push(line(b.x, FLOOR, b.x, CEIL));
    out.push(line(b.x + b.w, FLOOR, b.x + b.w, CEIL));
    if (!open) {
      out.push(line(b.x - 14, CEIL, b.x + b.w + 14, CEIL));
      out.push(line(b.x - 14, CEIL - 15, b.x + b.w + 14, CEIL - 15));
      out.push(line(b.x - 14, CEIL - 15, b.x - 14, CEIL));
      out.push(line(b.x + b.w + 14, CEIL - 15, b.x + b.w + 14, CEIL));
    }
    out.push(line(b.x + 12, FLOOR - 11, b.x + b.w - 12, FLOOR - 11));
  });
  return out;
};

export const shell2 = () => shell(BAY2);
export const shell3 = () => shell(BAY3, [1]);

/* ---------------- scene A · calm and focus ---------------- */

export const yogaStudio = (sway: number, breath: number) => {
  const b = BAY2[0];
  const winX = b.x + b.w - 296;
  const win = windowWall(winX, CEIL + 82, 236, 390);
  return {
    structure: S(
      win.frame,
      win.sill,
      line(b.x + 52, CEIL + 64, b.x + 372, CEIL + 64),
      line(b.x + 52, CEIL + 64, b.x + 52, CEIL + 80),
      line(b.x + 372, CEIL + 64, b.x + 372, CEIL + 80),
      line(b.x + 52, CEIL + 80, b.x + 372, CEIL + 80)
    ),
    people: S(
      mat(b.x + 92, FLOOR, 200),
      mat(b.x + 318, FLOOR, 200),
      mat(b.x + 544, FLOOR, 190),
      fig(b.x + 186, FLOOR - 5, 196 + breath, 'yoga', 1),
      fig(b.x + 412, FLOOR - 5, 192, 'sitFloor', 1),
      fig(b.x + 634, FLOOR - 5, 194, 'sitFloor', -1),
      potPlant(b.x + b.w - 46, FLOOR, 168)
    ),
    curtain: curtain(winX + 198, CEIL + 84, 380, sway, 4),
    shaft: lightShaft(winX + 10, CEIL + 90, 216, FLOOR - CEIL - 90, -242),
    glass: rect(winX, CEIL + 82, 236, 390),
  };
};

export const meetingRoom = (lean: number) => {
  const b = BAY2[1];
  const cx = b.x + b.w / 2;
  return {
    structure: S(
      rect(b.x + 66, CEIL + 76, 268, 166),
      line(b.x + 66 + 32, CEIL + 118, b.x + 66 + 236, CEIL + 118),
      line(b.x + 66 + 32, CEIL + 156, b.x + 66 + 190, CEIL + 156),
      line(cx + 214, CEIL + 15, cx + 214, CEIL + 108),
      P([cx + 184, CEIL + 108], [cx + 244, CEIL + 108], [cx + 230, CEIL + 146], [cx + 198, CEIL + 146], [cx + 184, CEIL + 108])
    ),
    people: S(
      table(cx - 196, FLOOR - 122, 392, 122),
      screen(cx - 44, FLOOR - 122, 88, 54),
      fig(cx - 244, FLOOR, 198, 'sit', 1),
      fig(cx - 126, FLOOR, 194, 'sit', 1),
      fig(cx + 138, FLOOR, 198 + lean, 'lean', -1),
      fig(cx + 252, FLOOR, 192, 'sit', -1),
      potPlant(b.x + 50, FLOOR, 130)
    ),
    tableFill: rect(cx - 196, FLOOR - 122, 392, 7),
  };
};

/* ---------------- scene B · work and making ---------------- */

export const office = (lean: number) => {
  const b = BAY2[0];
  const cx = b.x + b.w / 2;
  return {
    structure: S(
      line(b.x + 64, CEIL + 84, b.x + 356, CEIL + 84),
      line(b.x + 64, CEIL + 84, b.x + 64, CEIL + 196),
      line(b.x + 356, CEIL + 84, b.x + 356, CEIL + 196),
      line(b.x + 64, CEIL + 140, b.x + 356, CEIL + 140),
      line(b.x + 64, CEIL + 196, b.x + 356, CEIL + 196),
      rect(b.x + b.w - 292, CEIL + 76, 232, 330)
    ),
    people: S(
      desk(cx - 268, FLOOR - 124, 300, 124),
      screen(cx - 206, FLOOR - 124, 96, 58),
      chair(cx - 322, FLOOR, 34, 54, 1),
      fig(cx - 306, FLOOR, 198, 'sit', 1),
      fig(cx - 78, FLOOR, 194 + lean, 'lean', -1),
      desk(cx + 106, FLOOR - 124, 226, 124),
      chair(cx + 66, FLOOR, 34, 54, 1),
      fig(cx + 80, FLOOR, 192, 'sit', 1),
      potPlant(b.x + 42, FLOOR, 142)
    ),
    glass: rect(b.x + b.w - 292, CEIL + 76, 232, 330),
  };
};

export const studio = (hand: number) => {
  const b = BAY2[1];
  const cx = b.x + b.w / 2;
  return {
    structure: S(
      line(b.x + 62, CEIL + 96, b.x + 314, CEIL + 96),
      line(b.x + 62, CEIL + 162, b.x + 314, CEIL + 162),
      line(b.x + 62, CEIL + 96, b.x + 62, CEIL + 162),
      line(b.x + 314, CEIL + 96, b.x + 314, CEIL + 162),
      rect(b.x + 88, CEIL + 106, 38, 46),
      rect(b.x + 140, CEIL + 112, 30, 40),
      rect(b.x + 190, CEIL + 102, 42, 50),
      line(cx + 186, CEIL + 15, cx + 186, CEIL + 124),
      P([cx + 156, CEIL + 124], [cx + 216, CEIL + 124], [cx + 202, CEIL + 162], [cx + 170, CEIL + 162], [cx + 156, CEIL + 124])
    ),
    people: S(
      easel(cx - 40, FLOOR, 330),
      fig(cx + 108, FLOOR, 200 + hand, 'sketch', -1),
      potPlant(b.x + b.w - 58, FLOOR, 160),
      rect(cx + 208, FLOOR - 62, 118, 62),
      line(cx + 208, FLOOR - 40, cx + 326, FLOOR - 40),
      line(cx + 267, FLOOR - 62, cx + 267, FLOOR)
    ),
    boardFill: `M${cx - 40 - 122},${FLOOR - 330 + 205} L${cx - 40 - 112},${FLOOR - 330} L${cx - 40 + 122},${FLOOR - 330 + 6} L${cx - 40 + 112},${FLOOR - 330 + 211} Z`,
  };
};

/* ---------------- scene C · belonging and gathering ---------------- */

export const livingRoom = (lean: number) => {
  const b = BAY3[0];
  const cx = b.x + b.w / 2;
  return {
    structure: S(
      rect(b.x + 46, CEIL + 78, 186, 146),
      line(b.x + 46, CEIL + 152, b.x + 232, CEIL + 152),
      line(b.x + b.w - 176, CEIL + 84, b.x + b.w - 46, CEIL + 84),
      line(b.x + b.w - 176, CEIL + 138, b.x + b.w - 46, CEIL + 138),
      line(b.x + b.w - 176, CEIL + 84, b.x + b.w - 176, CEIL + 138),
      line(b.x + b.w - 46, CEIL + 84, b.x + b.w - 46, CEIL + 138)
    ),
    people: S(
      rug(cx - 226, FLOOR, 452),
      sofa(cx - 214, FLOOR - 22, 320, 92),
      fig(cx - 142, FLOOR - 24, 196, 'sit', 1),
      fig(cx - 28, FLOOR - 24, 192 + lean, 'lean', -1),
      table(cx + 142, FLOOR - 66, 118, 66),
      lamp(cx + 212, FLOOR, 176),
      potPlant(b.x + 38, FLOOR, 132)
    ),
    warm: rect(cx - 226, FLOOR - 5, 452, 5),
  };
};

export const garden = (leaf: number) => {
  const b = BAY3[1];
  const cx = b.x + b.w / 2;
  const t1 = tree(b.x + 76, FLOOR, 330 + leaf);
  const t2 = tree(b.x + b.w - 62, FLOOR, 268 - leaf);
  return {
    structure: S(
      line(b.x + 26, FLOOR - 8, b.x + b.w - 26, FLOOR - 8),
      t1.trunk, t2.trunk
    ),
    canopy: S(t1.canopy, t2.canopy),
    fills: [t1.fill, t2.fill],
    people: S(
      line(cx - 92, FLOOR - 56, cx + 92, FLOOR - 56),
      line(cx - 92, FLOOR - 56, cx - 92, FLOOR),
      line(cx + 92, FLOOR - 56, cx + 92, FLOOR),
      line(cx - 92, FLOOR - 100, cx + 92, FLOOR - 100),
      line(cx - 92, FLOOR - 100, cx - 92, FLOOR - 56),
      line(cx + 92, FLOOR - 100, cx + 92, FLOOR - 56),
      fig(cx - 48, FLOOR - 56, 194, 'sit', 1),
      fig(cx + 52, FLOOR - 56, 190, 'sit', -1),
      fig(b.x + 152, FLOOR, 186, 'walk', 1)
    ),
  };
};

export const restaurantRoom = (lean: number) => {
  const b = BAY3[2];
  const cx = b.x + b.w / 2;
  return {
    structure: S(
      rect(b.x + 48, CEIL + 76, 194, 290),
      line(b.x + 48 + 97, CEIL + 76, b.x + 48 + 97, CEIL + 366),
      line(cx + 72, CEIL + 15, cx + 72, CEIL + 112),
      P([cx + 44, CEIL + 112], [cx + 100, CEIL + 112], [cx + 88, CEIL + 146], [cx + 56, CEIL + 146], [cx + 44, CEIL + 112]),
      line(cx - 132, CEIL + 15, cx - 132, CEIL + 86),
      P([cx - 160, CEIL + 86], [cx - 104, CEIL + 86], [cx - 116, CEIL + 120], [cx - 148, CEIL + 120], [cx - 160, CEIL + 86])
    ),
    people: S(
      roundTable(cx - 116, FLOOR - 124, 232, 124),
      fig(cx - 182, FLOOR, 196, 'sit', 1),
      fig(cx + 22, FLOOR, 192 + lean, 'lean', -1),
      fig(cx + 162, FLOOR, 190, 'sit', -1),
      potPlant(b.x + b.w - 48, FLOOR, 126)
    ),
    glass: rect(b.x + 48, CEIL + 76, 194, 290),
  };
};
