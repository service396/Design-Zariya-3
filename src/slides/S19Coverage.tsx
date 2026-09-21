import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Heading, ReferenceNote } from '../design/Type';
import { ImageFrame } from '../design/Photo';
import closeUp from '../assets/people/s19-closeup.jpg';
import threeQuarter from '../assets/people/s19-three-quarter.jpg';
import environmental from '../assets/people/s19-environmental.jpg';

/**
 * Slide 19 — how the conversations will look.
 *
 * Three 9:16 stills from one interview setup, side by side, at their true
 * proportions. Nothing moves once they land: no play buttons, no subtitles,
 * no simulated speech. This is the last slide of the section.
 *
 * All three are concept visuals of the same fictional expert, generated from
 * one master setup so the coverage reads as a single shoot.
 */

const FRAME_W = 360;
const FRAME_H = 640;
const GAP = 60;
const ROW_W = FRAME_W * 3 + GAP * 2;      // 1200
const ROW_X = (STAGE.W - ROW_W) / 2;      // 360
const ROW_Y = 212;
const LABEL_Y = ROW_Y + FRAME_H + 28;     // 880

const SHOTS: { src: string; alt: string; focus: string; label: string; note: string }[] = [
  {
    src: closeUp,
    alt: 'A close-up interview frame',
    focus: '50% 34%',
    label: 'Close-up',
    note: 'Expression and personal recollection.',
  },
  {
    src: threeQuarter,
    alt: 'A three-quarter interview frame',
    focus: '50% 40%',
    label: 'Three-quarter',
    note: 'A natural conversational perspective.',
  },
  {
    src: environmental,
    alt: 'An environmental interview frame',
    focus: '50% 46%',
    label: 'Environmental',
    note: 'The person within the place.',
  },
];

export const S19Coverage: React.FC<SlideProps> = ({ frame }) => {
  const head = ramp(frame, 0, 9); // 0.3s

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 100, opacity: head, transform: `translateY(${(1 - head) * 10}px)` }}>
        <Heading>How the Conversations Will Look</Heading>
      </div>

      <ReferenceNote frame={frame} at={22} />

      {SHOTS.map((s, i) => {
        const at = 6 + i * 3;           // 0.1s stagger, settled by frame 24
        const on = ramp(frame, at, 12);
        if (on <= 0) return null;
        const x = ROW_X + i * (FRAME_W + GAP);
        return (
          <React.Fragment key={s.label}>
            <div style={{ position: 'absolute', left: x, top: ROW_Y, opacity: on }}>
              <ImageFrame src={s.src} alt={s.alt} w={FRAME_W} h={FRAME_H} focus={s.focus} />
            </div>

            <div
              style={{
                position: 'absolute',
                left: x,
                top: LABEL_Y,
                width: FRAME_W,
                opacity: on,
                transform: `translateY(${(1 - on) * 8}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: TYPE.family,
                  fontSize: 24,
                  fontWeight: TYPE.weightBold,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: C.terracotta,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: TYPE.family,
                  fontSize: 26,
                  fontWeight: TYPE.weightLight,
                  lineHeight: 1.4,
                  color: C.charcoalSoft,
                }}
              >
                {s.note}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
