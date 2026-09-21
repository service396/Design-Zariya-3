import React from 'react';
import { ramp, EASE_OUT } from './motion';
import { STAGE, STROKE, C } from './tokens';

/**
 * A stroke that draws itself on.
 * pathLength=1 normalises every path so a long wall and a short mullion
 * take exactly the frames they are given, regardless of real length.
 */
export const DrawPath: React.FC<{
  d: string;
  frame: number;
  at?: number;
  dur?: number;
  color?: string;
  width?: number;
  opacity?: number;
  dash?: string;
  cap?: 'round' | 'butt' | 'square';
}> = ({
  d,
  frame,
  at = 0,
  dur = 24,
  color = C.terracotta,
  width = STROKE.line,
  opacity = 1,
  dash,
  cap = 'round',
}) => {
  const p = ramp(frame, at, dur, EASE_OUT);
  if (p <= 0) return null;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap={cap}
      strokeLinejoin="round"
      opacity={opacity}
      pathLength={1}
      strokeDasharray={dash ?? 1}
      strokeDashoffset={dash ? undefined : 1 - p}
      vectorEffect="non-scaling-stroke"
    />
  );
};

/** A run of strokes that begin together with small offsets. */
export const DrawSet: React.FC<{
  paths: { d: string; at?: number; dur?: number; width?: number; opacity?: number }[];
  frame: number;
  at?: number;
  step?: number;
  dur?: number;
  color?: string;
  width?: number;
}> = ({ paths, frame, at = 0, step = 2, dur = 24, color, width }) => (
  <>
    {paths.map((p, i) => (
      <DrawPath
        key={i}
        d={p.d}
        frame={frame}
        at={at + (p.at ?? i * step)}
        dur={p.dur ?? dur}
        color={color}
        width={p.width ?? width}
        opacity={p.opacity}
      />
    ))}
  </>
);

/** A shape that fades its fill in once its outline has been drawn. */
export const FillShape: React.FC<{
  d: string;
  frame: number;
  at?: number;
  dur?: number;
  fill?: string;
  opacity?: number;
}> = ({ d, frame, at = 0, dur = 18, fill = 'rgba(182,99,67,0.1)', opacity = 1 }) => {
  const p = ramp(frame, at, dur);
  if (p <= 0) return null;
  return <path d={d} fill={fill} stroke="none" opacity={p * opacity} />;
};

/** Full-stage SVG canvas in 1920x1080 coordinates. */
export const Canvas: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${STAGE.W} ${STAGE.H}`}
    preserveAspectRatio="xMidYMid meet"
    style={{ position: 'absolute', inset: 0, ...style }}
  >
    {children}
  </svg>
);
