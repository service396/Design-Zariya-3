import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, LINE, SAFE, STROKE, TYPE } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { Heading, Em } from '../design/Type';
import { cornerDoorway } from '../art/frames';

/**
 * Slide 2 — the brief.
 * Copy is fixed. The paragraph resolves as one block; it is never revealed
 * word by word.
 */

const LINES: React.ReactNode[] = [
  <>Build Design Zariya into a distinctive, long-term,</>,
  <>video-first editorial platform that tells <Em>human,</Em></>,
  <><Em>emotion-led stories</Em> about how thoughtfully designed</>,
  <>spaces shape everyday life, creating original content</>,
  <>formats and a recognisable storytelling language</>,
  <>where people and experiences lead, <Em>spaces enable,</Em></>,
  <>and the <Em>brand remains understated.</Em></>,
];

export const S02Brief: React.FC<SlideProps> = ({ frame, global }) => {
  const art = cornerDoorway();
  const body = ramp(frame, 6, 18);
  const rule = ramp(frame, 4, 16);

  // one faint light patch, travelling slowly inside the opening
  const skew = -150 + pulse(global, 320) * 54;
  const lightOpacity = 0.1 + pulse(global, 320, 0.25) * 0.06;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <Canvas>
        <FillShape d={art.glass} frame={frame} at={22} dur={20} fill="rgba(182,99,67,0.08)" />
        <path d={art.light(skew)} fill={C.terracottaLift} opacity={lightOpacity * ramp(frame, 30, 20)} />
        {art.plane.map((d, i) => (
          <DrawPath key={`p${i}`} d={d} frame={frame} at={2 + i * 1.5} dur={28} width={STROKE.fine} opacity={0.85} />
        ))}
        {art.opening.map((d, i) => (
          <DrawPath key={`o${i}`} d={d} frame={frame} at={8 + i * 2} dur={26} width={STROKE.line} />
        ))}
        {art.reveal.map((d, i) => (
          <DrawPath key={`r${i}`} d={d} frame={frame} at={20 + i * 2} dur={20} width={STROKE.fine} opacity={0.7} />
        ))}
        {/* the margin: the foundation line from slide 1, now defining the page */}
        <DrawPath d={`M${SAFE},${LINE.baseY} L1940,${LINE.baseY}`} frame={frame} at={0} dur={22} width={STROKE.fine} opacity={0.5} />
      </Canvas>

      <div style={{ position: 'absolute', left: SAFE, top: 128 }}>
        <Heading>The Brief</Heading>
      </div>
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 218,
          width: 128 * rule,
          height: 2,
          background: C.terracotta,
          opacity: 0.8,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 286,
          width: 1200,
          fontFamily: TYPE.family,
          fontWeight: TYPE.weightLight,
          fontSize: 40,
          lineHeight: 1.5,
          color: C.charcoal,
          ...riseIn(frame, 6, 18, 14),
          opacity: body,
        }}
      >
        {LINES.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
