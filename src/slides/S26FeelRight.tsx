import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { FullPhoto, Scrim } from '../design/Elements';
import { Heading, ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 26 — what makes a space feel right?
 *
 * An empty, lived-in room holds the background. The six qualities arrive in
 * three pairs, in reading order, and then stay put — no cycling, no effect
 * per word. The explanatory sentence follows them. No presenter build: the
 * whole slide arrives on entry.
 */

const LINES = [
  ['Calm.', 'Warmth.', 'Energy.'],
  ['Balance.', 'Personality.', 'Breath.'],
];

export const S26FeelRight: React.FC<SlideProps> = ({ frame }) => {
  const bg = ramp(frame, 0, 16);
  const sentence = ramp(frame, 30, 14); // once the last pair has landed

  let n = -1;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <FullPhoto src={EL.room} alt="A quiet, light-filled room" reveal={bg} focus="50% 50%" />
      <Scrim tone="light" strength={0.62} reach={56} opacity={bg} />

      <div style={{ position: 'absolute', left: SAFE, top: 200, ...riseIn(frame, 2, 12, 10) }}>
        <Heading style={{ fontSize: 54, lineHeight: 1.18 }}>
          What makes a space
          <br />
          feel right?
        </Heading>
        <div style={{ marginTop: 26, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <div style={{ position: 'absolute', left: SAFE, top: 470 }}>
        {LINES.map((words, li) => (
          <div key={li} style={{ display: 'flex', gap: 30, marginTop: li === 0 ? 0 : 18 }}>
            {words.map((wd) => {
              n += 1;
              const on = ramp(frame, 14 + Math.floor(n / 2) * 5, 12);
              return (
                <span
                  key={wd}
                  style={{
                    fontFamily: TYPE.family,
                    fontSize: 52,
                    fontWeight: TYPE.weightLight,
                    color: C.charcoal,
                    opacity: on,
                    transform: `translateY(${(1 - on) * 10}px)`,
                    display: 'inline-block',
                  }}
                >
                  {wd}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <p
        style={{
          position: 'absolute',
          left: SAFE,
          top: 740,
          width: 760,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 32,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.5,
          color: C.charcoalSoft,
          opacity: sentence,
          transform: `translateY(${(1 - sentence) * 10}px)`,
        }}
      >
        Elements explores the qualities that shape how we experience a space.
      </p>

      <ReferenceNote frame={frame} at={34} />
    </AbsoluteFill>
  );
};
