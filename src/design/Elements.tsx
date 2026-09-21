import React from 'react';
import { interpolate } from 'remotion';
import { C, SAFE, STAGE, STROKE, TYPE } from './tokens';
import { ramp, EASE_IN_OUT } from './motion';

/**
 * Shared pieces for the ELEMENTS section (slides 24 to 34).
 *
 * Every photograph in this section is a Higgsfield-generated concept visual
 * of a fictional person or room. None depicts an appointed expert or an
 * Ambuja Neotia property. See `art/elements.ts` for the asset register.
 */

export type Rect = { x: number; y: number; w: number; h: number };
export const FULL: Rect = { x: 0, y: 0, w: STAGE.W, h: STAGE.H };

/**
 * The frame slide 24 draws and slide 25 opens its photograph from, so the
 * outline on one becomes the window on the next.
 */
export const THRESHOLD: Rect = { x: 1268, y: 186, w: 536, h: 708 };

/** CSS clip-path inset that grows from `from` to the full stage as p goes 0 → 1. */
export const insetFrom = (from: Rect, p: number) => {
  const top = from.y * (1 - p);
  const left = from.x * (1 - p);
  const right = (STAGE.W - from.x - from.w) * (1 - p);
  const bottom = (STAGE.H - from.y - from.h) * (1 - p);
  return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
};

/**
 * A full-bleed photograph.
 *
 * `reveal` drives the entrance: a rectangular mask from `from` when given,
 * otherwise a plain fade. `push` is a bounded scale in [0, 0.02] that the
 * caller eases in and lets settle — never a continuous zoom.
 */
export const FullPhoto: React.FC<{
  src: string;
  alt: string;
  reveal: number;
  from?: Rect;
  focus?: string;
  push?: number;
  origin?: string;
}> = ({ src, alt, reveal, from, focus = '50% 50%', push = 0, origin = '60% 50%' }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      clipPath: from ? insetFrom(from, reveal) : undefined,
      opacity: from ? 1 : reveal,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: focus,
        display: 'block',
        transform: `scale(${1 + Math.min(0.02, Math.max(0, push))})`,
        transformOrigin: origin,
      }}
    />
  </div>
);

export type Tone = 'light' | 'dark';

/** Ink for text sitting on a photograph of the given tone. */
export const INK = {
  light: { head: C.charcoal, accent: C.terracottaDeep, body: C.charcoal, soft: C.charcoalSoft, rule: C.terracotta },
  dark: { head: C.ivory, accent: C.terracottaLift, body: C.ivory, soft: 'rgba(244,240,231,0.82)', rule: C.ivory },
} as const;

/**
 * A restrained local gradient behind left-hand text. Strong enough to hold
 * contrast at presentation scale, gone before it reaches the subject.
 */
export const Scrim: React.FC<{ tone: Tone; strength?: number; reach?: number; opacity?: number }> = ({
  tone,
  strength = 0.72,
  reach = 58,
  opacity = 1,
}) => {
  const rgb = tone === 'light' ? '244,240,231' : '38,34,30';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        background: `linear-gradient(90deg, rgba(${rgb},${strength}) 0%, rgba(${rgb},${strength * 0.9}) ${reach * 0.42}%, rgba(${rgb},0) ${reach}%)`,
      }}
    />
  );
};

/** A framed photographic inset. No heavy border, no shadow. */
export const Inset: React.FC<{
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  on: number;
  rise?: number;
  focus?: string;
  tone: Tone;
}> = ({ src, alt, x, y, w, h, on, rise = 14, focus = '50% 50%', tone }) =>
  on <= 0 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        overflow: 'hidden',
        opacity: on,
        transform: `translateY(${(1 - on) * rise}px)`,
        outline: `1px solid ${tone === 'dark' ? 'rgba(244,240,231,0.45)' : 'rgba(244,240,231,0.85)'}`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, display: 'block' }}
      />
    </div>
  );

/**
 * One element, as slides 28, 29 and 30 present it: a large interview
 * photograph, the numbered title and question on the left, one detail inset.
 * Everything lands inside 1.2 seconds and then holds.
 */
export const ElementSlide: React.FC<{
  frame: number;
  number: string;
  title: string;
  question: string;
  body: string;
  photo: { src: string; alt: string; focus?: string };
  inset: { src: string; alt: string; x: number; y: number; w: number; h: number; focus?: string };
  tone: Tone;
  /** Reveal the photograph through an architectural mask instead of a fade. */
  mask?: boolean;
  /** Draw three short horizontal lines under the title instead of one. */
  sound?: boolean;
  scrim?: number;
}> = ({ frame, number, title, question, body, photo, inset, tone, mask = false, sound = false, scrim = 0.72 }) => {
  const ink = INK[tone];
  const image = ramp(frame, 0, 16);
  const head = ramp(frame, 3, 12);
  const accent = ramp(frame, 10, 12);
  const q = ramp(frame, 14, 12);
  const b = ramp(frame, 18, 12);
  const ins = ramp(frame, 22, 12);

  // an architectural mask opens from a tall central bay out to the full frame
  const bay: Rect = { x: 760, y: 120, w: 400, h: 840 };

  return (
    <>
      <FullPhoto
        src={photo.src}
        alt={photo.alt}
        focus={photo.focus}
        reveal={mask ? interpolate(image, [0, 1], [0, 1], { easing: EASE_IN_OUT }) : image}
        from={mask ? bay : undefined}
      />
      <Scrim tone={tone} strength={scrim} opacity={image} />

      <div style={{ position: 'absolute', left: SAFE, top: 250, width: 760 }}>
        <div
          style={{
            fontFamily: TYPE.family,
            fontSize: 26,
            fontWeight: TYPE.weightBold,
            letterSpacing: '0.24em',
            color: ink.accent,
            opacity: head,
          }}
        >
          {number} /
        </div>
        <h1
          style={{
            margin: '14px 0 0',
            fontFamily: TYPE.family,
            fontSize: 58,
            fontWeight: TYPE.weightBold,
            letterSpacing: '0.1em',
            lineHeight: 1.14,
            textTransform: 'uppercase',
            color: ink.head,
            opacity: head,
            transform: `translateY(${(1 - head) * 12}px)`,
          }}
        >
          {title}
        </h1>

        {/* the accent: one line, or three for sound, drawn once and then still */}
        <svg width={200} height={sound ? 40 : 12} style={{ display: 'block', marginTop: 26, overflow: 'visible' }}>
          {(sound ? [0, 1, 2] : [0]).map((i) => {
            const len = sound ? [132, 88, 112][i] : 120;
            const p = ramp(frame, 10 + i * 3, 11);
            return (
              <line
                key={i}
                x1={0}
                y1={2 + i * 14}
                x2={len * p}
                y2={2 + i * 14}
                stroke={ink.rule}
                strokeWidth={STROKE.line}
                strokeLinecap="round"
                opacity={(sound ? [0.85, 0.6, 0.45][i] : 0.85) * accent}
              />
            );
          })}
        </svg>

        <p
          style={{
            margin: '34px 0 0',
            fontFamily: TYPE.family,
            fontSize: 40,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.34,
            color: ink.body,
            opacity: q,
            transform: `translateY(${(1 - q) * 10}px)`,
          }}
        >
          {question}
        </p>
        <p
          style={{
            margin: '28px 0 0',
            fontFamily: TYPE.family,
            fontSize: 28,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.5,
            color: ink.soft,
            opacity: b,
          }}
        >
          {body}
        </p>
      </div>

      <Inset {...inset} on={ins} tone={tone} />
    </>
  );
};
