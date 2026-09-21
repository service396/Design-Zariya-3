import React from 'react';
import { SlideProps } from '../deck/types';
import { GreetingCard } from '../design/Greeting';

/**
 * The opening card — Hello.
 *
 * It sits on ivory so the terracotta cover that follows arrives as a step up
 * in colour rather than a repeat. The closing card is the same component, so
 * the two ends of the deck match exactly. See `design/Greeting.tsx`.
 */

export const S00Hello: React.FC<SlideProps> = ({ frame }) => (
  <GreetingCard frame={frame}>Hello</GreetingCard>
);
