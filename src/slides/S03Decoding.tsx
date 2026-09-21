import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STROKE, TYPE } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath } from '../design/Draw';
import { Heading, Label } from '../design/Type';
import { threeBay, bayAccent, BAYS, BAY_TOP, BAY_BOT } from '../art/frames';

const SPACES = [
  'Homes.', 'Hotels.', 'Hospitals.', 'Restaurants.', 'Schools.',
  'Retail destinations.', 'Workplaces.', 'Healthcare environments.',
  'Community spaces.', 'Hospitality destinations.',
];

const COPY_TOP = 442;

export const S03Decoding: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const frameworkPaths = threeBay();
  const sway = pulse(global, 300);

  const bodyStyle = (i: number): React.CSSProperties => ({
    position: 'absolute',
    left: BAYS[i].x + 30,
    top: COPY_TOP,
    width: BAYS[i].w - 60,
    fontFamily: TYPE.family,
    fontWeight: TYPE.weightLight,
    fontSize: 33,
    lineHeight: 1.46,
    color: C.charcoal,
    ...riseIn(since(i + 1), 0, 17, 14),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <Canvas>
        {frameworkPaths.map((d, i) => (
          <DrawPath key={i} d={d} frame={frame} at={4 + i * 1.4} dur={26} width={STROKE.fine} opacity={0.75} />
        ))}
        {/* the live bay gets a restrained accent, not a card */}
        {build > 0 &&
          bayAccent(build - 1).map((d, i) => (
            <DrawPath key={`a${i}`} d={d} frame={since(build)} at={i * 2} dur={16} width={STROKE.bold} color={C.terracotta} />
          ))}
        {/* the single ambient movement: the connecting soffit breathing */}
        <line
          x1={BAYS[0].x - 18}
          y1={BAY_TOP - 13 - sway * 2}
          x2={BAYS[2].x + BAYS[2].w + 18}
          y2={BAY_TOP - 13 - sway * 2}
          stroke={C.terracotta}
          strokeWidth={STROKE.fine}
          opacity={ramp(frame, 8, 20) * (0.42 + sway * 0.22)}
        />
      </Canvas>

      <div style={{ position: 'absolute', left: SAFE, top: 112 }}>
        <Heading>Decoding the Brief</Heading>
      </div>
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 206,
          width: 900,
          fontFamily: TYPE.family,
          fontWeight: TYPE.weightLight,
          fontSize: 36,
          color: C.charcoalSoft,
          ...riseIn(frame, 3, 15, 12),
        }}
      >
        Breaking down the brief into three essential parts.
      </div>

      {['Guideline', 'Spaces', 'Purpose'].map((l, i) => (
        <div
          key={l}
          style={{
            position: 'absolute',
            left: BAYS[i].x + 30,
            top: BAY_TOP + 62,
            ...riseIn(frame, 10 + i * 4, 15, 10),
          }}
        >
          <Label color={build === i + 1 ? C.terracottaDeep : C.terracotta}>{l}</Label>
        </div>
      ))}

      {since(1) > -1e8 && (
        <div style={bodyStyle(0)}>
          Most brands tell stories about themselves. We want to tell stories about the lives our
          spaces quietly make possible.
        </div>
      )}

      {since(2) > -1e8 && (
        <div style={{ ...bodyStyle(1), display: 'flex', gap: 34 }}>
          <div style={{ flex: 1 }}>
            {SPACES.slice(0, 5).map((s) => (
              <div key={s} style={{ marginBottom: 7 }}>{s}</div>
            ))}
          </div>
          <div style={{ flex: 1.18 }}>
            {SPACES.slice(5).map((s) => (
              <div key={s} style={{ marginBottom: 7 }}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {since(3) > -1e8 && (
        <div style={bodyStyle(2)}>
          Design Zariya explores the spaces that shape our memories, relationships, and sense of
          belonging.
        </div>
      )}
    </AbsoluteFill>
  );
};
