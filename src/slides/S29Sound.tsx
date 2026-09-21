import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C } from '../design/tokens';
import { ElementSlide } from '../design/Elements';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 29 — 02 / THE SOUNDS OF SERENITY.
 *
 * Three short lines are drawn once under the title and then rest; they never
 * oscillate. No audio plays on this slide.
 */
export const S29Sound: React.FC<SlideProps> = ({ frame }) => (
  <AbsoluteFill style={{ backgroundColor: C.charcoal }}>
    <ElementSlide
      frame={frame}
      number="02"
      title="The Sounds of Serenity"
      question="What does a space sound like when nobody is speaking?"
      body="Musicians and sound designers explore the sounds we notice—and those we quietly live with."
      photo={{ src: EL.sound, alt: 'A sound designer in a timber studio', focus: '50% 50%' }}
      inset={{ src: EL.soundDetail, alt: 'Headphones beside a keyboard', x: 1580, y: 600, w: 224, h: 299 }}
      tone="dark"
      sound
      scrim={0.6}
    />
    <ReferenceNote frame={frame} at={30} color={C.ivory} />
  </AbsoluteFill>
);
