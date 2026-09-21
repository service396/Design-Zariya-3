import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, STROKE, TYPE, FILL } from '../design/tokens';
import { ramp, pulse, riseIn } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { SectionHeader } from '../design/Type';
import { GROUP_A, GROUP_B, SLOTS, BASE, Vignette } from '../art/places';

/**
 * Slide 8 — the places within the city.
 * Two presenter-controlled groups of five, sharing one ground line.
 * Conceptual drawings. None of these depicts a named property.
 */

const TONE = [FILL.shade1, FILL.shade2, FILL.shade3];
const LABEL_Y = 858;

const Group: React.FC<{ items: Vignette[]; f: number; leaf: number }> = ({ items, f, leaf }) => (
  <>
    {items.map((v, i) => (
      <g key={v.label}>
        {v.fills.map((fl, j) => (
          <FillShape key={`fl${j}`} d={fl.d} frame={f} at={10 + i * 2 + j * 3} dur={18} fill={TONE[fl.tone - 1]} />
        ))}
        <g
          style={
            i === 4
              ? { transform: `rotate(${leaf * 0.5 - 0.25}deg)`, transformOrigin: `${SLOTS[4]}px ${BASE}px` }
              : undefined
          }
        >
          {v.strokes.map((d, j) => (
            <DrawPath
              key={j}
              d={d}
              frame={f}
              at={2 + i * 2.4 + j * 0.28}
              dur={22}
              width={j < 3 ? STROKE.line : STROKE.fine}
            />
          ))}
        </g>
      </g>
    ))}
  </>
);

export const S08Places: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const a = GROUP_A(BASE);
  const b = GROUP_B(BASE);
  const leaf = pulse(global, 310);

  const showB = build >= 1;
  const bf = since(1);
  const outA = ramp(bf, 0, 14);
  const items = showB ? b : a;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, overflow: 'hidden' }}>
      <SectionHeader frame={frame}>Places</SectionHeader>
      <Canvas>
        {/* the shared ground line survives the group change */}
        <DrawPath d={`M-20,${BASE} L1940,${BASE}`} frame={frame} at={0} dur={20} width={STROKE.line} />

        {!showB && (
          <g opacity={1}>
            <Group items={a} f={frame} leaf={leaf} />
          </g>
        )}
        {showB && (
          <>
            <g opacity={1 - outA}>
              <Group items={a} f={frame} leaf={leaf} />
            </g>
            <g>
              <Group items={b} f={bf} leaf={leaf} />
            </g>
          </>
        )}
      </Canvas>

      {/* labels, revealed cleanly, never morphed */}
      {items.map((v, i) => {
        const f = showB ? bf : frame;
        return (
          <div
            key={v.label}
            style={{
              position: 'absolute',
              left: SLOTS[i] - 180,
              top: LABEL_Y,
              width: 360,
              textAlign: 'center',
              fontFamily: TYPE.family,
              fontSize: 28,
              fontWeight: TYPE.weightBold,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: C.terracottaDeep,
              lineHeight: 1.3,
              ...riseIn(f, 14 + i * 2.4, 14, 10),
            }}
          >
            {v.label}
          </div>
        );
      })}

      {/* two-step progress marker */}
      <div style={{ position: 'absolute', left: 0, top: 966, width: STAGE.W, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: i === build ? 46 : 16,
              height: 4,
              borderRadius: 2,
              background: i === build ? C.terracotta : C.terracotta,
              opacity: i === build ? 0.9 : 0.28,
              transition: 'none',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
