import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STROKE, TYPE, FILL } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { SectionHeader } from '../design/Type';
import {
  FLOOR, CEIL, BAY2, BAY3, shell2, shell3,
  yogaStudio, meetingRoom, office, studio, livingRoom, garden, restaurantRoom,
} from '../art/rooms';

/**
 * Slide 9 — the life within the space.
 * Three presenter-controlled scenes. The floor and the wall positions are
 * continuous; only furniture and figures are replaced.
 */

const ROOM_LABELS: [string, number][][] = [
  [['Yoga studio', BAY2[0].x + BAY2[0].w / 2], ['Meeting room', BAY2[1].x + BAY2[1].w / 2]],
  [['Office', BAY2[0].x + BAY2[0].w / 2], ['Creative studio', BAY2[1].x + BAY2[1].w / 2]],
  [
    ['Living room', BAY3[0].x + BAY3[0].w / 2],
    ['Garden', BAY3[1].x + BAY3[1].w / 2],
    ['Restaurant', BAY3[2].x + BAY3[2].w / 2],
  ],
];

const Strokes: React.FC<{ d: string[]; f: number; at?: number; step?: number; w?: number; o?: number }> = ({
  d, f, at = 0, step = 0.5, w = STROKE.fine, o = 1,
}) => (
  <>
    {d.map((p, i) => (
      <DrawPath key={i} d={p} frame={f} at={at + i * step} dur={18} width={w} opacity={o} />
    ))}
  </>
);

export const S09Life: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const sway = 12 + pulse(global, 300) * 9;
  const breath = pulse(global, 240) * 2.2;
  const lean = pulse(global, 360) * 2.4;
  const hand = pulse(global, 210) * 1.8;
  const leaf = pulse(global, 330) * 5;

  const f0 = frame;
  const f1 = since(1);
  const f2 = since(2);

  const yoga = yogaStudio(sway, breath);
  const meet = meetingRoom(lean);
  const off = office(lean);
  const stu = studio(hand);
  const living = livingRoom(lean);
  const gard = garden(leaf);
  const rest = restaurantRoom(lean);

  const wide = build >= 2;
  const sceneFrame = build === 0 ? f0 : build === 1 ? f1 : f2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, overflow: 'hidden' }}>
      <SectionHeader frame={f0}>Experiences</SectionHeader>
      <Canvas>
        {/* warm ground so the rooms feel inhabited rather than drafted */}
        <FillShape
          d={`M-20,${CEIL} L1940,${CEIL} L1940,${FLOOR} L-20,${FLOOR} Z`}
          frame={f0}
          at={2}
          dur={22}
          fill={FILL.shade1}
          opacity={0.7}
        />

        {/* structure: two bays for scenes A and B, three for scene C */}
        {!wide && <Strokes d={shell2()} f={f0} at={0} step={0.8} w={STROKE.line} />}
        {wide && <Strokes d={shell3()} f={f2} at={0} step={0.8} w={STROKE.line} />}

        {build === 0 && (
          <>
            <path d={yoga.shaft} fill={C.terracottaLift} opacity={0.09 * ramp(f0, 20, 20)} />
            <FillShape d={yoga.glass} frame={f0} at={14} fill={FILL.glass} />
            <Strokes d={yoga.structure} f={f0} at={10} />
            <g>
              {yoga.curtain.map((d, i) => (
                <DrawPath key={i} d={d} frame={f0} at={22 + i * 0.6} dur={16} width={STROKE.fine} opacity={0.85} />
              ))}
            </g>
            <Strokes d={yoga.people} f={f0} at={18} step={0.34} />
            <FillShape d={meet.tableFill} frame={f0} at={24} fill={FILL.shade2} />
            <Strokes d={meet.structure} f={f0} at={12} />
            <Strokes d={meet.people} f={f0} at={20} step={0.34} />
          </>
        )}

        {build === 1 && (
          <>
            <FillShape d={off.glass} frame={f1} at={6} fill={FILL.glass} />
            <Strokes d={off.structure} f={f1} at={2} />
            <Strokes d={off.people} f={f1} at={6} step={0.34} />
            <FillShape d={stu.boardFill} frame={f1} at={10} fill={FILL.shade1} />
            <Strokes d={stu.structure} f={f1} at={4} />
            <Strokes d={stu.people} f={f1} at={8} step={0.34} />
          </>
        )}

        {build === 2 && (
          <>
            <FillShape d={living.warm} frame={f2} at={10} fill={FILL.shade2} />
            <Strokes d={living.structure} f={f2} at={4} />
            <Strokes d={living.people} f={f2} at={8} step={0.34} />
            {gard.fills.map((d, i) => (
              <FillShape key={i} d={d} frame={f2} at={10 + i * 2} fill={FILL.shade2} />
            ))}
            <Strokes d={gard.structure} f={f2} at={6} />
            <Strokes d={gard.canopy} f={f2} at={10} />
            <Strokes d={gard.people} f={f2} at={12} step={0.34} />
            <FillShape d={rest.glass} frame={f2} at={12} fill={FILL.glass} />
            <Strokes d={rest.structure} f={f2} at={6} />
            <Strokes d={rest.people} f={f2} at={10} step={0.34} />
          </>
        )}
      </Canvas>

      {ROOM_LABELS[build].map(([label, x], i) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            left: x - 200,
            top: FLOOR + 36,
            width: 400,
            textAlign: 'center',
            fontFamily: TYPE.family,
            fontSize: 26,
            fontWeight: TYPE.weightBold,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: C.terracottaDeep,
            ...riseIn(sceneFrame, 18 + i * 3, 14, 10),
          }}
        >
          {label}
        </div>
      ))}

      <div style={{ position: 'absolute', left: 0, top: 966, width: 1920, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === build ? 46 : 16,
              height: 4,
              borderRadius: 2,
              background: C.terracotta,
              opacity: i === build ? 0.9 : 0.28,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
