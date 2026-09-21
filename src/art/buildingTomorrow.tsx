import React from 'react';
import { interpolate, Easing } from 'remotion';
import { C, TYPE } from '../design/tokens';

/**
 * BUILDING TOMORROW — the six-second logo reveal.
 *
 * One continuous transformation, not a parade of icons: three dots become
 * three buildings, the buildings gain neighbours, and that same geometry
 * closes into a microphone. Every stage reuses the elements of the one
 * before it, so the audience can follow the thread all the way to the mark.
 *
 * Pure function of `frame`. Nothing here reads a clock, so the deck, the
 * Remotion render and the still export all agree exactly.
 *
 *   0–21    a conversation begins      three dots, a small stagger and settle
 *   21–48   ideas take shape           dots stretch into buildings on a ground line
 *   48–78   building tomorrow          two more forms, a path between them
 *   78–111  the city becomes a voice   the same shapes close into a microphone
 *   111–141 the name arrives           the mark lifts, the wordmark wipes up
 *   141–180 resolve and hold           nothing moves
 *
 * Layers are `#bt-background`, `#bt-symbol` and `#bt-wordmark`, kept separate
 * so the mark can be lifted out of the animation as a still asset.
 */

export const BT = {
  W: 1920,
  H: 1080,
  FPS: 30,
  /** Total length of the reveal. Frames beyond this hold the final frame. */
  DURATION: 180,
} as const;

const CX = 960;
/** The ground the city stands on, and the height everything is measured from. */
const BASE_Y = 660;

const EASE = Easing.bezier(0.22, 0.85, 0.24, 1);
const EASE_IO = Easing.bezier(0.5, 0.05, 0.2, 1);

const ramp = (f: number, at: number, dur: number, easing = EASE) =>
  interpolate(f, [at, at + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/* ---------------------------------------------------------------- geometry */

/** The three shapes that carry the whole story, from dot to grille bar. */
const TOWERS = [
  { dotX: 860, h: 210, micX: 908, micW: 40, micTop: 340, micBottom: 545 },
  { dotX: 960, h: 330, micX: 960, micW: 40, micTop: 320, micBottom: 565 },
  { dotX: 1060, h: 150, micX: 1012, micW: 40, micTop: 340, micBottom: 545 },
] as const;

const DOT_R = 20;
const TOWER_W = 76;

/** Windows, as terracotta cut-outs. Kept to a handful so the mark stays flat. */
const WINDOWS: { x: number; y: number }[] = [
  { x: 846, y: 492 },
  { x: 880, y: 492 },
  { x: 846, y: 546 },
  { x: 946, y: 386 },
  { x: 980, y: 386 },
  { x: 946, y: 440 },
  { x: 980, y: 440 },
  { x: 1046, y: 556 },
];
const WIN = 24;

/** The low horizontal form on the left, and the tall one on the right. */
const LOW = { x: 690, w: 130, h: 86, rx: 22 };
const TALL = { x: 1140, w: 90, h: 260, rx: 45 };

/** The microphone. */
const MIC = {
  capsule: { x: 866, y: 286, w: 188, h: 314, rx: 94 },
  yoke: { left: 800, right: 1120, y: 470, r: 160, bottom: 630 },
  stemTop: 630,
  stemBottom: 700,
  base: { x: 876, y: 700, w: 168, h: 16, rx: 8 },
};

/** How far the finished mark lifts to make room for the wordmark. */
const LIFT = 100;

const STROKE = 14;

/**
 * Everything above is drawn at a comfortable working size and then scaled as
 * one, so the mark fills a projected 16:9 frame instead of sitting small in
 * the middle of it. Changing this is the only thing needed to resize the
 * whole reveal.
 */
const SCALE = 1.36;

/* ------------------------------------------------- the mark, on its own */

/** Bounds of the finished lock-up, in the working coordinates above. */
export const MARK = { cx: CX, cy: 528, top: 186, bottom: 870 } as const;

/** The capsule as a stadium path, so it can be stroked on. */
const CAPSULE_PATH = (() => {
  const { x, w } = MIC.capsule;
  const y = MIC.capsule.y - LIFT;
  const h = MIC.capsule.h;
  const r = w / 2;
  const cx = x + r;
  return [
    `M${cx},${y}`,
    `A${r},${r} 0 0 1 ${x + w},${y + r}`,
    `L${x + w},${y + h - r}`,
    `A${r},${r} 0 0 1 ${x},${y + h - r}`,
    `L${x},${y + r}`,
    `A${r},${r} 0 0 1 ${cx},${y}`,
    'Z',
  ].join(' ');
})();

const YOKE_PATH = `M ${MIC.yoke.left},${MIC.yoke.y - LIFT} A ${MIC.yoke.r},${MIC.yoke.r} 0 0 0 ${MIC.yoke.right},${MIC.yoke.y - LIFT}`;

const drawn = (p: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p });

/**
 * The finished BUILDING TOMORROW lock-up, with each part on its own progress
 * value so a slide can construct it in whatever order it needs. The geometry
 * is the same as the six-second reveal ends on, so the two always agree.
 *
 * `x` and `y` place the centre of the lock-up; `scale` sizes it.
 */
export const BuildingTomorrowMark: React.FC<{
  base: number;
  outline: number;
  grille: number;
  line1: number;
  line2: number;
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
}> = ({ base, outline, grille, line1, line2, x = CX, y = MARK.cy, scale = 1, color = C.ivory }) => {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, '_');
  const b = MIC.base;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(${-CX} ${-MARK.cy})`}>
      <defs>
        <clipPath id={`${uid}-m1`}>
          <rect x="0" y={748 - 96 * line1} width={BT.W} height={96 * line1 + 4} />
        </clipPath>
        <clipPath id={`${uid}-m2`}>
          <rect x="0" y={864 - 96 * line2} width={BT.W} height={96 * line2 + 4} />
        </clipPath>
      </defs>

      <g id="bt-symbol" fill={color}>
        {base > 0 ? (
          <rect
            x={b.x + (b.w * (1 - base)) / 2}
            y={b.y - LIFT}
            width={b.w * base}
            height={b.h}
            rx={b.h / 2}
          />
        ) : null}

        {outline > 0 ? (
          <>
            <path d={CAPSULE_PATH} fill="none" stroke={color} strokeWidth={STROKE} {...drawn(outline)} />
            <path
              d={YOKE_PATH}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              {...drawn(outline)}
            />
            <rect
              x={CX - STROKE / 2}
              y={MIC.stemTop - LIFT}
              width={STROKE}
              height={(MIC.stemBottom - MIC.stemTop) * outline}
              rx={STROKE / 2}
            />
          </>
        ) : null}

        {grille > 0
          ? TOWERS.map((t) => {
              const h = (t.micBottom - t.micTop) * grille;
              return (
                <rect
                  key={t.micX}
                  x={t.micX - t.micW / 2}
                  y={t.micBottom - LIFT - h}
                  width={t.micW}
                  height={h}
                  rx={t.micW / 2}
                />
              );
            })
          : null}
      </g>

      <g id="bt-wordmark" fill={color}>
        {line1 > 0 ? (
          <g clipPath={`url(#${uid}-m1)`}>
            <text
              x={CX}
              y={748}
              textAnchor="middle"
              fontFamily={TYPE.family}
              fontSize={96}
              fontWeight={TYPE.weightBold}
              letterSpacing={9}
              fill={color}
            >
              BUILDING
            </text>
          </g>
        ) : null}
        {line2 > 0 ? (
          <g clipPath={`url(#${uid}-m2)`}>
            <text
              x={CX}
              y={864}
              textAnchor="middle"
              fontFamily={TYPE.family}
              fontSize={96}
              fontWeight={TYPE.weightBold}
              letterSpacing={9}
              fill={color}
            >
              TOMORROW
            </text>
          </g>
        ) : null}
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ render */

export const BuildingTomorrowLogo: React.FC<{
  frame: number;
  /** null renders the mark on transparency, for the still export. */
  background?: string | null;
}> = ({ frame, background = C.terracotta }) => {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, '_');
  const f = Math.min(frame, BT.DURATION);

  /* stage 1 — a conversation begins */
  const dots = TOWERS.map((t, i) => {
    const inAt = i * 3;
    const p = ramp(f, inAt, 7);
    // one gentle rise and settle each, staggered; never a repeated bounce
    const talk = Math.sin(Math.PI * ramp(f, 12 + i * 3, 9, EASE_IO)) * 16;
    return { p, dy: -22 * (1 - p) - talk };
  });

  /* the ground arrives under them */
  const settle = ramp(f, 18, 18, EASE_IO);
  const groupY = lerp(-110, 0, settle);

  /* stage 2 — ideas take shape */
  const grow = TOWERS.map((_, i) => ramp(f, 22 + i * 4, 16));
  const foundation1 = ramp(f, 20, 14);

  /* stage 3 — building tomorrow */
  const foundation2 = ramp(f, 48, 14);
  const low = ramp(f, 48, 18);
  const tall = ramp(f, 54, 20);
  const path = ramp(f, 62, 16);

  /* stage 4 — the city becomes a voice */
  const morph = ramp(f, 78, 26, EASE_IO);
  const windowsOut = 1 - ramp(f, 78, 10);
  const pathOut = 1 - ramp(f, 78, 10);
  const armsOut = 1 - ramp(f, 80, 12);
  const capsule = ramp(f, 86, 18);
  const yoke = ramp(f, 86, 20);
  const stem = ramp(f, 100, 11);

  /* stage 5 — the name arrives */
  const lift = ramp(f, 111, 15, EASE_IO);
  const line1 = ramp(f, 122, 12);
  const line2 = ramp(f, 127, 12);

  const symbolY = groupY - LIFT * lift;

  /* the foundation line becomes the microphone's base */
  const fx1 = lerp(lerp(790, 690, foundation2), MIC.base.x, morph);
  const fx2 = lerp(lerp(1130, 1230, foundation2), MIC.base.x + MIC.base.w, morph);
  const fy = lerp(BASE_Y - 5, MIC.base.y, morph);
  const fh = lerp(10, MIC.base.h, morph);
  const fw = Math.max(0, (fx2 - fx1) * foundation1);

  /* the capsule opens out from the grille it will hold */
  const gTop = Math.min(...TOWERS.map((t) => t.micTop));
  const gLeft = TOWERS[0].micX - TOWERS[0].micW / 2;
  const gRight = TOWERS[2].micX + TOWERS[2].micW / 2;
  const gBottom = Math.max(...TOWERS.map((t) => t.micBottom));
  const cap = {
    x: lerp(gLeft, MIC.capsule.x, capsule),
    y: lerp(gTop, MIC.capsule.y, capsule),
    w: lerp(gRight - gLeft, MIC.capsule.w, capsule),
    h: lerp(gBottom - gTop, MIC.capsule.h, capsule),
  };

  const yokePath = `M ${MIC.yoke.left},${MIC.yoke.y} A ${MIC.yoke.r},${MIC.yoke.r} 0 0 0 ${MIC.yoke.right},${MIC.yoke.y}`;

  return (
    <svg
      viewBox={`0 0 ${BT.W} ${BT.H}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id={`${uid}-l1`}>
          <rect x="0" y={748 - 96 * line1} width={BT.W} height={96 * line1 + 4} />
        </clipPath>
        <clipPath id={`${uid}-l2`}>
          <rect x="0" y={864 - 96 * line2} width={BT.W} height={96 * line2 + 4} />
        </clipPath>
      </defs>

      <g id="bt-background">
        {background ? <rect x="0" y="0" width={BT.W} height={BT.H} fill={background} /> : null}
      </g>

      <g
        id="bt-mark"
        transform={`translate(${CX} ${BT.H / 2}) scale(${SCALE}) translate(${-CX} ${-BT.H / 2})`}
      >
      <g id="bt-symbol" transform={`translate(0 ${symbolY})`} fill={C.ivory}>
        {/* the ground line, which becomes the microphone's base */}
        {fw > 0 ? <rect x={fx1} y={fy} width={fw} height={fh} rx={fh / 2} /> : null}

        {/* the two outer forms, curving away as the yoke takes over */}
        {low > 0 && armsOut > 0 ? (
          <rect
            x={lerp(LOW.x, MIC.yoke.left - 30, 1 - armsOut)}
            y={BASE_Y - LOW.h * low}
            width={LOW.w * (0.4 + 0.6 * armsOut)}
            height={LOW.h * low}
            rx={LOW.rx}
            opacity={armsOut}
          />
        ) : null}
        {tall > 0 && armsOut > 0 ? (
          <rect
            x={lerp(TALL.x, MIC.yoke.right - 30, 1 - armsOut)}
            y={BASE_Y - TALL.h * tall}
            width={TALL.w * (0.4 + 0.6 * armsOut)}
            height={TALL.h * tall}
            rx={TALL.rx}
            opacity={armsOut}
          />
        ) : null}

        {/* the path between them */}
        {path > 0 && pathOut > 0 ? (
          <g opacity={pathOut}>
            <path
              d={`M 740,${BASE_Y + 46} Q 960,${BASE_Y + 76} 1185,${BASE_Y + 46}`}
              fill="none"
              stroke={C.ivory}
              strokeWidth={6}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - path}
            />
            <circle cx={740} cy={BASE_Y + 46} r={9 * path} />
            <circle cx={1185} cy={BASE_Y + 46} r={9 * path} />
          </g>
        ) : null}

        {/* the microphone capsule, opening around the grille */}
        {capsule > 0 ? (
          <rect
            x={cap.x}
            y={cap.y}
            width={cap.w}
            height={cap.h}
            rx={lerp(20, MIC.capsule.rx, capsule)}
            fill="none"
            stroke={C.ivory}
            strokeWidth={STROKE}
            opacity={capsule}
          />
        ) : null}

        {/* the U-shaped support */}
        {yoke > 0 ? (
          <path
            d={yokePath}
            fill="none"
            stroke={C.ivory}
            strokeWidth={STROKE}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - yoke}
          />
        ) : null}

        {/* the stem */}
        {stem > 0 ? (
          <rect
            x={CX - STROKE / 2}
            y={MIC.stemTop}
            width={STROKE}
            height={(MIC.stemBottom - MIC.stemTop) * stem}
            rx={STROKE / 2}
          />
        ) : null}

        {/* the three shapes: dot, then tower, then grille bar */}
        {TOWERS.map((t, i) => {
          const g = grow[i];
          const d = dots[i];
          if (d.p <= 0) return null;

          // dot -> tower. The dot scales in, then stretches upward off the
          // ground line, so there is never a pop.
          const dotD = DOT_R * 2 * d.p;
          const w = lerp(dotD, TOWER_W, g);
          const h = lerp(dotD, t.h, g);
          const dy = d.dy * (1 - g);

          // tower -> grille bar
          const mw = lerp(w, t.micW, morph);
          const mx = lerp(t.dotX, t.micX, morph) - mw / 2;
          const my = lerp(BASE_Y - h, t.micTop, morph) + dy;
          const mh = lerp(h, t.micBottom - t.micTop, morph);

          return <rect key={t.dotX} x={mx} y={my} width={mw} height={mh} rx={mw / 2} />;
        })}

        {/* windows, cut back out of the towers */}
        {windowsOut > 0
          ? WINDOWS.map((wd, i) => {
              const on = ramp(f, 34 + (i % 4) * 2, 10) * windowsOut;
              if (on <= 0) return null;
              return (
                <rect
                  key={i}
                  x={wd.x}
                  y={wd.y}
                  width={WIN}
                  height={WIN}
                  rx={5}
                  fill={background ?? C.terracotta}
                  opacity={on}
                />
              );
            })
          : null}
      </g>

      <g id="bt-wordmark" fill={C.ivory}>
        {line1 > 0 ? (
          <g clipPath={`url(#${uid}-l1)`}>
            <text
              x={CX}
              y={748}
              textAnchor="middle"
              fontFamily={TYPE.family}
              fontSize={96}
              fontWeight={TYPE.weightBold}
              letterSpacing={9}
              fill={C.ivory}
            >
              BUILDING
            </text>
          </g>
        ) : null}
        {line2 > 0 ? (
          <g clipPath={`url(#${uid}-l2)`}>
            <text
              x={CX}
              y={864}
              textAnchor="middle"
              fontFamily={TYPE.family}
              fontSize={96}
              fontWeight={TYPE.weightBold}
              letterSpacing={9}
              fill={C.ivory}
            >
              TOMORROW
            </text>
          </g>
        ) : null}
      </g>
      </g>
    </svg>
  );
};
