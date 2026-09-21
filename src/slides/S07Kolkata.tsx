import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, STROKE, TYPE, FILL } from '../design/tokens';
import { ramp, pulse, travel, riseIn, mix } from '../design/motion';
import { Canvas, DrawPath, FillShape } from '../design/Draw';
import { SectionHeader } from '../design/Type';
import { circle } from '../art/places';
import {
  BANK, WATER, ANCHOR, ground, river, riverFill, bridge, colonial, pavilion,
  anchorBlock, towers, treesFront, figuresOnGhat, figuresOnBank, boats, streetDetail,
} from '../art/city';

/**
 * Slide 7 — Kolkata as space.
 * The landmarks here establish the city. They are not attributed to any
 * developer, and no claim is made about who built them.
 */

const L1 = { at: 0, dur: 42 };
const L2 = { at: 22, dur: 52 };
const L3 = { at: 62, dur: 38 };

export const S07Kolkata: React.FC<SlideProps> = ({ frame, global, build, since }) => {
  const g = ground();
  const riv = river();
  const br = bridge();
  const col = colonial();
  const pav = pavilion();
  const anc = anchorBlock();
  const tow = towers();
  const trees = treesFront();
  const ghat = figuresOnGhat();
  const bank = figuresOnBank();
  const bt = boats();
  const street = streetDetail();

  /* ambient: one river highlight, one tree, one boat */
  const shimmer = pulse(global, 330);
  const leaf = pulse(global, 290);
  const boatX = -300 + travel(global, 1080) * (1920 + 620);


  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Canvas>
          {/* layer 1 · ground and river edge */}
          <FillShape d={riverFill} frame={frame} at={L1.at + 12} dur={34} fill={FILL.shade1} />
          {g.map((d, i) => (
            <DrawPath key={`g${i}`} d={d} frame={frame} at={L1.at + i * 1.3} dur={L1.dur} width={i < 2 ? STROKE.line : STROKE.fine} opacity={i < 2 ? 1 : 0.72} />
          ))}
          <g opacity={0.46 + shimmer * 0.2}>
            {riv.map((d, i) => (
              <DrawPath key={`r${i}`} d={d} frame={frame} at={L1.at + 18 + i * 1.1} dur={26} width={STROKE.hair} />
            ))}
          </g>
          <rect
            x={-40}
            y={WATER + 26}
            width={1960}
            height={64}
            fill={C.terracottaLift}
            opacity={ramp(frame, 34, 28) * (0.05 + shimmer * 0.06)}
          />

          {/* layer 2 · architecture */}
          <FillShape d={`M884,542 L1282,542 L1282,${BANK} L884,${BANK} Z`} frame={frame} at={L2.at + 24} fill={FILL.shade1} />
          <FillShape d={`M${ANCHOR.x},${ANCHOR.y} L${ANCHOR.x + ANCHOR.w},${ANCHOR.y} L${ANCHOR.x + ANCHOR.w},${BANK} L${ANCHOR.x},${BANK} Z`} frame={frame} at={L2.at + 30} fill={FILL.shade2} />
          <FillShape d={`M1548,${BANK - 392} L1676,${BANK - 392} L1676,${BANK} L1548,${BANK} Z`} frame={frame} at={L2.at + 34} fill={FILL.shade1} />
          {br.map((d, i) => (
            <DrawPath key={`b${i}`} d={d} frame={frame} at={L2.at + i * 0.9} dur={L2.dur} width={i < 3 ? STROKE.line : STROKE.fine} opacity={i < 3 ? 1 : 0.8} />
          ))}
          {pav.map((d, i) => (
            <DrawPath key={`p${i}`} d={d} frame={frame} at={L2.at + 10 + i * 1.2} dur={34} width={STROKE.fine} opacity={0.72} />
          ))}
          {col.map((d, i) => (
            <DrawPath key={`c${i}`} d={d} frame={frame} at={L2.at + 6 + i * 0.6} dur={34} width={i < 6 ? STROKE.line : STROKE.hair} opacity={i < 6 ? 1 : 0.86} />
          ))}
          {tow.map((d, i) => (
            <DrawPath key={`t${i}`} d={d} frame={frame} at={L2.at + 14 + i * 0.5} dur={34} width={i % 6 === 0 ? STROKE.line : STROKE.hair} opacity={0.9} />
          ))}
          {anc.map((d, i) => (
            <DrawPath key={`a${i}`} d={d} frame={frame} at={L2.at + 18 + i * 0.7} dur={34} width={i < 5 ? STROKE.line : STROKE.fine} />
          ))}

          {/* layer 3 · trees, people, boats */}
          {trees.map((t, i) => (
            <g key={`tr${i}`}>
              <FillShape d={t.fill} frame={frame} at={L3.at + i * 3.5} fill={FILL.shade2} />
              {t.trunk.map((d, j) => (
                <DrawPath key={j} d={d} frame={frame} at={L3.at + i * 3.5 + j * 0.9} dur={22} width={STROKE.fine} />
              ))}
              <g
                style={
                  i === 1
                    ? { transform: `rotate(${leaf * 0.7 - 0.35}deg)`, transformOrigin: `868px ${BANK}px` }
                    : undefined
                }
              >
                {t.canopy.map((d, j) => (
                  <DrawPath key={`c${j}`} d={d} frame={frame} at={L3.at + 4 + i * 3.5 + j * 1.1} dur={24} width={STROKE.fine} />
                ))}
              </g>
            </g>
          ))}
          {[...ghat, ...bank].map((p, i) => (
            <g key={`f${i}`}>
              {p.paths.map((d, j) => (
                <DrawPath key={j} d={d} frame={frame} at={L3.at + 10 + i * 2.1 + j * 0.5} dur={18} width={STROKE.fine} />
              ))}
              <DrawPath d={circle(p.head.cx, p.head.cy, p.head.r)} frame={frame} at={L3.at + 10 + i * 2.1} dur={16} width={STROKE.fine} />
            </g>
          ))}
          {bt.still.map((d, i) => (
            <DrawPath key={`s${i}`} d={d} frame={frame} at={L3.at + 18 + i * 1.6} dur={20} width={STROKE.fine} opacity={0.9} />
          ))}
          <g opacity={ramp(frame, L3.at + 24, 20) * 0.9}>
            {bt.drifting(boatX).map((d, i) => (
              <path key={`d${i}`} d={d} fill="none" stroke={C.terracotta} strokeWidth={STROKE.fine} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          {street.map((d, i) => (
            <DrawPath key={`st${i}`} d={d} frame={frame} at={L3.at + 14 + i * 1.1} dur={18} width={STROKE.fine} opacity={0.8} />
          ))}
        </Canvas>
      </div>

      <SectionHeader frame={frame}>Cities</SectionHeader>
    </AbsoluteFill>
  );
};
