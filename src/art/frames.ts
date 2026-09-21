/**
 * The recurring architectural line, in each of its roles.
 * Positions are matched across slides rather than morphed.
 */
import { P, rect, line, openRect, arch, windowGrid, tree, potPlant, person, curtain, lightShaft } from './prims';
import { circle } from './places';
import { LINE, STAGE, SAFE } from '../design/tokens';

const S = (...g: (string | string[])[]) => g.flat().filter(Boolean) as string[];

/* ---- slide 2 · a margin defining the brief ---- */

export const cornerDoorway = () => {
  const x0 = 1346;
  const floor = LINE.baseY;
  const ceil = 150;
  const doorX = 1482;
  const doorW = 268;
  const doorTop = 278;
  return {
    plane: S(
      line(x0, ceil, x0, floor),
      line(x0, floor, 1960, floor),
      line(x0, ceil, 1960, ceil),
      line(1960 - 92, ceil, 1960 - 92, floor),
      line(x0, floor + 42, 1960, floor + 42),
      line(x0 - 34, floor, x0, floor + 42)
    ),
    opening: S(
      openRect(doorX, doorTop, doorW, floor - doorTop),
      arch(doorX, doorTop, doorW, 74),
      line(doorX - 16, floor, doorX + doorW + 16, floor),
      line(doorX + doorW + 52, doorTop + 46, doorX + doorW + 52, floor),
      line(doorX - 42, doorTop + 46, doorX - 42, floor)
    ),
    reveal: S(
      line(doorX + 30, doorTop + 46, doorX + 30, floor),
      line(doorX + doorW - 30, doorTop + 46, doorX + doorW - 30, floor),
      line(doorX + 30, doorTop + 132, doorX + doorW - 30, doorTop + 132)
    ),
    light: (skew: number) =>
      lightShaft(doorX + 30, doorTop + 80, doorW - 60, floor - doorTop - 80, skew),
    glass: rect(doorX + 30, doorTop + 52, doorW - 60, floor - doorTop - 52),
  };
};

/* ---- slide 3 · a framework dividing our interpretation ---- */

export const BAYS = [
  { x: SAFE, w: 560 },
  { x: SAFE + 580, w: 620 },
  { x: SAFE + 1220, w: 468 },
];
export const BAY_TOP = 336;
export const BAY_BOT = 920;

export const threeBay = () => {
  const out: string[] = [];
  const xs = [BAYS[0].x, BAYS[1].x, BAYS[2].x, BAYS[2].x + BAYS[2].w];
  out.push(line(BAYS[0].x - 18, BAY_TOP, xs[3] + 18, BAY_TOP));
  out.push(line(BAYS[0].x - 18, BAY_TOP - 13, xs[3] + 18, BAY_TOP - 13));
  out.push(line(BAYS[0].x - 18, BAY_TOP - 13, BAYS[0].x - 18, BAY_TOP));
  out.push(line(xs[3] + 18, BAY_TOP - 13, xs[3] + 18, BAY_TOP));
  out.push(line(BAYS[0].x - 18, BAY_BOT, xs[3] + 18, BAY_BOT));
  xs.forEach((x) => out.push(line(x, BAY_TOP, x, BAY_BOT)));
  // soffit returns, so the bays read as connected spaces rather than cards
  xs.slice(0, 3).forEach((x, i) => {
    const w = BAYS[i].w;
    out.push(line(x + 18, BAY_TOP + 26, x + w - 18, BAY_TOP + 26));
  });
  return out;
};

/** Which bay is live. A restrained accent, not a filled card. */
export const bayAccent = (i: number) => {
  const b = BAYS[i];
  return S(
    line(b.x, BAY_TOP, b.x, BAY_BOT),
    line(b.x + b.w, BAY_TOP, b.x + b.w, BAY_BOT),
    line(b.x, BAY_BOT, b.x + b.w, BAY_BOT)
  );
};

/* ---- slide 4 · a sequence connecting principles ---- */

export const PRINCIPLE_Y = [292, 438, 584, 774];
export const MARKER_X = SAFE + 18;

export const principleSpine = (throughIndex: number) => {
  const yEnd = PRINCIPLE_Y[Math.max(0, Math.min(3, throughIndex))] + 46;
  return line(MARKER_X, PRINCIPLE_Y[0] - 46, MARKER_X, yEnd);
};

/** A peripheral detail that carries the only ambient movement on slide 4. */
export const marginDetail = () => {
  const x = 1620;
  const base = 940;
  const t = tree(x + 150, base, 260);
  return {
    frame: S(
      line(x, 210, x, base),
      line(x, base, 1940, base),
      line(x, 210, 1940, 210),
      windowGrid(x + 34, 264, 210, 420, 2, 4, 0.3, 0.34)
    ),
    tree: t,
  };
};

/* ---- slide 5 · an enclosure around the central thought ---- */

export const enclosure = () => {
  const l = 214;
  const r = STAGE.W - 214;
  const t = 228;
  const b = 880;
  const d = 78;
  return {
    /** Floor plane and the two wall edges that meet it. */
    planes: S(
      P([l, b], [l + d, b - d], [r - d, b - d], [r, b]),
      line(l, b, l, t + d * 1.2),
      line(r, b, r, t + d * 1.2),
      P([l + d, b - d], [l + d, t + d * 0.4]),
      P([r - d, b - d], [r - d, t + d * 0.4])
    ),
    /** Deliberately incomplete: the ceiling never closes. */
    soffit: S(
      P([l, t + d * 1.2], [l + d, t + d * 0.4], [l + d + 210, t + d * 0.4]),
      P([r, t + d * 1.2], [r - d, t + d * 0.4], [r - d - 210, t + d * 0.4])
    ),
    lightPlane: `M${l},${b} L${l + d},${b - d} L${l + d},${t + d * 0.4} L${l},${t + d * 1.2} Z`,
  };
};

/* ---- slide 6 · an open boundary that closes into a volume ---- */

/** The cuboid. Front face, then the four connectors, then the back face. */
export const CUBOID = (() => {
  const l = 290;
  const r = 1480;
  const t = 340;
  const b = 800;
  const dx = 150;
  const dy = -96;
  const f = { l, r, t, b };
  const k = { l: l + dx, r: r + dx, t: t + dy, b: b + dy };
  return {
    f, k, dx, dy,
    /** 4 + 4 + 4 edges, in the order they are drawn. */
    edges: [
      // front face
      { d: line(f.l, f.b, f.r, f.b), at: 0 },
      { d: line(f.r, f.b, f.r, f.t), at: 4 },
      { d: line(f.r, f.t, f.l, f.t), at: 8 },
      { d: line(f.l, f.t, f.l, f.b), at: 12 },
      // depth connectors
      { d: line(f.r, f.t, k.r, k.t), at: 20 },
      { d: line(f.r, f.b, k.r, k.b), at: 24 },
      { d: line(f.l, f.t, k.l, k.t), at: 28 },
      { d: line(f.l, f.b, k.l, k.b), at: 32 },
      // back face, which closes the volume
      { d: line(k.l, k.t, k.r, k.t), at: 40 },
      { d: line(k.r, k.t, k.r, k.b), at: 44 },
      { d: line(k.r, k.b, k.l, k.b), at: 48 },
      { d: line(k.l, k.b, k.l, k.t), at: 52 },
    ],
    /** Midpoint of each edge, used when the volume comes apart on slide 7. */
    mid: [
      [(f.l + f.r) / 2, f.b], [f.r, (f.t + f.b) / 2], [(f.l + f.r) / 2, f.t], [f.l, (f.t + f.b) / 2],
      [(f.r + k.r) / 2, (f.t + k.t) / 2], [(f.r + k.r) / 2, (f.b + k.b) / 2],
      [(f.l + k.l) / 2, (f.t + k.t) / 2], [(f.l + k.l) / 2, (f.b + k.b) / 2],
      [(k.l + k.r) / 2, k.t], [k.r, (k.t + k.b) / 2], [(k.l + k.r) / 2, k.b], [k.l, (k.t + k.b) / 2],
    ] as [number, number][],
    /** The floor of the volume, and the plane that catches the light. */
    floor: `M${f.l},${f.b} L${f.r},${f.b} L${k.r},${k.b} L${k.l},${k.b} Z`,
    side: `M${f.r},${f.t} L${k.r},${k.t} L${k.r},${k.b} L${f.r},${f.b} Z`,
    top: `M${f.l},${f.t} L${f.r},${f.t} L${k.r},${k.t} L${k.l},${k.t} Z`,
  };
})();

/* ---- slide 1 · a foundation beneath the logo ---- */

export const openingForms = () => {
  const base = LINE.baseY;
  const towerX = 560;
  const blockX = 900;
  const atriumX = 1290;
  return {
    ground: line(-20, base, 1940, base),
    tower: S(
      openRect(towerX - 88, base - 372, 176, 372),
      line(towerX - 108, base - 372, towerX + 108, base - 372),
      line(towerX - 108, base - 388, towerX + 108, base - 388),
      line(towerX - 108, base - 388, towerX - 108, base - 372),
      line(towerX + 108, base - 388, towerX + 108, base - 372),
      windowGrid(towerX - 68, base - 348, 136, 288, 3, 7, 0.36, 0.4),
      line(towerX - 118, base - 56, towerX + 118, base - 56),
      line(towerX - 118, base - 56, towerX - 118, base)
    ),
    block: S(
      openRect(blockX - 150, base - 232, 300, 232),
      line(blockX - 172, base - 232, blockX + 172, base - 232),
      line(blockX - 172, base - 248, blockX + 172, base - 248),
      line(blockX - 172, base - 248, blockX - 172, base - 232),
      line(blockX + 172, base - 248, blockX + 172, base - 232),
      windowGrid(blockX - 126, base - 208, 252, 128, 6, 2, 0.34, 0.3),
      line(blockX - 150, base - 72, blockX + 150, base - 72),
      arch(blockX - 46, base, 92, 62)
    ),
    atrium: S(
      `M${atriumX - 210},${base - 168} Q${atriumX},${base - 440} ${atriumX + 210},${base - 168}`,
      line(atriumX - 210, base - 168, atriumX - 210, base),
      line(atriumX + 210, base - 168, atriumX + 210, base),
      line(atriumX, base - 350, atriumX, base),
      line(atriumX - 170, base - 96, atriumX + 170, base - 96),
      line(atriumX - 170, base - 168, atriumX + 170, base - 168),
      line(atriumX - 104, base - 260, atriumX - 104, base - 168),
      line(atriumX + 104, base - 260, atriumX + 104, base - 168)
    ),
    trees: [tree(240, base, 190), tree(1660, base, 210)],
  };
};
