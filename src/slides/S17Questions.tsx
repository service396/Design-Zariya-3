import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Heading, ReferenceNote } from '../design/Type';
import { ImageFrame } from '../design/Photo';
import architecture from '../assets/people/s17-architecture.jpg';
import healthcare from '../assets/people/s17-healthcare.jpg';
import execution from '../assets/people/s17-execution.jpg';

/**
 * Slide 17 — the people, the decisions, the details.
 *
 * Three question blocks carry the slide; the photographic strip beneath is
 * deliberately shallow and quiet so the questions stay dominant.
 *
 * The three photographs are concept visuals of fictional professionals.
 * No name, title or quotation is attached to any of them.
 */

const GAP = 56;
const COL_W = (STAGE.W - SAFE * 2 - GAP * 2) / 3; // 525.33
const BLOCK_Y = 470;
const STRIP_Y = 736;
const STRIP_H = 198;

const BLOCKS: [string, string][] = [
  ['The vision', 'What were you trying to make possible?'],
  ['The challenge', 'Which problem demanded a different approach?'],
  ['The personal story', 'Which decision or moment has stayed with you?'],
];

/** One frame per professional context, in the order the blocks read. */
const STRIP: { src: string; alt: string; focus: string }[] = [
  { src: architecture, alt: 'An architect in a studio', focus: '38% 46%' },
  { src: healthcare, alt: 'A laboratory specialist in a meeting area', focus: '42% 44%' },
  { src: execution, alt: 'A project professional in a completed building', focus: '40% 44%' },
];

export const S17Questions: React.FC<SlideProps> = ({ frame }) => {
  const intro = ramp(frame, 6, 9);
  const strip = ramp(frame, 26, 10); // settled by frame 36

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 120, ...riseIn(frame, 0, 9, 10) }}>
        <Heading style={{ lineHeight: 1.16 }}>
          The People. The Decisions.
          <br />
          The Details.
        </Heading>
      </div>

      <p
        style={{
          position: 'absolute',
          left: SAFE,
          top: 306,
          width: 1320,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 34,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.5,
          color: C.charcoalSoft,
          opacity: intro,
          transform: `translateY(${(1 - intro) * 10}px)`,
        }}
      >
        Firsthand conversations with the experts and long-standing collaborators behind Ambuja
        Neotia’s places.
      </p>

      {BLOCKS.map(([label, question], i) => {
        const x = SAFE + i * (COL_W + GAP);
        const at = 14 + i * 3; // 0.1s stagger
        return (
          <div key={label} style={{ position: 'absolute', left: x, top: BLOCK_Y, width: COL_W, ...riseIn(frame, at, 12, 12) }}>
            <div style={{ width: 52, height: 2, background: C.terracotta, opacity: 0.8 }} />
            <div
              style={{
                marginTop: 24,
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
                marginTop: 22,
                fontFamily: TYPE.family,
                fontSize: 34,
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

      {/* the strip fades in as one unit, beneath and quieter than the questions */}
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: STRIP_Y,
          display: 'flex',
          gap: GAP,
          opacity: strip * 0.94,
        }}
      >
        {STRIP.map((s) => (
          <ImageFrame key={s.src} src={s.src} alt={s.alt} w={COL_W} h={STRIP_H} focus={s.focus} />
        ))}
      </div>

      <ReferenceNote frame={frame} at={32} />
    </AbsoluteFill>
  );
};
