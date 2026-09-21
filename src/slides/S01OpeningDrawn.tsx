import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, LINE, STAGE, TYPE, STROKE } from '../design/tokens';
import { ramp, pulse, mix } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { openingForms } from '../art/frames';
import logo from '../assets/logo-full.png';

/**
 * Slide 1 — opening.
 * A condensed version of the approved opening animation: ground, three forms
 * resolving together, one terracotta wipe, then the lock-up. Roughly 4.5s.
 * The original long-form opening is kept as an alternate in the Remotion root.
 */

const LOGO_W = 764;
const LOGO_H = LOGO_W / (2407 / 1067);
const LOGO_X = (STAGE.W - LOGO_W) / 2;
const LOGO_TOP = 362;

const T = {
  ground: 0,
  forms: 12,
  trees: 40,
  wipe: 74,
  logo: 96,
  sub: 112,
};

export const S01OpeningDrawn: React.FC<SlideProps> = ({ frame, global }) => {
  const f = openingForms();
  const wipe = ramp(frame, T.wipe, 26);
  const logoIn = ramp(frame, T.logo, 18);
  const subIn = ramp(frame, T.sub, 16);
  const cityOut = ramp(frame, T.wipe + 4, 20);

  // Extremely restrained tonal shift, seamless.
  const tone = pulse(global, 340) * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      {/* city stage, drawn on ivory then covered by the wipe */}
      <AbsoluteFill style={{ opacity: 1 - cityOut }}>
        <Canvas>
          <DrawPath d={f.ground} frame={frame} at={T.ground} dur={16} width={STROKE.line} />
          <FillShape d={f.trees[0].fill} frame={frame} at={T.trees + 6} fill="rgba(182,99,67,0.10)" />
          <FillShape d={f.trees[1].fill} frame={frame} at={T.trees + 8} fill="rgba(182,99,67,0.10)" />
          {f.tower.map((d, i) => (
            <DrawPath key={`t${i}`} d={d} frame={frame} at={T.forms + i * 0.7} dur={26} width={i < 5 ? STROKE.line : STROKE.fine} />
          ))}
          {f.block.map((d, i) => (
            <DrawPath key={`b${i}`} d={d} frame={frame} at={T.forms + 6 + i * 0.7} dur={26} width={i < 5 ? STROKE.line : STROKE.fine} />
          ))}
          {f.atrium.map((d, i) => (
            <DrawPath key={`a${i}`} d={d} frame={frame} at={T.forms + 12 + i * 0.9} dur={26} width={i < 3 ? STROKE.line : STROKE.fine} />
          ))}
          {f.trees.map((t, i) => (
            <g key={`tr${i}`}>
              {t.trunk.map((d, j) => (
                <DrawPath key={j} d={d} frame={frame} at={T.trees + i * 3 + j * 0.6} dur={16} width={STROKE.fine} />
              ))}
              {t.canopy.map((d, j) => (
                <DrawPath key={`c${j}`} d={d} frame={frame} at={T.trees + 3 + i * 3 + j * 0.8} dur={18} width={STROKE.fine} />
              ))}
            </g>
          ))}
        </Canvas>
      </AbsoluteFill>

      {/* one controlled terracotta wipe, rising off the ground line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: STAGE.H,
          background: `linear-gradient(200deg, ${C.terracottaLift} 0%, ${C.terracotta} 48%, ${C.terracottaDeep} 100%)`,
          clipPath: `inset(${(1 - wipe) * 100}% 0% 0% 0%)`,
          transformOrigin: 'bottom',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: wipe * tone,
          background: `radial-gradient(64% 52% at 38% 34%, ${C.terracottaLift} 0%, rgba(0,0,0,0) 72%)`,
        }}
      />

      {/* the lock-up */}
      <img
        src={logo}
        alt="Design Zariya"
        style={{
          position: 'absolute',
          left: LOGO_X,
          top: LOGO_TOP,
          width: LOGO_W,
          height: LOGO_H,
          opacity: logoIn,
          transform: `translateY(${(1 - logoIn) * 10}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 762,
          width: STAGE.W,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontWeight: TYPE.weightRegular,
          fontSize: 34,
          letterSpacing: '0.22em',
          textIndent: '0.22em',
          textTransform: 'uppercase',
          color: C.ivory,
          opacity: subIn * 0.94,
          transform: `translateY(${(1 - subIn) * 12}px)`,
        }}
      >
        Ideation Document by Anonymous
      </div>

      {/* the foundation beneath the lock-up, carried into slide 2 */}
      <Canvas>
        <line
          x1={-20}
          y1={LINE.baseY}
          x2={1940}
          y2={LINE.baseY}
          stroke={C.ivory}
          strokeWidth={STROKE.fine}
          opacity={mix(0, 0.5, wipe)}
        />
      </Canvas>
    </AbsoluteFill>
  );
};
