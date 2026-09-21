import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STAGE, TYPE } from '../design/tokens';
import { ramp } from '../design/motion';
import { Heading } from '../design/Type';
import { PhotoFrame } from '../design/Photo';
import { HERO, GRID } from '../art/properties';

/**
 * Slide 11 — the city as space.
 * A static editorial spread. No internal reveals, no zooms, no ambient loop;
 * the whole slide arrives together on a short crossfade and then holds.
 */

const RULE_X = 852;
const COL_X = 906;
const COL_W = STAGE.W - COL_X - SAFE;      // 898
const HERO_H = 384;
const TILE_W = (COL_W - 3 * 16) / 4;       // 212
const TILE_H = 214;
const TOP = 196;
const LABEL_GAP = 26;

export const S11CityAsSpace: React.FC<SlideProps> = ({ frame }) => {
  // one short crossfade for the whole slide, then nothing moves
  const on = ramp(frame, 0, 11);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, opacity: on }}>
      {/* left · the writing */}
      <div style={{ position: 'absolute', left: SAFE, top: 190, width: RULE_X - SAFE - 72 }}>
        <Heading>The City as Space</Heading>
        <div style={{ marginTop: 22, width: 120, height: 2, background: C.terracotta, opacity: 0.8 }} />
        <p
          style={{
            margin: '58px 0 0',
            fontFamily: TYPE.family,
            fontSize: 42,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.36,
            color: C.charcoal,
          }}
        >
          Kolkata is our starting point. Bengal widens the story.
        </p>
        <p
          style={{
            margin: '40px 0 0',
            fontFamily: TYPE.family,
            fontSize: 34,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.5,
            color: C.charcoalSoft,
          }}
        >
          We explore the places Ambuja Neotia has helped shape—and the needs, ideas and ambitions
          that brought them to life.
        </p>
      </div>

      {/* the fine rule that separates writing from photography */}
      <div
        style={{
          position: 'absolute',
          left: RULE_X,
          top: 190,
          width: 1,
          height: 730,
          background: C.terracotta,
          opacity: 0.5,
        }}
      />

      {/* right · the photography */}
      <div style={{ position: 'absolute', left: COL_X, top: TOP }}>
        <PhotoFrame property={HERO} w={COL_W} h={HERO_H} focus="50% 45%" />
        <Caption label={HERO.label} w={COL_W} />
      </div>

      <div style={{ position: 'absolute', left: COL_X, top: TOP + HERO_H + LABEL_GAP + 34 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {GRID.map((p) => (
            <div key={p.key}>
              <PhotoFrame property={p} w={TILE_W} h={TILE_H} small />
              <Caption label={p.label} w={TILE_W} small />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ label: string; w: number; small?: boolean }> = ({ label, w, small }) => (
  <div
    style={{
      width: w,
      marginTop: small ? 14 : 18,
      fontFamily: TYPE.family,
      fontSize: small ? 20 : 26,
      fontWeight: TYPE.weightBold,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: C.terracottaDeep,
    }}
  >
    {label}
  </div>
);
