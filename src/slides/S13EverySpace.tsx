import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Canvas } from '../design/Draw';
import { Heading } from '../design/Type';

/**
 * Slide 13 — every space started with a purpose.
 * Four equal columns under one connecting line. Nothing here is a presenter
 * build: the heading, the line, the four columns and the closing sentence all
 * arrive on entry, the closing line last so the eye still reads downward.
 */

const COLS = [
  ['The need', 'What did the city need at that moment?'],
  ['The vision', 'Who imagined the possibilities?'],
  ['The making', 'What decisions and challenges shaped the place?'],
  ['The impact', 'What has it made possible for people?'],
];

const GUTTER = 44;
const COL_W = (STAGE.W - SAFE * 2 - GUTTER * 3) / 4; // 386
const LINE_Y = 468;

export const S13EverySpace: React.FC<SlideProps> = ({ frame }) => {
  const line = ramp(frame, 8, 21);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 142, ...riseIn(frame, 0, 12, 10) }}>
        <Heading style={{ lineHeight: 1.18 }}>
          Every Space Started
          <br />
          With a Purpose
        </Heading>
      </div>

      <Canvas>
        <line
          x1={SAFE}
          y1={LINE_Y}
          x2={SAFE + (STAGE.W - SAFE * 2) * line}
          y2={LINE_Y}
          stroke={C.terracotta}
          strokeWidth={STROKE.fine}
          opacity={0.8}
        />
        {COLS.map((_, i) => {
          const x = SAFE + i * (COL_W + GUTTER);
          const on = ramp(frame, 14 + i * 4, 12);
          if (on <= 0) return null;
          return (
            <circle key={i} cx={x} cy={LINE_Y} r={5.5} fill={C.ivory} stroke={C.terracotta} strokeWidth={STROKE.line} opacity={on} />
          );
        })}
      </Canvas>

      {COLS.map(([label, question], i) => {
        const x = SAFE + i * (COL_W + GUTTER);
        const at = 14 + i * 4;
        return (
          <div key={label} style={{ position: 'absolute', left: x, top: LINE_Y + 42, width: COL_W, ...riseIn(frame, at, 14, 12) }}>
            <div
              style={{
                fontFamily: TYPE.family,
                fontSize: 26,
                fontWeight: TYPE.weightBold,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: C.terracotta,
              }}
            >
              {label}
            </div>
            <div
              style={{
                marginTop: 26,
                fontFamily: TYPE.family,
                fontSize: 36,
                fontWeight: TYPE.weightLight,
                lineHeight: 1.4,
                color: C.charcoal,
              }}
            >
              {question}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 812,
          width: 1280,
          fontFamily: TYPE.family,
          fontSize: 34,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.45,
          color: C.charcoalSoft,
          ...riseIn(frame, 34, 14, 10),
        }}
      >
        Told by the people who imagined, built and continue to shape these spaces.
      </div>
    </AbsoluteFill>
  );
};
