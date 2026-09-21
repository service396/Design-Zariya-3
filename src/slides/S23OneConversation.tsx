import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Canvas } from '../design/Draw';
import { Heading } from '../design/Type';
import { Frame } from '../design/Photo';
import { podcastScene, PODCAST_VIEW, viewBox } from '../art/podcast';

/**
 * Slide 23 — one conversation. Every week.
 *
 * The weekly film on the left, the cutdowns on the right, joined by one fine
 * line. No presenter build: the whole slide arrives on entry, left to right,
 * and then holds. Every frame holds a schematic preview drawn from slide 22's own
 * geometry — tighter views of the same drawing, so nothing here depends on
 * footage from the teaser, and no thumbnail, count or platform chrome is
 * invented.
 */

const FRAME_TOP = 268;
const LAND_W = 720;
const LAND_H = 405;
const PORT_H = 405;
const PORT_W = Math.round((PORT_H * 9) / 16); // 228
const PORT_GAP = 28;
const PORT_TOTAL = PORT_W * 3 + PORT_GAP * 2; // 740
const PORT_X = STAGE.W - SAFE - PORT_TOTAL; // 1064
const TEXT_TOP = 690;
const PLATFORM_Y = 912;

const SCENE = podcastScene();

/** The three details, in the order they read. */
const DETAILS = [PODCAST_VIEW.mic, PODCAST_VIEW.chair, PODCAST_VIEW.table];

const Schematic: React.FC<{
  view: readonly number[];
  w: number;
  h: number;
  width?: number;
}> = ({ view, w, h, width = STROKE.line }) => (
  <svg viewBox={viewBox(view)} width={w} height={h} style={{ display: 'block' }}>
    {SCENE.map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={C.terracotta}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.9}
      />
    ))}
  </svg>
);

export const S23OneConversation: React.FC<SlideProps> = ({ frame }) => {
  const land = ramp(frame, 5, 18); // within 0.8s with the heading
  const link = ramp(frame, 20, 12);
  const shorts = ramp(frame, 26, 14);
  const platform = ramp(frame, 40, 14); // last, once the frames have landed

  const linkY = FRAME_TOP + LAND_H / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 134, ...riseIn(frame, 0, 11, 10) }}>
        <Heading>One Conversation. Every Week.</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
      </div>

      <Canvas>
        <line
          x1={SAFE + LAND_W}
          y1={linkY}
          x2={SAFE + LAND_W + (PORT_X - SAFE - LAND_W) * link}
          y2={linkY}
          stroke={C.terracotta}
          strokeWidth={STROKE.fine}
          opacity={0.75}
        />
      </Canvas>

      {/* the full conversation */}
      <div style={{ position: 'absolute', left: SAFE, top: FRAME_TOP, opacity: land }}>
        <Frame w={LAND_W} h={LAND_H} style={{ backgroundColor: C.ivoryLift }}>
          <Schematic view={PODCAST_VIEW.full} w={LAND_W} h={LAND_H} />
        </Frame>
      </div>

      {/* the standout moments */}
      {DETAILS.map((view, i) => {
        const on = ramp(frame, 24 + i * 3, 14);
        if (on <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: PORT_X + i * (PORT_W + PORT_GAP),
              top: FRAME_TOP,
              opacity: on,
              transform: `translateX(${(1 - on) * 16}px)`,
            }}
          >
            <Frame w={PORT_W} h={PORT_H} style={{ backgroundColor: C.ivoryLift }}>
              <Schematic view={view} w={PORT_W} h={PORT_H} />
            </Frame>
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: SAFE, top: TEXT_TOP, width: LAND_W, ...riseIn(frame, 12, 14, 10) }}>
        <Label>The full conversation</Label>
        <Body>
          A focused, 30–40-minute weekly podcast on YouTube, hosted by a founder in conversation with
          a founder or domain expert.
        </Body>
      </div>

      <div
        style={{
          position: 'absolute',
          left: PORT_X,
          top: TEXT_TOP,
          width: PORT_TOTAL,
          opacity: shorts,
          transform: `translateY(${(1 - shorts) * 10}px)`,
        }}
      >
        <Label>The standout moments</Label>
        <Body>
          Sharp 9:16 cutdowns built around revealing insights, practical lessons and compelling
          questions.
        </Body>
      </div>

      <div
        style={{
          position: 'absolute',
          left: PORT_X,
          top: PLATFORM_Y - 22,
          width: PORT_TOTAL * platform,
          height: 1,
          background: C.terracotta,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: PORT_X,
          top: PLATFORM_Y,
          width: PORT_TOTAL,
          opacity: platform,
          fontFamily: TYPE.family,
          fontSize: 20,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: C.terracottaDeep,
        }}
      >
        YouTube Shorts · Facebook Reels · Instagram Reels
      </div>
    </AbsoluteFill>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: TYPE.family,
      fontSize: 26,
      fontWeight: TYPE.weightBold,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: C.terracotta,
    }}
  >
    {children}
  </div>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 22,
      fontFamily: TYPE.family,
      fontSize: 30,
      fontWeight: TYPE.weightLight,
      lineHeight: 1.45,
      color: C.charcoal,
    }}
  >
    {children}
  </div>
);
