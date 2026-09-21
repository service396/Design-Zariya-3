import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';

/**
 * Slide 16 — celebrating the people behind the vision.
 *
 * Opens the human chapter of Built with Purpose. A terracotta field and the
 * words alone: no photograph, so the turn from places to people lands as a
 * statement rather than as a portrait. Everything arrives within a second
 * and then holds; nothing loops.
 */

export const S16People: React.FC<SlideProps> = ({ frame }) => {
  const head = ramp(frame, 2, 12);
  const rule = ramp(frame, 12, 14);
  const byline = ramp(frame, 16, 12); // settled by frame 28

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 46%, ${C.terracottaDeep} 100%)`,
      }}
    >
      <div style={{ position: 'absolute', left: SAFE, top: 386, width: 1480 }}>
        <h1
          style={{
            margin: 0,
            fontFamily: TYPE.family,
            fontSize: 72,
            fontWeight: TYPE.weightBold,
            letterSpacing: '0.12em',
            lineHeight: 1.16,
            textTransform: 'uppercase',
            color: C.ivory,
            opacity: head,
            transform: `translateY(${(1 - head) * 12}px)`,
          }}
        >
          Celebrating the People
          <br />
          Behind the Vision
        </h1>

        <div
          style={{
            marginTop: 46,
            width: 148 * rule,
            height: 1,
            background: C.ivory,
            opacity: 0.6 * rule,
          }}
        />

        <p
          style={{
            margin: '42px 0 0',
            fontFamily: TYPE.family,
            fontSize: 40,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.4,
            color: C.ivory,
            opacity: 0.94 * byline,
            transform: `translateY(${(1 - byline) * 10}px)`,
          }}
        >
          From the city to its places—and the people who brought them to life.
        </p>
      </div>
    </AbsoluteFill>
  );
};
