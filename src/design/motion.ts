import { interpolate, Easing } from 'remotion';

/** Smooth, no overshoot. Everything in this deck uses one of these two. */
export const EASE_OUT = Easing.bezier(0.22, 0.85, 0.24, 1);
export const EASE_IN_OUT = Easing.bezier(0.5, 0.05, 0.2, 1);

/** 0 → 1 over [at, at+dur], clamped both ends. */
export const ramp = (frame: number, at: number, dur: number, easing = EASE_OUT) =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Seamless ambient oscillation. Built from sine so the value and its slope
 * match at the seam. Returns -1..1.
 */
export const wave = (frame: number, period: number, phase = 0) =>
  Math.sin(((frame / period) + phase) * Math.PI * 2);

/** Seamless 0..1 oscillation. */
export const pulse = (frame: number, period: number, phase = 0) =>
  (wave(frame, period, phase) + 1) / 2;

/**
 * A looping 0..1 sweep that never snaps back on screen, for things that
 * travel across and are masked out at both ends (a boat, a pedestrian).
 */
export const travel = (frame: number, period: number, phase = 0) =>
  (((frame / period) + phase) % 1 + 1) % 1;

/** Entrance transform: a short rise with opacity, no bounce. */
export const riseIn = (frame: number, at: number, dur: number, distance = 16) => {
  const p = ramp(frame, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
};

export const fadeIn = (frame: number, at: number, dur: number) => ({
  opacity: ramp(frame, at, dur),
});
