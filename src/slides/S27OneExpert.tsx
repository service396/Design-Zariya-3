import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { ImageFrame } from '../design/Photo';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 27 — one element, one expert.
 *
 * Each line of the headline arrives with the picture it describes: the wide
 * interview with "One element", the close-up with "One expert", the hands
 * with "One new way to see a space". The three pictures are one fictional
 * expert, generated from a single reference so he stays the same man.
 * The explanation and closing line follow on entry — no presenter build.
 */

const LEFT_W = 720;
const RIGHT_X = 876;
const RIGHT_W = STAGE.W - SAFE - RIGHT_X; // 928
const GUTTER = 24;
const MAIN_Y = 150;
const MAIN_H = 522;
const SUB_W = (RIGHT_W - GUTTER) / 2; // 452
const SUB_Y = MAIN_Y + MAIN_H + GUTTER; // 696
const SUB_H = 254;

const BEATS = [
  { text: 'One element.', at: 0, color: C.charcoal },
  { text: 'One expert.', at: 9, color: C.charcoal },
  { text: 'One new way to see a space.', at: 18, color: C.terracottaDeep },
];

export const S27OneExpert: React.FC<SlideProps> = ({ frame }) => {
  const main = ramp(frame, 0, 16);
  const close = ramp(frame, 9, 16);
  const hands = ramp(frame, 18, 16); // coordinated build settled by ~1.1s
  const copy = ramp(frame, 28, 14);
  const closing = ramp(frame, 34, 14);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 168, width: LEFT_W }}>
        {BEATS.map((b) => {
          const on = ramp(frame, b.at, 12);
          return (
            <div
              key={b.text}
              style={{
                fontFamily: TYPE.family,
                fontSize: 50,
                fontWeight: TYPE.weightLight,
                lineHeight: 1.3,
                color: b.color,
                opacity: on,
                transform: `translateY(${(1 - on) * 12}px)`,
              }}
            >
              {b.text}
            </div>
          );
        })}

        <div style={{ marginTop: 44, width: 120 * copy, height: 2, background: C.terracotta, opacity: 0.8 }} />

        <p
          style={{
            margin: '36px 0 0',
            fontFamily: TYPE.family,
            fontSize: 31,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.5,
            color: C.charcoalSoft,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 10}px)`,
          }}
        >
          Talking-head conversations with specialists, supported by details and demonstrations within
          the space.
        </p>
        <p
          style={{
            margin: '30px 0 0',
            fontFamily: TYPE.family,
            fontSize: 31,
            fontWeight: TYPE.weightBold,
            lineHeight: 1.45,
            color: C.terracottaDeep,
            opacity: closing,
            transform: `translateY(${(1 - closing) * 8}px)`,
          }}
        >
          Expertise translated into everyday experience.
        </p>
      </div>

      <div style={{ position: 'absolute', left: RIGHT_X, top: MAIN_Y, opacity: main }}>
        <ImageFrame src={EL.interviewWide} alt="A seated interview" w={RIGHT_W} h={MAIN_H} focus="58% 42%" />
      </div>
      <div
        style={{
          position: 'absolute',
          left: RIGHT_X,
          top: SUB_Y,
          opacity: close,
          transform: `translateY(${(1 - close) * 10}px)`,
        }}
      >
        <ImageFrame src={EL.interviewClose} alt="The same expert, closer" w={SUB_W} h={SUB_H} focus="62% 32%" />
      </div>
      <div
        style={{
          position: 'absolute',
          left: RIGHT_X + SUB_W + GUTTER,
          top: SUB_Y,
          opacity: hands,
          transform: `translateY(${(1 - hands) * 10}px)`,
        }}
      >
        <ImageFrame src={EL.interviewHands} alt="The expert's hands with a clay tile" w={SUB_W} h={SUB_H} focus="60% 50%" />
      </div>

      <ReferenceNote frame={frame} at={28} />
    </AbsoluteFill>
  );
};
