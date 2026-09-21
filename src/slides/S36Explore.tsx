import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';

/**
 * The hand-off — Let's Explore the Space.
 *
 * One line and one live link. The link opens the working site in a new tab,
 * and stops the click from reaching the stage, which would otherwise take it
 * as an advance. It is given a real border and a wide target because it has
 * to be hit once, from a laptop, in front of a room.
 *
 * The link is live in the running deck only. In the PDF and the stills it is
 * just type, so read the address out or send it separately.
 */

const HREF = 'https://design-zariya.vercel.app/#story';

export const S36Explore: React.FC<SlideProps> = ({ frame }) => {
  const line = ramp(frame, 4, 14);
  const cta = ramp(frame, 16, 14);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 46%, ${C.terracottaDeep} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: TYPE.family,
          fontSize: 82,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          textAlign: 'center',
          textTransform: 'uppercase',
          color: C.ivory,
          opacity: line,
          transform: `translateY(${(1 - line) * 14}px)`,
        }}
      >
        Let&rsquo;s Explore the Space
      </h1>

      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: 76,
          padding: '26px 64px',
          border: `2px solid ${C.ivory}`,
          fontFamily: TYPE.family,
          fontSize: 32,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: C.ivory,
          cursor: 'pointer',
          opacity: cta,
          transform: `translateY(${(1 - cta) * 10}px)`,
        }}
      >
        Click here
      </a>
    </AbsoluteFill>
  );
};
