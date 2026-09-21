import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C } from '../design/tokens';
import { BuildingTomorrowLogo, BT } from '../art/buildingTomorrow';

/**
 * Slide 20 — the BUILDING TOMORROW logo reveal.
 *
 * Six seconds, played once on entry and then held on the finished mark for as
 * long as the presenter stays. `frame` is monotonic, so holding the slide can
 * never restart it, and the component clamps past its own duration.
 */
export const S20Logo: React.FC<SlideProps> = ({ frame }) => (
  <AbsoluteFill style={{ backgroundColor: C.terracotta }}>
    <BuildingTomorrowLogo frame={Math.min(frame, BT.DURATION)} />
  </AbsoluteFill>
);
