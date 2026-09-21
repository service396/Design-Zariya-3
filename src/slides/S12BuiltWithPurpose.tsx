import React from 'react';
import { AbsoluteFill, interpolate, Easing } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { PhotoFrame } from '../design/Photo';
import { MONTAGE } from '../art/properties';

/**
 * Slide 12 — built with purpose.
 * One masked strip, one translation, one photographic fade, two text reveals.
 * The montage runs once on entry and never repeats during the hold.
 */

const PANEL_W = 508;
const PANEL_H = 318;
const GAP = 22;
const PITCH = PANEL_W + GAP;
const REPEATS = 3;
/** Every verified photograph, repeated so the strip never runs out mid-travel. */
const STRIP = Math.max(MONTAGE.length * REPEATS, 20);
/** Far enough that four or five places pass through the middle of frame. */
const TRAVEL = PITCH * 5.2;
const BAND_Y = 330;

/* 30fps. ~3 seconds. */
const T = {
  strip: [0, 9] as const,
  move: [9, 65] as const,
  fade: [50, 66] as const,
  rule: [52, 66] as const,
  title: [62, 80] as const,
  byline: [77, 92] as const,
};

/** Quick to speed, steady through the middle, a long deceleration into rest. */
const GLIDE = Easing.bezier(0.16, 0.58, 0.2, 1);

export const S12BuiltWithPurpose: React.FC<SlideProps> = ({ frame }) => {
  const appear = ramp(frame, T.strip[0], T.strip[1] - T.strip[0]);
  const p = interpolate(frame, [T.move[0], T.move[1]], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: GLIDE,
  });
  const x = -TRAVEL * p;
  const photos = appear * (1 - ramp(frame, T.fade[0], T.fade[1] - T.fade[0]));
  const rule = ramp(frame, T.rule[0], T.rule[1] - T.rule[0]);
  const title = ramp(frame, T.title[0], T.title[1] - T.title[0]);
  const byline = ramp(frame, T.byline[0], T.byline[1] - T.byline[0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 46%, ${C.terracottaDeep} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* the band: one container, one translate, clipped by the stage */}
      <div
        style={{
          position: 'absolute',
          top: BAND_Y,
          left: 0,
          width: STAGE.W,
          height: PANEL_H,
          overflow: 'hidden',
          opacity: photos,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -PITCH,
            display: 'flex',
            gap: GAP,
            transform: `translateX(${x}px)`,
            willChange: 'transform',
          }}
        >
          {Array.from({ length: STRIP }, (_, i) => {
            const shot = MONTAGE[i % MONTAGE.length];
            return (
              <PhotoFrame
                key={i}
                property={shot.property}
                src={shot.src}
                w={PANEL_W}
                h={PANEL_H}
                focus="50% 45%"
                style={{ borderColor: 'rgba(244,240,231,0.34)' }}
              />
            );
          })}
        </div>
      </div>

      {/* the fine ivory line beneath where the title will sit */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 596,
          width: STAGE.W,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 148 * rule, height: 1, background: C.ivory, opacity: 0.7 * rule }} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 400,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 96,
          fontWeight: TYPE.weightLight,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          color: C.ivory,
          opacity: title,
          transform: `translateY(${(1 - title) * 20}px)`,
        }}
      >
        Built with Purpose
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 646,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: 38,
          fontWeight: TYPE.weightLight,
          lineHeight: 1.4,
          color: C.ivory,
          opacity: 0.92 * byline,
        }}
      >
        Stories of the vision behind Bengal’s landmark spaces.
      </div>
    </AbsoluteFill>
  );
};
