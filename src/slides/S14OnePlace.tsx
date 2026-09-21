import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, STROKE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { Canvas } from '../design/Draw';
import { Heading, ReferenceNote } from '../design/Type';
import { PhotoFrame, ImageFrame } from '../design/Photo';
import { property } from '../art/properties';
import storyLab from '../assets/stories/lab.jpg';
import storyMother from '../assets/stories/mother-and-doctor.jpg';
import storyDoctor from '../assets/stories/doctor.jpg';

/**
 * Slide 14 — one place, many stories.
 * The place on the left, three shorter stories on the right, joined by one
 * fine line. The landscape frame is never stretched into a portrait shape.
 *
 * The place shown is Bhagirathi Neotia, photographed as supplied.
 *
 * The three portraits are illustrative images of the kind of footage a reel
 * would carry. They are not photographs of this or any other facility, they
 * carry no signage and they are never captioned with the property name. No
 * claim about care, outcomes, laboratories or medical leadership is made
 * anywhere on this slide.
 */

const FRAME_TOP = 276;
const LAND_W = 720;
const LAND_H = 405;
const PORT_H = 405;
const PORT_W = Math.round((PORT_H * 9) / 16); // 228
const PORT_GAP = 28;
const PORT_TOTAL = PORT_W * 3 + PORT_GAP * 2; // 740
const PORT_X = STAGE.W - SAFE - PORT_TOTAL;   // 1064
/** The place is named above its frame, clear of the two explanations below. */
const CAPTION_TOP = FRAME_TOP - 36;           // 240
const TEXT_TOP = 706;

const PLACE = property('bhagirathi-neotia');
/** The wide street-level frame reads best at 16:9. */
const PLACE_SHOT = PLACE.shots[2] ?? PLACE.src;

const STORIES: { src: string; alt: string; focus: string }[] = [
  { src: storyLab, alt: 'A laboratory procedure', focus: '46% 40%' },
  { src: storyMother, alt: 'A mother, her baby and a doctor', focus: '50% 42%' },
  { src: storyDoctor, alt: 'A doctor', focus: '50% 34%' },
];

export const S14OnePlace: React.FC<SlideProps> = ({ frame, since }) => {
  const head = ramp(frame, 0, 11);
  const land = ramp(frame, 5, 18);
  const b1 = since(1);
  const link = ramp(b1, 0, 11);
  const shorts = ramp(b1, 4, 14);
  const meta = ramp(b1, 18, 14);

  const linkY = FRAME_TOP + LAND_H / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <div style={{ position: 'absolute', left: SAFE, top: 142, opacity: head, transform: `translateY(${(1 - head) * 10}px)` }}>
        <Heading>One Place. Many Stories.</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 * head }} />
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

      {/* the full story */}
      <div style={{ position: 'absolute', left: SAFE, top: FRAME_TOP, opacity: land }}>
        <PhotoFrame property={PLACE} src={PLACE_SHOT} w={LAND_W} h={LAND_H} focus="50% 52%" />
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: CAPTION_TOP,
          width: LAND_W,
          opacity: land,
          fontFamily: TYPE.family,
          fontSize: 22,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: C.terracottaDeep,
        }}
      >
        {PLACE.label}
      </div>

      {/* the shorter stories */}
      {STORIES.map((s, i) => {
        const on = ramp(b1, 4 + i * 3, 14);
        if (on <= 0) return null;
        return (
          <div
            key={s.src}
            style={{
              position: 'absolute',
              left: PORT_X + i * (PORT_W + PORT_GAP),
              top: FRAME_TOP,
              opacity: on,
              transform: `translateX(${(1 - on) * 18}px)`,
            }}
          >
            <ImageFrame src={s.src} alt={s.alt} w={PORT_W} h={PORT_H} focus={s.focus} />
          </div>
        );
      })}

      {/* the two explanations, aligned at the same height */}
      <div style={{ position: 'absolute', left: SAFE, top: TEXT_TOP, width: LAND_W, ...riseIn(frame, 10, 14, 10) }}>
        <Label>The full story</Label>
        <Body>
          An expert-led documentary combining on-camera conversations, location footage and archival
          material.
        </Body>
      </div>

      <div style={{ position: 'absolute', left: PORT_X, top: TEXT_TOP, width: PORT_TOTAL, opacity: shorts, transform: `translateY(${(1 - shorts) * 10}px)` }}>
        <Label>The shorter stories</Label>
        <Body>
          Focused reels drawn from the film—each exploring a revealing question, decision or moment.
        </Body>
      </div>

      {/* format and platforms */}
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          top: 918,
          width: (STAGE.W - SAFE * 2) * meta,
          height: 1,
          background: C.terracotta,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: SAFE,
          right: SAFE,
          top: 934,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: meta,
          fontFamily: TYPE.family,
          fontSize: 26,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.terracottaDeep,
        }}
      >
        <span>16:9 films + 9:16 reels</span>
        <span style={{ color: C.charcoalSoft, opacity: 0.85 }}>YouTube · Instagram · Facebook</span>
      </div>

      <ReferenceNote frame={frame} at={34} />
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
      fontSize: 32,
      fontWeight: TYPE.weightLight,
      lineHeight: 1.45,
      color: C.charcoal,
    }}
  >
    {children}
  </div>
);
