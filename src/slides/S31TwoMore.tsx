import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Heading, ReferenceNote } from '../design/Type';
import { ImageFrame } from '../design/Photo';
import { EL } from '../art/elements';

/**
 * Slide 31 — two more ways to feel a space.
 *
 * Both panels arrive on entry, less is more a beat behind energy flow so the
 * eye reads left to right. No presenter build.
 * Energy flow is presented as a practitioner's perspective on placement and
 * movement; nothing here claims a mechanism.
 */

const GAP = 36;
const PANEL_W = (STAGE.W - SAFE * 2 - GAP * 2) / 2; // 808
const RIGHT_X = SAFE + PANEL_W + GAP * 2;
const RULE_X = SAFE + PANEL_W + GAP;
const PHOTO_Y = 262;
const PHOTO_H = 346; // traded down before any type size
const TITLE_Y = PHOTO_Y + PHOTO_H + 34;

type Panel = {
  src: string;
  alt: string;
  focus: string;
  number: string;
  title: string;
  question: string;
  body: string;
};

const LEFT: Panel = {
  src: EL.energy,
  alt: 'A practitioner in a home with connected rooms',
  focus: '42% 40%',
  number: '04',
  title: 'Energy Flow',
  question: 'How does a room invite you to move, pause or settle?',
  body: 'Feng Shui practitioners share their perspective on placement, flow and balance.',
};

const RIGHT: Panel = {
  src: EL.order,
  alt: 'A professional organiser beside arranged shelving',
  focus: '62% 42%',
  number: '05',
  title: 'Less Is More',
  question: 'What is a cluttered room actually telling you?',
  body: 'Professional organisers explore how order, habits and belongings shape daily experience.',
};

export const S31TwoMore: React.FC<SlideProps> = ({ frame }) => {
  const left = ramp(frame, 6, 18); // 0.6s
  const right = ramp(frame, 14, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 120, ...riseIn(frame, 0, 10, 10) }}>
        <Heading>Two More Ways to Feel a Space</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: RULE_X,
          top: PHOTO_Y,
          width: 1,
          height: 640 * Math.min(left, right),
          background: C.terracotta,
          opacity: 0.45,
        }}
      />

      <PanelView panel={LEFT} x={SAFE} on={left} />
      <PanelView panel={RIGHT} x={RIGHT_X} on={right} />

      <ReferenceNote frame={frame} at={20} />
    </AbsoluteFill>
  );
};

const PanelView: React.FC<{ panel: Panel; x: number; on: number }> = ({ panel, x, on }) => {
  if (on <= 0) return null;
  const rise = (d: number) => `translateY(${(1 - on) * d}px)`;
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: PHOTO_Y, opacity: on }}>
        <ImageFrame src={panel.src} alt={panel.alt} w={PANEL_W} h={PHOTO_H} focus={panel.focus} />
      </div>
      <div style={{ position: 'absolute', left: x, top: TITLE_Y, width: PANEL_W, opacity: on, transform: rise(8) }}>
        <div
          style={{
            fontFamily: TYPE.family,
            fontSize: 30,
            fontWeight: TYPE.weightBold,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: C.terracottaDeep,
          }}
        >
          <span style={{ color: C.terracotta }}>{panel.number} /</span> {panel.title}
        </div>
        <p
          style={{
            margin: '22px 0 0',
            fontFamily: TYPE.family,
            fontSize: 34,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.36,
            color: C.charcoal,
          }}
        >
          {panel.question}
        </p>
        <p
          style={{
            margin: '18px 0 0',
            fontFamily: TYPE.family,
            fontSize: 26,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.5,
            color: C.charcoalSoft,
          }}
        >
          {panel.body}
        </p>
      </div>
    </>
  );
};
