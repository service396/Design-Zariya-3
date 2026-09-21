import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SlideProps } from '../deck/types';
import { C, SAFE, TYPE } from '../design/tokens';
import { ramp, EASE_IN_OUT } from '../design/motion';
import { FullPhoto, Scrim } from '../design/Elements';
import { ReferenceNote } from '../design/Type';
import { EL } from '../art/elements';

/**
 * Slide 33 — look again.
 *
 * Everything on entry, in reading order: the statement, the list, then
 * LOOK AGAIN and its sentence, with the photograph easing 2% closer as they
 * land and then settling completely. No presenter build.
 */

export const S33LookAgain: React.FC<SlideProps> = ({ frame }) => {
  const bg = ramp(frame, 0, 16);
  const statement = ramp(frame, 4, 14);
  const list = ramp(frame, 9, 14); // about 0.3s behind the statement
  const look = ramp(frame, 22, 16);
  const closing = ramp(frame, 32, 14);
  const push = 0.02 * ramp(frame, 22, 40, EASE_IN_OUT);

  return (
    <AbsoluteFill style={{ backgroundColor: C.ivory }}>
      <FullPhoto
        src={EL.closingRoom}
        alt="A quiet living room"
        reveal={bg}
        focus="50% 50%"
        push={push}
        origin="75% 55%"
      />
      <Scrim tone="light" strength={0.8} reach={62} opacity={bg} />

      <div style={{ position: 'absolute', left: SAFE, top: 170, width: 900 }}>
        <p
          style={{
            margin: 0,
            fontFamily: TYPE.family,
            fontSize: 52,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.2,
            color: C.charcoal,
            opacity: statement,
            transform: `translateY(${(1 - statement) * 12}px)`,
          }}
        >
          Design doesn’t end
          <br />
          when the room is finished.
        </p>

        <p
          style={{
            margin: '40px 0 0',
            fontFamily: TYPE.family,
            fontSize: 32,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.55,
            color: C.terracottaDeep,
            opacity: list,
            transform: `translateY(${(1 - list) * 8}px)`,
          }}
        >
          A colour. A plant. A song.
          <br />
          A ritual. A rearranged chair.
        </p>
      </div>

      <div style={{ position: 'absolute', left: SAFE, top: 620, width: 800 }}>
        <div style={{ width: 120 * look, height: 2, background: C.terracotta, opacity: 0.8 }} />
        <h1
          style={{
            margin: '34px 0 0',
            fontFamily: TYPE.family,
            fontSize: 86,
            fontWeight: TYPE.weightLight,
            letterSpacing: '0.18em',
            lineHeight: 1,
            color: C.charcoal,
            opacity: look,
            transform: `translateY(${(1 - look) * 12}px)`,
          }}
        >
          LOOK AGAIN.
        </h1>
        <p
          style={{
            margin: '30px 0 0',
            fontFamily: TYPE.family,
            fontSize: 30,
            fontWeight: TYPE.weightLight,
            lineHeight: 1.45,
            color: C.charcoalSoft,
            opacity: closing,
          }}
        >
          Your space is trying to have a conversation with you.
        </p>
      </div>

      <ReferenceNote frame={frame} at={24} />
    </AbsoluteFill>
  );
};
