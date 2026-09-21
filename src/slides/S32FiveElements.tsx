import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp, riseIn } from '../design/motion';
import { ReferenceNote } from '../design/Type';
import { ImageFrame } from '../design/Photo';
import { EL } from '../art/elements';

/**
 * Slide 32 — five elements.
 *
 * Five equal vertical crops, each one a detail generated from the same scene
 * as its element's slide, so the summary repeats what the audience has just
 * seen rather than introducing new pictures. They arrive left to right and
 * then hold together — nothing cycles or highlights.
 */

const GAP = 32;
const W = (STAGE.W - SAFE * 2 - GAP * 4) / 5; // 312
const H = Math.round((W * 4) / 3); // 416
const Y = 336;

const FIVE = [
  { src: EL.colourWall, alt: 'Light across a coloured wall', label: 'Colour', focus: '50% 50%' },
  { src: EL.soundDetail, alt: 'Headphones beside a keyboard', label: 'Sound', focus: '40% 50%' },
  { src: EL.natureLeaf, alt: 'Leaves in window light', label: 'Nature', focus: '50% 40%' },
  { src: EL.energyRoute, alt: 'A clear route through connected rooms', label: 'Energy', focus: '50% 45%' },
  { src: EL.orderShelf, alt: 'A thoughtfully organised shelf', label: 'Order', focus: '60% 40%' },
];

export const S32FiveElements: React.FC<SlideProps> = ({ frame }) => (
  <AbsoluteFill style={{ backgroundColor: C.ivory }}>
    <div style={{ position: 'absolute', left: SAFE, top: 128, ...riseIn(frame, 0, 8, 10) }}>
      <div
        style={{
          fontFamily: TYPE.family,
          fontSize: 62,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.18,
          color: C.charcoal,
        }}
      >
        Five elements.
      </div>
      <div
        style={{
          fontFamily: TYPE.family,
          fontSize: 40,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.3,
          color: C.terracottaDeep,
          marginTop: 6,
        }}
      >
        Five ways to feel a space differently.
      </div>
    </div>

    {FIVE.map((f, i) => {
      const on = ramp(frame, 6 + i * 3, 10); // 0.1s stagger, all in by frame 28
      if (on <= 0) return null;
      const x = SAFE + i * (W + GAP);
      return (
        <React.Fragment key={f.label}>
          <div style={{ position: 'absolute', left: x, top: Y, opacity: on, transform: `translateY(${(1 - on) * 12}px)` }}>
            <ImageFrame src={f.src} alt={f.alt} w={W} h={H} focus={f.focus} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: x,
              top: Y + H + 30,
              width: W,
              opacity: on,
              borderTop: `1px solid rgba(182,99,67,0.4)`,
              paddingTop: 20,
              fontFamily: TYPE.family,
              fontSize: 26,
              fontWeight: TYPE.weightBold,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.terracottaDeep,
            }}
          >
            {f.label}
          </div>
        </React.Fragment>
      );
    })}

    <ReferenceNote frame={frame} at={24} />
  </AbsoluteFill>
);
