import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C } from '../design/tokens';
import { ElementSlide } from '../design/Elements';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 30 — 03 / BREATHING SPACES.
 *
 * The photograph opens through an architectural mask. The planting is real
 * photography, not animated growth.
 */
export const S30Nature: React.FC<SlideProps> = ({ frame }) => (
  <AbsoluteFill style={{ backgroundColor: C.ivory }}>
    <ElementSlide
      frame={frame}
      number="03"
      title="Breathing Spaces"
      question="What changes when something living moves in?"
      body="Landscape experts explore plants, light and care—and how nature changes the way a room feels."
      photo={{ src: EL.nature, alt: 'A landscape specialist in a planted interior', focus: '50% 50%' }}
      inset={{ src: EL.natureLeaf, alt: 'A leaf in window light', x: 1580, y: 610, w: 224, h: 299 }}
      tone="light"
      mask
      scrim={0.68}
    />
    <ReferenceNote frame={frame} at={30} />
  </AbsoluteFill>
);
