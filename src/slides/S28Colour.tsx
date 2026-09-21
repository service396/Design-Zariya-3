import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C } from '../design/tokens';
import { ElementSlide } from '../design/Elements';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/** Slide 28 — 01 / COLOUR. */
export const S28Colour: React.FC<SlideProps> = ({ frame }) => (
  <AbsoluteFill style={{ backgroundColor: C.ivory }}>
    <ElementSlide
      frame={frame}
      number="01"
      title="Colour"
      question="What does a colour do to a room—and to the people inside it?"
      body="A colour specialist and an interior designer explore tone, light and the feeling they create together."
      photo={{ src: EL.colour, alt: 'A colour specialist with swatches', focus: '50% 50%' }}
      inset={{ src: EL.colourWall, alt: 'Light across a painted wall', x: 1560, y: 560, w: 244, h: 325 }}
      tone="light"
      scrim={0.66}
    />
    <ReferenceNote frame={frame} at={30} />
  </AbsoluteFill>
);
