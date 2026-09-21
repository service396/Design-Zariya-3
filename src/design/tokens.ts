/**
 * Design Zariya — ideation deck tokens.
 * Colours are the approved provisional set, cross-checked against the rust
 * sampled from the supplied brief PDF (#B55D3F) and the opening animation.
 */

export const C = {
  ivory: '#F4F0E7',
  ivoryDeep: '#E9E2D4',
  ivoryLift: '#FBF8F2',
  terracotta: '#B66343',
  terracottaDeep: '#91472F',
  terracottaLift: '#C97C5D',
  charcoal: '#302D29',
  charcoalSoft: '#5A544C',
} as const;

/** Muted fills used sparingly inside line-drawn forms to build depth. */
export const FILL = {
  shade1: 'rgba(182, 99, 67, 0.07)',
  shade2: 'rgba(182, 99, 67, 0.13)',
  shade3: 'rgba(182, 99, 67, 0.21)',
  glass: 'rgba(145, 71, 47, 0.10)',
  ivoryOnRust: 'rgba(244, 240, 231, 0.10)',
  ivoryOnRust2: 'rgba(244, 240, 231, 0.17)',
} as const;

export const STAGE = { W: 1920, H: 1080, FPS: 30 } as const;

/** Safe margin. Nothing meaningful sits outside this. */
export const SAFE = 116;

/**
 * Shared geometry that carries the recurring architectural line across the
 * deck. Matched positions, not morphs.
 */
export const LINE = {
  /** Ground plane: slide 1 foundation, 7 city ground, 8 vignette base, 9 floor. */
  baseY: 806,
  /** Vertical margin: slide 2 margin, 3 framework, 4 principle connector. */
  marginX: SAFE,
  /** Horizontal rule under a heading. */
  headRuleY: 250,
} as const;

export const TYPE = {
  family: "'Montserrat', system-ui, -apple-system, 'Segoe UI', sans-serif",
  statement: 96,
  statementTight: 84,
  heading: 60,
  headingSm: 50,
  body: 38,
  bodySm: 34,
  label: 28,
  labelSm: 24,
  weightLight: 300,
  weightRegular: 400,
  weightBold: 600,
} as const;

export const STROKE = {
  hair: 1.6,
  fine: 2.2,
  line: 3,
  bold: 4,
} as const;

/** Motion durations in frames at 30fps. */
export const D = {
  textIn: 13,
  textStagger: 5,
  reveal: 42,
  revealLong: 54,
  slideChange: 24,
  ambient: 300,
} as const;
