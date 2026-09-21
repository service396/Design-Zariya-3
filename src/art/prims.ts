/**
 * Shared architectural and human primitives.
 * Every generator returns SVG path `d` strings in absolute 1920x1080 stage
 * coordinates so nothing depends on nested transforms for its line weight.
 */

const r = (n: number) => Math.round(n * 10) / 10;
export const P = (...pts: [number, number][]) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${r(p[0])},${r(p[1])}`).join(' ');

export const rect = (x: number, y: number, w: number, h: number) =>
  `M${r(x)},${r(y)} L${r(x + w)},${r(y)} L${r(x + w)},${r(y + h)} L${r(x)},${r(y + h)} Z`;

/** Three sides, open at the bottom. The usual way a building meets its ground. */
export const openRect = (x: number, y: number, w: number, h: number) =>
  `M${r(x)},${r(y + h)} L${r(x)},${r(y)} L${r(x + w)},${r(y)} L${r(x + w)},${r(y + h)}`;

export const line = (x1: number, y1: number, x2: number, y2: number) =>
  `M${r(x1)},${r(y1)} L${r(x2)},${r(y2)}`;

export const arch = (x: number, y: number, w: number, rise = w / 2) =>
  `M${r(x)},${r(y)} A${r(w / 2)},${r(rise)} 0 0 1 ${r(x + w)},${r(y)}`;

/** A window opening with an arched head. */
export const archWindow = (x: number, y: number, w: number, h: number) =>
  `M${r(x)},${r(y + h)} L${r(x)},${r(y + w / 2)} A${r(w / 2)},${r(w / 2)} 0 0 1 ${r(x + w)},${r(y + w / 2)} L${r(x + w)},${r(y + h)}`;

/** Louvred shutter: frame plus slats. */
export const shutter = (x: number, y: number, w: number, h: number, slats = 4) => {
  const out = [rect(x, y, w, h)];
  for (let i = 1; i < slats; i++) out.push(line(x + 2, y + (i * h) / slats, x + w - 2, y + (i * h) / slats));
  return out;
};

/** A balcony: slab, railing posts and a top rail. */
export const balcony = (x: number, y: number, w: number, depth = 13, posts = 7) => {
  const out = [line(x, y, x + w, y), line(x - 4, y + depth, x + w + 4, y + depth), line(x - 4, y, x - 4, y + depth), line(x + w + 4, y, x + w + 4, y + depth)];
  for (let i = 1; i < posts; i++) {
    const px = x + (i * w) / posts;
    out.push(line(px, y, px, y + depth));
  }
  return out;
};

/** Regular window grid inside a facade. */
export const windowGrid = (
  x: number, y: number, w: number, h: number,
  cols: number, rows: number, gapX = 0.42, gapY = 0.4
) => {
  const out: string[] = [];
  const cw = (w / cols) * (1 - gapX);
  const ch = (h / rows) * (1 - gapY);
  for (let c = 0; c < cols; c++) {
    for (let i = 0; i < rows; i++) {
      const wx = x + (c * w) / cols + ((w / cols) - cw) / 2;
      const wy = y + (i * h) / rows + ((h / rows) - ch) / 2;
      out.push(rect(wx, wy, cw, ch));
    }
  }
  return out;
};

export const pitchedRoof = (x: number, y: number, w: number, rise: number, eave = 10) =>
  P([x - eave, y], [x + w / 2, y - rise], [x + w + eave, y]);

/** Entrance canopy on two slim posts. */
export const canopy = (x: number, y: number, w: number, drop = 46) => [
  line(x - 10, y, x + w + 10, y),
  line(x - 10, y, x - 10, y + 9),
  line(x + w + 10, y, x + w + 10, y + 9),
  line(x - 10, y + 9, x + w + 10, y + 9),
  line(x + 6, y + 9, x + 6, y + drop),
  line(x + w - 6, y + 9, x + w - 6, y + drop),
];

/** Scalloped shop awning. */
export const awning = (x: number, y: number, w: number, drop = 26, scallops = 5) => {
  const out = [P([x, y], [x - 6, y + drop])];
  let d = `M${r(x - 6)},${r(y + drop)}`;
  const step = (w + 12) / scallops;
  for (let i = 0; i < scallops; i++) {
    d += ` A${r(step / 2)},${r(step / 2.6)} 0 0 0 ${r(x - 6 + (i + 1) * step)},${r(y + drop)}`;
  }
  out.push(d);
  out.push(P([x + w, y], [x + w + 6, y + drop]));
  out.push(line(x, y, x + w, y));
  return out;
};

export const door = (x: number, y: number, w: number, h: number, double = false) => {
  const out = [openRect(x, y, w, h)];
  if (double) out.push(line(x + w / 2, y, x + w / 2, y + h));
  out.push(
    double
      ? line(x + w * 0.42, y + h * 0.56, x + w * 0.58, y + h * 0.56)
      : line(x + w * 0.74, y + h * 0.56, x + w * 0.86, y + h * 0.56)
  );
  return out;
};

export const steps = (x: number, y: number, w: number, count = 3, rise = 9, run = 14) => {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(line(x - i * run, y + i * rise, x + w + i * run, y + i * rise));
    out.push(line(x - i * run, y + i * rise, x - i * run, y + (i + 1) * rise));
    out.push(line(x + w + i * run, y + i * rise, x + w + i * run, y + (i + 1) * rise));
  }
  return out;
};

/** Ramp beside an entrance, for an accessible institutional threshold. */
export const ramp = (x: number, y: number, w: number, drop: number) => {
  const rail = 46;
  return [
    P([x, y - drop], [x + w, y]),
    line(x, y - drop, x, y),
    P([x, y - drop - rail], [x + w, y - rail]),
    line(x, y - drop - rail, x, y - drop),
    line(x + w, y - rail, x + w, y),
    line(x + w * 0.5, y - drop * 0.5 - rail, x + w * 0.5, y - drop * 0.5),
  ];
};

/* ---------------- landscape ---------------- */

/** A broadleaf tree. Canopy is three overlapping arcs so it reads at any size. */
export const tree = (x: number, base: number, h: number, spread = h * 0.62) => {
  const cy = base - h * 0.66;
  const rr = spread / 2;
  return {
    trunk: [
      P([x - 3, base], [x - 2, base - h * 0.42]),
      P([x + 3, base], [x + 2, base - h * 0.42]),
      P([x, base - h * 0.34], [x - rr * 0.42, base - h * 0.52]),
      P([x, base - h * 0.4], [x + rr * 0.4, base - h * 0.58]),
    ],
    canopy: [
      `M${r(x - rr)},${r(cy + rr * 0.3)} A${r(rr)},${r(rr * 0.95)} 0 0 1 ${r(x + rr)},${r(cy + rr * 0.3)}`
        + ` q${r(-rr * 0.34)},${r(rr * 0.5)} ${r(-rr * 0.82)},${r(rr * 0.42)}`
        + ` q${r(-rr * 0.36)},${r(rr * 0.24)} ${r(-rr * 0.7)},${r(-rr * 0.12)}`
        + ` q${r(-rr * 0.3)},${r(-rr * 0.06)} ${r(-rr * 0.48)},${r(-rr * 0.3)}`,
      `M${r(x - rr * 0.56)},${r(cy - rr * 0.18)} q${r(rr * 0.3)},${r(-rr * 0.26)} ${r(rr * 0.62)},${r(-rr * 0.04)}`,
      `M${r(x + rr * 0.16)},${r(cy - rr * 0.3)} q${r(rr * 0.26)},${r(rr * 0.04)} ${r(rr * 0.4)},${r(rr * 0.3)}`,
    ],
    fill: `M${r(x - rr)},${r(cy + rr * 0.3)} A${r(rr)},${r(rr * 0.95)} 0 0 1 ${r(x + rr)},${r(cy + rr * 0.3)}`
      + ` q${r(-rr * 0.34)},${r(rr * 0.5)} ${r(-rr * 0.82)},${r(rr * 0.42)}`
      + ` q${r(-rr * 0.36)},${r(rr * 0.24)} ${r(-rr * 0.7)},${r(-rr * 0.12)}`
      + ` q${r(-rr * 0.3)},${r(-rr * 0.06)} ${r(-rr * 0.48)},${r(-rr * 0.3)} Z`,
  };
};

export const palm = (x: number, base: number, h: number) => {
  const top = base - h;
  const out = [P([x - 2, base], [x + 4, top])];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI * 0.92 + (i / 5) * Math.PI * 0.84;
    const lx = x + 4 + Math.cos(a) * h * 0.46;
    const ly = top + Math.sin(a) * h * 0.3 + h * 0.06;
    out.push(`M${r(x + 4)},${r(top)} Q${r((x + 4 + lx) / 2)},${r(top - h * 0.14)} ${r(lx)},${r(ly)}`);
  }
  return out;
};

export const potPlant = (x: number, base: number, h: number) => {
  const pot = h * 0.34;
  return [
    P([x - h * 0.17, base - pot], [x - h * 0.13, base], [x + h * 0.13, base], [x + h * 0.17, base - pot]),
    line(x - h * 0.19, base - pot, x + h * 0.19, base - pot),
    `M${r(x)},${r(base - pot)} Q${r(x - h * 0.3)},${r(base - pot - h * 0.36)} ${r(x - h * 0.1)},${r(base - h)}`,
    `M${r(x)},${r(base - pot)} Q${r(x + h * 0.32)},${r(base - pot - h * 0.3)} ${r(x + h * 0.14)},${r(base - h * 0.9)}`,
    `M${r(x)},${r(base - pot)} Q${r(x + h * 0.06)},${r(base - pot - h * 0.4)} ${r(x + h * 0.02)},${r(base - h * 0.98)}`,
  ];
};

/* ---------------- water ---------------- */

export const ripples = (x: number, y: number, w: number, rows: number, seedStep = 37) => {
  const out: string[] = [];
  for (let i = 0; i < rows; i++) {
    const yy = y + i * 13;
    const off = ((i * seedStep) % 90) - 45;
    const len = 60 + ((i * 53) % 120);
    out.push(`M${r(x + off + w * 0.08 * i)},${r(yy)} q${r(len / 2)},-5 ${r(len)},0`);
  }
  return out;
};

export const boat = (x: number, y: number, w: number) => [
  `M${r(x)},${r(y)} q${r(w / 2)},${r(w * 0.22)} ${r(w)},0`,
  line(x + w * 0.1, y, x + w * 0.9, y),
  line(x + w * 0.5, y, x + w * 0.5, y - w * 0.42),
  P([x + w * 0.5, y - w * 0.4], [x + w * 0.78, y - w * 0.08]),
];

/* ---------------- people ---------------- */

export type Pose =
  | 'stand'
  | 'walk'
  | 'sit'
  | 'sitFloor'
  | 'lean'
  | 'sketch'
  | 'reach'
  | 'yoga'
  | 'carry';

export type Figure = { head: { cx: number; cy: number; r: number }; paths: string[] };

/**
 * A person, built from a head, a torso line and four limbs.
 * `h` is full standing height; seated poses use the same head size so a
 * group of figures in one room stays consistent.
 */
export const person = (
  x: number,
  base: number,
  h: number,
  pose: Pose = 'stand',
  face: 1 | -1 = 1
): Figure => {
  const hr = h * 0.082;
  const f = face;
  const shoulder = h * 0.78;
  const hip = h * 0.48;

  const head = (cx: number, cy: number) => ({ cx, cy, r: hr });
  const seg = (a: [number, number], b: [number, number]) => P(a, b);
  const curve = (a: [number, number], c: [number, number], b: [number, number]) =>
    `M${r(a[0])},${r(a[1])} Q${r(c[0])},${r(c[1])} ${r(b[0])},${r(b[1])}`;

  if (pose === 'sit' || pose === 'lean' || pose === 'sketch') {
    const seatH = h * 0.42;
    const sy = base - seatH;
    const hipP: [number, number] = [x, sy];
    const shP: [number, number] = [x - f * h * 0.04, sy - h * 0.3];
    const lean = pose === 'lean' ? f * h * 0.05 : 0;
    const p: string[] = [
      curve(hipP, [x - f * h * 0.02 + lean, sy - h * 0.16], [shP[0] + lean, shP[1]]),
      seg(hipP, [x + f * h * 0.24, sy + h * 0.02]),
      seg([x + f * h * 0.24, sy + h * 0.02], [x + f * h * 0.24, base]),
      seg([x - f * h * 0.02, sy], [x + f * h * 0.19, sy + h * 0.03]),
      seg([x + f * h * 0.19, sy + h * 0.03], [x + f * h * 0.18, base]),
    ];
    if (pose === 'sketch') {
      p.push(curve([shP[0] + lean, shP[1]], [x + f * h * 0.14, sy - h * 0.24], [x + f * h * 0.26, sy - h * 0.11]));
      p.push(seg([shP[0] + lean, shP[1]], [x + f * h * 0.2, sy - h * 0.06]));
    } else {
      p.push(curve([shP[0] + lean, shP[1]], [x + f * h * 0.1, sy - h * 0.24], [x + f * h * 0.2, sy - h * 0.13]));
      p.push(curve([shP[0] + lean, shP[1]], [x - f * h * 0.06, sy - h * 0.2], [x + f * h * 0.04, sy - h * 0.08]));
    }
    p.push(seg([shP[0] + lean + f * h * 0.02, shP[1]], [shP[0] + lean + f * h * 0.02, shP[1] - hr * 0.66]));
    return { head: head(shP[0] + lean + f * h * 0.02, shP[1] - hr * 1.5), paths: p };
  }

  if (pose === 'sitFloor' || pose === 'yoga') {
    const sy = base - h * 0.06;
    const shP: [number, number] = [x, sy - h * 0.3];
    const p = [
      seg([x, sy], [shP[0], shP[1]]),
      curve([x - h * 0.02, sy], [x + f * h * 0.14, sy + h * 0.02], [x + f * h * 0.22, base]),
      curve([x - h * 0.02, sy], [x - f * h * 0.1, sy + h * 0.03], [x - f * h * 0.2, base]),
      line(x - h * 0.2, base, x + h * 0.22, base),
    ];
    if (pose === 'yoga') {
      p.push(curve(shP, [x + f * h * 0.16, sy - h * 0.42], [x + f * h * 0.06, sy - h * 0.5]));
      p.push(curve(shP, [x - f * h * 0.16, sy - h * 0.42], [x - f * h * 0.06, sy - h * 0.5]));
      p.push(seg([x, sy - h * 0.3], [x, sy - h * 0.3 - hr * 0.66]));
      return { head: head(x, sy - h * 0.3 - hr * 1.5), paths: p };
    }
    p.push(curve(shP, [x + f * h * 0.15, sy - h * 0.2], [x + f * h * 0.2, sy - h * 0.02]));
    p.push(curve(shP, [x - f * h * 0.14, sy - h * 0.2], [x - f * h * 0.17, sy - h * 0.02]));
    p.push(seg([x, sy - h * 0.3], [x, sy - h * 0.3 - hr * 0.66]));
    return { head: head(x, sy - h * 0.3 - hr * 1.5), paths: p };
  }

  /* upright poses */
  const shP: [number, number] = [x, base - shoulder];
  const hipP: [number, number] = [x, base - hip];
  const stride = pose === 'walk' ? h * 0.12 : h * 0.045;
  const p: string[] = [
    seg(shP, hipP),
    seg(hipP, [x + f * stride, base]),
    seg(hipP, [x - f * stride * 0.85, base]),
  ];
  if (pose === 'reach') {
    p.push(curve(shP, [x + f * h * 0.13, base - shoulder - h * 0.06], [x + f * h * 0.17, base - shoulder - h * 0.16]));
    p.push(curve(shP, [x - f * h * 0.08, base - shoulder + h * 0.1], [x - f * h * 0.05, base - hip + h * 0.02]));
  } else if (pose === 'carry') {
    p.push(curve(shP, [x + f * h * 0.1, base - shoulder + h * 0.1], [x + f * h * 0.11, base - hip - h * 0.02]));
    p.push(curve(shP, [x - f * h * 0.09, base - shoulder + h * 0.1], [x - f * h * 0.08, base - hip - h * 0.02]));
  } else {
    p.push(curve(shP, [x + f * h * 0.09, base - shoulder + h * 0.09], [x + f * h * 0.07, base - hip + h * 0.03]));
    p.push(curve(shP, [x - f * h * 0.08, base - shoulder + h * 0.09], [x - f * h * 0.06, base - hip + h * 0.03]));
  }
  p.push(line(x - h * 0.055, base - shoulder, x + h * 0.055, base - shoulder));
  p.push(seg([x + f * h * 0.005, base - shoulder], [x + f * h * 0.005, base - shoulder - hr * 0.62]));
  return { head: head(x + f * h * 0.005, base - shoulder - hr * 1.45), paths: p };
};

/* ---------------- furniture ---------------- */

export const table = (x: number, y: number, w: number, h = 34) => [
  line(x, y, x + w, y),
  line(x, y, x, y + 5),
  line(x + w, y, x + w, y + 5),
  line(x + w * 0.1, y + 5, x + w * 0.1, y + h),
  line(x + w * 0.9, y + 5, x + w * 0.9, y + h),
];

export const roundTable = (x: number, y: number, w: number, h = 34) => [
  `M${r(x)},${r(y)} a${r(w / 2)},${r(w * 0.14)} 0 1 0 ${r(w)},0 a${r(w / 2)},${r(w * 0.14)} 0 1 0 ${r(-w)},0`,
  line(x + w / 2, y + w * 0.14, x + w / 2, y + h),
  line(x + w * 0.3, y + h, x + w * 0.7, y + h),
];

export const chair = (x: number, y: number, w = 30, h = 46, face: 1 | -1 = 1) => [
  line(x, y, x + w, y),
  line(x + face * 0, y, x + face * 0, y - h * 0.62),
  line(x, y, x, y + h * 0.5),
  line(x + w, y, x + w, y + h * 0.5),
];

export const sofa = (x: number, y: number, w: number, h = 56) => [
  `M${r(x)},${r(y)} L${r(x)},${r(y - h)} q0,-8 8,-8 L${r(x + w - 8)},${r(y - h - 8)} q8,0 8,8 L${r(x + w)},${r(y)}`,
  line(x + 16, y - h * 0.52, x + w - 16, y - h * 0.52),
  line(x + 16, y - h * 0.52, x + 16, y),
  line(x + w - 16, y - h * 0.52, x + w - 16, y),
  line(x + w / 2, y - h * 0.52, x + w / 2, y - h - 6),
];

export const desk = (x: number, y: number, w: number, h = 40) => [
  line(x, y, x + w, y),
  line(x, y, x, y + 6),
  line(x + w, y, x + w, y + 6),
  line(x + 8, y + 6, x + 8, y + h),
  line(x + w - 8, y + 6, x + w - 8, y + h),
  rect(x + w * 0.52, y + 6, w * 0.4, h * 0.6),
];

/** Laptop or screen on a surface. */
export const screen = (x: number, y: number, w: number, h: number) => [
  rect(x, y - h, w, h),
  line(x + w / 2, y, x + w / 2, y + 8),
  line(x + w * 0.28, y + 8, x + w * 0.72, y + 8),
];

export const lamp = (x: number, base: number, h: number) => [
  line(x - 10, base, x + 10, base),
  line(x, base, x, base - h),
  P([x - 16, base - h], [x - 11, base - h - 22], [x + 11, base - h - 22], [x + 16, base - h], [x - 16, base - h]),
];

export const rug = (x: number, y: number, w: number) => [
  `M${r(x)},${r(y)} l${r(w * 0.12)},${r(-8)} l${r(w * 0.76)},0 l${r(w * 0.12)},8 Z`,
];

export const mat = (x: number, y: number, w: number) => [
  `M${r(x)},${r(y)} l${r(w * 0.1)},-6 l${r(w * 0.8)},0 l${r(w * 0.1)},6 Z`,
];

/** Full-height window with a curtain on one side. */
export const windowWall = (x: number, y: number, w: number, h: number) => ({
  frame: [rect(x, y, w, h), line(x + w / 2, y, x + w / 2, y + h)],
  sill: line(x - 8, y + h, x + w + 8, y + h),
});

export const curtain = (x: number, y: number, h: number, sway: number, folds = 4) => {
  const out: string[] = [];
  const w = 40;
  for (let i = 0; i <= folds; i++) {
    const px = x + (i * w) / folds;
    out.push(`M${r(px)},${r(y)} Q${r(px + sway * (0.4 + i * 0.16))},${r(y + h * 0.55)} ${r(px + sway * (0.8 + i * 0.3))},${r(y + h)}`);
  }
  return out;
};

/** Soft shaft of daylight, as a filled quad. */
export const lightShaft = (x: number, y: number, w: number, h: number, skew: number) =>
  `M${r(x)},${r(y)} L${r(x + w)},${r(y)} L${r(x + w + skew)},${r(y + h)} L${r(x + skew)},${r(y + h)} Z`;

/** A drafting easel: angled board on a tripod. */
export const easel = (x: number, base: number, h: number) => {
  const bw = h * 0.74;
  const bh = h * 0.62;
  const topY = base - h;
  return [
    P([x - bw / 2, topY + bh], [x - bw / 2 + 10, topY], [x + bw / 2, topY + 6], [x + bw / 2 - 10, topY + bh + 6], [x - bw / 2, topY + bh]),
    line(x - bw / 2 + 4, topY + bh * 0.42, x + bw / 2 - 6, topY + bh * 0.36),
    line(x - bw / 2 + 6, topY + bh * 0.68, x + bw / 2 - 26, topY + bh * 0.64),
    line(x - bw * 0.3, topY + bh + 4, x - bw * 0.42, base),
    line(x + bw * 0.24, topY + bh + 8, x + bw * 0.34, base),
    line(x - bw * 0.02, topY + bh + 6, x + bw * 0.04, base),
    line(x - bw * 0.36, base - h * 0.16, x + bw * 0.28, base - h * 0.18),
  ];
};
