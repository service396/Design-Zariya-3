import React from 'react';
import { C, TYPE, SAFE, STAGE } from './tokens';
import { ramp, riseIn } from './motion';

type TextProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  align?: 'left' | 'center';
};

const base = (align: 'left' | 'center' = 'left'): React.CSSProperties => ({
  fontFamily: TYPE.family,
  textAlign: align,
  margin: 0,
  WebkitFontSmoothing: 'antialiased',
});

/** Slide heading, e.g. THE BRIEF. */
export const Heading: React.FC<TextProps> = ({ children, style, color = C.terracottaDeep, align }) => (
  <h1
    style={{
      ...base(align),
      fontSize: TYPE.heading,
      fontWeight: TYPE.weightBold,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      lineHeight: 1.1,
      color,
      ...style,
    }}
  >
    {children}
  </h1>
);

/** The big centred statements. */
export const Statement: React.FC<TextProps> = ({ children, style, color = C.charcoal, align = 'center' }) => (
  <p
    style={{
      ...base(align),
      fontSize: TYPE.statement,
      fontWeight: TYPE.weightLight,
      letterSpacing: '-0.005em',
      lineHeight: 1.12,
      color,
      ...style,
    }}
  >
    {children}
  </p>
);

export const Body: React.FC<TextProps> = ({ children, style, color = C.charcoal, align }) => (
  <p
    style={{
      ...base(align),
      fontSize: TYPE.body,
      fontWeight: TYPE.weightLight,
      lineHeight: 1.45,
      color,
      ...style,
    }}
  >
    {children}
  </p>
);

/** Small uppercase supporting label. */
export const Label: React.FC<TextProps> = ({ children, style, color = C.terracotta, align }) => (
  <span
    style={{
      ...base(align),
      display: 'block',
      fontSize: TYPE.label,
      fontWeight: TYPE.weightBold,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </span>
);

/** Emphasis inside body copy. Weight, not colour, so contrast never drops. */
export const Em: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.terracottaDeep,
}) => <strong style={{ fontWeight: TYPE.weightBold, color }}>{children}</strong>;

/** Absolute box inside the safe area. */
export const Box: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  w?: number;
  style?: React.CSSProperties;
}> = ({ children, x = SAFE, y = SAFE, w, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w ?? STAGE.W - x - SAFE, ...style }}>
    {children}
  </div>
);

/**
 * The standing note on every slide that carries generated imagery.
 *
 * It sits low and quiet, in the same place on each slide, so a client reading
 * from the back of the room is never in doubt about which pictures are
 * documentary and which are illustrative.
 */
export const ReferenceNote: React.FC<{ frame: number; at?: number; color?: string }> = ({
  frame,
  at = 20,
  color = C.charcoalSoft,
}) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE,
      top: 1004,
      fontFamily: TYPE.family,
      fontSize: 19,
      fontWeight: TYPE.weightBold,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color,
      opacity: 0.58 * ramp(frame, at, 12),
    }}
  >
    Images are for reference only
  </div>
);

/**
 * The section header used by slides 8, 9 and 10, so CITIES, PLACES and
 * EXPERIENCES land in exactly the same place as the deck moves inward.
 */
export const SectionHeader: React.FC<{ children: React.ReactNode; frame: number }> = ({
  children,
  frame,
}) => (
  <div style={{ position: 'absolute', left: SAFE, top: 120, ...riseIn(frame, 0, 15, 12) }}>
    <Heading>{children}</Heading>
    <div
      style={{
        marginTop: 20,
        width: 120,
        height: 2,
        background: C.terracotta,
        opacity: 0.75 * ramp(frame, 6, 22),
      }}
    />
  </div>
);
