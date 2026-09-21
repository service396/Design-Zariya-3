import { line } from './prims';

/**
 * The conversation: two chairs facing each other across a low table, with a
 * podcast microphone standing on it. One architectural line drawing, drawn
 * once on slide 22 and reused as the schematic preview on slide 23 — the
 * portrait frames there are tighter views of this same geometry, never a
 * second drawing that could drift from it.
 *
 * Authored in a 720-wide box with the floor at y = 330. The microphone
 * deliberately echoes the Building Tomorrow mark: a capsule, a grille, a
 * yoke and a base.
 */

const FLOOR = 330;
const MID = 360;
const SEAT = 276;

/** Paths in draw order: the ground, the two places, the table, the microphone. */
export const podcastScene = (): string[] => [
  // the ground
  line(40, FLOOR, 680, FLOOR),

  // the chair on the left, facing in — back and rear leg are one line
  `M120,${FLOOR} L120,${SEAT} L113,190`,
  line(120, SEAT, 208, SEAT),
  `M202,${SEAT} L206,${FLOOR}`,

  // the chair on the right, facing in
  `M600,${FLOOR} L600,${SEAT} L607,190`,
  line(600, SEAT, 512, SEAT),
  `M518,${SEAT} L514,${FLOOR}`,

  // the table between them
  `M256,258 a104,17 0 1 0 208,0 a104,17 0 1 0 -208,0`,
  line(MID, 275, MID, 322),
  line(320, 322, 400, 322),

  // the microphone standing on it
  line(336, 252, 384, 252),
  line(MID, 252, MID, 184),
  `M360,109 a22,22 0 0 1 22,22 L382,161 a22,22 0 0 1 -44,0 L338,131 a22,22 0 0 1 22,-22 Z`,
  line(351, 124, 351, 168),
  line(369, 124, 369, 168),
  `M322,146 A38,38 0 0 0 398,146`,
];

/**
 * Views onto the same drawing. `full` is the whole conversation at 16:9; the
 * others are 9:16 details of it, each framed so nothing important is clipped
 * and no frame is mostly empty.
 */
export const PODCAST_VIEW = {
  full: [10, 23, 700, 394],
  mic: [310, 57, 100, 178],
  chair: [85, 126, 150, 267],
  table: [250, 80, 220, 391],
} as const;

export const viewBox = (v: readonly number[]) => v.join(' ');
