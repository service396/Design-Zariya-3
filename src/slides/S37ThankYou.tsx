import React from 'react';
import { SlideProps } from '../deck/types';
import { GreetingCard } from '../design/Greeting';

/**
 * The closing card — Thank You.
 *
 * The same card the deck opened on, so the last thing on screen answers the
 * first. See `design/Greeting.tsx`.
 */

export const S37ThankYou: React.FC<SlideProps> = ({ frame }) => (
  <GreetingCard frame={frame}>Thank You</GreetingCard>
);
