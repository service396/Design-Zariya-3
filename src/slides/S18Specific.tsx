import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Heading, ReferenceNote } from '../design/Type';
import { ImageFrame } from '../design/Photo';
import laboratory from '../assets/people/s18-laboratory.jpg';
import architecture from '../assets/people/s18-architecture.jpg';

/**
 * Slide 18 — specific questions, personal perspectives.
 *
 * Two editorial panels either side of one fine rule. Both arrive on entry,
 * the architectural panel a beat behind the laboratory one so the eye reads
 * left to right, and both then hold. There is no presenter build.
 *
 * Both photographs are concept visuals of fictional professionals. Neither is
 * a depiction of the actual Bhagirathi Neotia laboratory or a reconstruction
 * of City Centre, and Charles Correa is not depicted.
 */

const RULE_GAP = 36;
const PANEL_W = (STAGE.W - SAFE * 2 - RULE_GAP * 2) / 2; // 808
const RIGHT_X = SAFE + PANEL_W + RULE_GAP * 2;           // 996
const RULE_X = SAFE + PANEL_W + RULE_GAP;                // 960
const PHOTO_Y = 318;
const PHOTO_H = 330;
const TOPIC_Y = PHOTO_Y + PHOTO_H + 34;                  // 682
const Q_Y = TOPIC_Y + 46;                                // 728

type Panel = {
  src: string;
  alt: string;
  focus: string;
  topic: string;
  questions: [string, string];
};

const LEFT: Panel = {
  src: laboratory,
  alt: 'A laboratory specialist explaining a detail',
  focus: '44% 40%',
  topic: 'Inside an embryology lab',
  questions: [
    '“What was the hardest requirement to translate into the design of the lab?”',
    '“Which detail would a visitor overlook—but your team relies on every day?”',
  ],
};

const RIGHT: Panel = {
  src: architecture,
  alt: 'An architect in a shaded courtyard',
  focus: '34% 42%',
  topic: 'Inside City Centre',
  questions: [
    '“What do you remember about working with Charles Correa on the open spaces?”',
    '“Which design decision was hardest to execute—and why?”',
  ],
};

export const S18Specific: React.FC<SlideProps> = ({ frame }) => {
  const left = ramp(frame, 8, 18);   // 0.6s
  const right = ramp(frame, 14, 18); // 0.6s, a beat behind
  const rule = Math.min(left, right);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 120, ...riseIn(frame, 0, 10, 10) }}>
        <Heading style={{ lineHeight: 1.16 }}>
          Specific Questions.
          <br />
          Personal Perspectives.
        </Heading>
      </div>

      <div
        style={{
          position: 'absolute',
          left: RULE_X,
          top: PHOTO_Y,
          width: 1,
          height: 612 * rule,
          background: C.terracotta,
          opacity: 0.45,
        }}
      />

      <Panel panel={LEFT} x={SAFE} on={left} />
      <Panel panel={RIGHT} x={RIGHT_X} on={right} />

      <ReferenceNote frame={frame} at={30} />
    </AbsoluteFill>
  );
};

const Panel: React.FC<{ panel: Panel; x: number; on: number }> = ({ panel, x, on }) => {
  if (on <= 0) return null;
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: PHOTO_Y, opacity: on }}>
        <ImageFrame src={panel.src} alt={panel.alt} w={PANEL_W} h={PHOTO_H} focus={panel.focus} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: x,
          top: TOPIC_Y,
          width: PANEL_W,
          opacity: on,
          transform: `translateY(${(1 - on) * 8}px)`,
          fontFamily: TYPE.family,
          fontSize: 26,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.terracotta,
        }}
      >
        {panel.topic}
      </div>

      <div
        style={{
          position: 'absolute',
          left: x,
          top: Q_Y,
          width: PANEL_W,
          opacity: on,
          transform: `translateY(${(1 - on) * 8}px)`,
        }}
      >
        {panel.questions.map((q, i) => (
          <p
            key={q}
            style={{
              margin: i === 0 ? 0 : '28px 0 0',
              fontFamily: TYPE.family,
              fontSize: 31,
              fontWeight: TYPE.weightLight,
              lineHeight: 1.42,
              color: C.charcoal,
            }}
          >
            {q}
          </p>
        ))}
      </div>
    </>
  );
};
