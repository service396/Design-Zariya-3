import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { DrawSet } from '../design/Draw';
import { Heading } from '../design/Type';
import { podcastScene, PODCAST_VIEW, viewBox } from '../art/podcast';

/**
 * Slide 22 — the ideas that move us forward.
 *
 * The copy carries the slide; the conversation is drawn beside it, lighter in
 * weight, and stays secondary. No presenter build: heading, both paragraphs,
 * the drawing and the topics all arrive on entry, in reading order, and then
 * the slide holds.
 */

const COL_W = 940;
const ART_X = 1108;
const ART_W = 696;
const ART_Y = 332;
const ART_H = 391; // the full view's own proportions, never stretched
const TOPIC_Y = 928;

const SCENE = podcastScene();

export const S22Ideas: React.FC<SlideProps> = ({ frame }) => {
  const second = ramp(frame, 22, 15); // after the first paragraph has landed
  const rule = ramp(frame, 26, 14);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 130, ...riseIn(frame, 0, 12, 10) }}>
        <Heading style={{ fontSize: 56 }}>The Ideas That Move Us Forward</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <p
        style={{
          position: 'absolute',
          left: SAFE,
          top: 330,
          width: COL_W,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 34,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.5,
          color: C.charcoal,
          ...riseIn(frame, 6, 12, 10),
        }}
      >
        A founder-led podcast exploring the ideas, decisions and possibilities shaping our cities and
        Bengal’s future.
      </p>

      <p
        style={{
          position: 'absolute',
          left: SAFE,
          top: 556,
          width: COL_W,
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 34,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.5,
          color: C.charcoalSoft,
          opacity: second,
          transform: `translateY(${(1 - second) * 10}px)`,
        }}
      >
        Founders, experts and influential voices from across India share what they are building, what
        they have learned and what progress needs next.
      </p>

      {/* the conversation, drawn once and then still */}
      <svg
        viewBox={viewBox(PODCAST_VIEW.full)}
        width={ART_W}
        height={ART_H}
        style={{ position: 'absolute', left: ART_X, top: ART_Y, display: 'block', overflow: 'visible' }}
      >
        <DrawSet
          paths={SCENE.map((d) => ({ d }))}
          frame={frame}
          at={8}
          step={1}
          dur={16}
          color={C.terracotta}
          width={STROKE.line}
        />
      </svg>

      {/* the topics, as one line */}
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: TOPIC_Y - 22,
          width: (STAGE.W - SAFE * 2) * rule,
          height: 1,
          background: C.terracotta,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: TOPIC_Y,
          fontFamily: TYPE.family,
          fontSize: 26,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.terracottaDeep,
          opacity: second,
          transform: `translateY(${(1 - second) * 8}px)`,
        }}
      >
        Enterprise · Design · Infrastructure · Culture · Community
      </div>
    </AbsoluteFill>
  );
};
