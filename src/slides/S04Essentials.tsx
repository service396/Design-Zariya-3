import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STROKE, TYPE } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { Heading } from '../design/Type';
import { PRINCIPLE_Y, MARKER_X, marginDetail } from '../art/frames';

const PRINCIPLES = [
  'We tell stories.',
  'Every story should begin with human emotion.',
  'What quietly became possible because this place existed?',
  "People don't fall in love with buildings, but with their lives inside them.",
];

export const S04Essentials: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const detail = marginDetail();
  const leaf = pulse(global, 330);

  /**
   * Build 0 is the heading alone. Principle i arrives on build i + 1, and the
   * spine extends only as far as whatever has just been revealed.
   */
  const shown = build - 1;
  const spineTop = PRINCIPLE_Y[0] - 40;
  const spineEnd = shown >= 0 ? PRINCIPLE_Y[shown] + 54 : spineTop;
  const prevEnd = shown > 0 ? PRINCIPLE_Y[shown - 1] + 54 : spineTop;
  const y2 = prevEnd + (spineEnd - prevEnd) * ramp(since(build), 0, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <Canvas>
        {/* peripheral architectural detail, the only ambient movement here */}
        <g opacity={0.5}>
          {detail.frame.map((d, i) => (
            <DrawPath key={i} d={d} frame={frame} at={10 + i * 1.2} dur={30} width={STROKE.fine} />
          ))}
        </g>
        <FillShape d={detail.tree.fill} frame={frame} at={30} fill="rgba(182,99,67,0.11)" />
        {detail.tree.trunk.map((d, i) => (
          <DrawPath key={`t${i}`} d={d} frame={frame} at={24 + i} dur={18} width={STROKE.fine} />
        ))}
        <g
          style={{
            transform: `rotate(${leaf * 0.5 - 0.25}deg)`,
            transformOrigin: `${1770}px ${940}px`,
          }}
        >
          {detail.tree.canopy.map((d, i) => (
            <DrawPath key={`c${i}`} d={d} frame={frame} at={28 + i * 1.5} dur={20} width={STROKE.fine} />
          ))}
        </g>

        {/* the sequence connecting the principles */}
        <line
          x1={MARKER_X}
          y1={PRINCIPLE_Y[0] - 40}
          x2={MARKER_X}
          y2={y2}
          stroke={C.terracotta}
          strokeWidth={STROKE.fine}
          opacity={0.85}
        />
        {PRINCIPLES.map((_, i) => {
          const on = ramp(since(i + 1), 0, 14);
          if (on <= 0) return null;
          return (
            <circle
              key={i}
              cx={MARKER_X}
              cy={PRINCIPLE_Y[i] + 4}
              r={6}
              fill={C.ivory}
              stroke={C.terracotta}
              strokeWidth={STROKE.line}
              opacity={on}
            />
          );
        })}
      </Canvas>

      <div style={{ position: 'absolute', left: SAFE, top: 112 }}>
        <Heading>The Absolute Essentials</Heading>
      </div>
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 202,
          fontFamily: TYPE.family,
          fontWeight: TYPE.weightLight,
          fontSize: 36,
          color: C.charcoalSoft,
          ...riseIn(frame, 3, 15, 12),
        }}
      >
        Four principles that guide our thinking.
      </div>

      {PRINCIPLES.map((p, i) => {
        const s = since(i + 1);
        if (s <= -1e8) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: MARKER_X + 54, top: PRINCIPLE_Y[i] - 34, width: 1400 }}>
            <div
              style={{
                fontFamily: TYPE.family,
                fontSize: 24,
                fontWeight: TYPE.weightBold,
                letterSpacing: '0.22em',
                color: C.terracotta,
                ...riseIn(s, 0, 13, 12),
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: TYPE.family,
                fontSize: 50,
                fontWeight: TYPE.weightLight,
                lineHeight: 1.22,
                color: C.charcoal,
                ...riseIn(s, 3, 15, 16),
              }}
            >
              {p}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
