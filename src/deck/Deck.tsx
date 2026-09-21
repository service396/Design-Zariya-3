import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { DeckStage, DeckCue, DECK_DURATION, DECK_SIZE } from './DeckStage';
import { SLIDES } from './slides';
import { C, D, TYPE } from '../design/tokens';

/** Far enough in the past that every entrance and build reads as finished. */
const SETTLED = 900;

const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
const PREVIEW = params.get('preview') === '1';
const DWELL = Number(params.get('dwell') ?? 150);
const START_AT = Math.max(0, Number(params.get('slide') ?? 1) - 1);

export const Deck: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [build, setBuild] = useState(0);
  const [cue, setCue] = useState<DeckCue>({
    slide: START_AT,
    prevSlide: -1,
    slideStart: 0,
    prevStart: 0,
    transitionStart: -1e9,
    buildFrames: [0],
    prevBuildFrames: [0],
    prevBuild: 0,
  });
  const [notesOpen, setNotesOpen] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);

  const cueRef = useRef(cue);
  cueRef.current = cue;
  const buildRef = useRef(build);
  buildRef.current = build;

  const now = () => playerRef.current?.getCurrentFrame() ?? 0;

  /** True while a slide change is still crossfading. Blocks stacked input. */
  const busy = useCallback(() => now() - cueRef.current.transitionStart < D.slideChange, []);

  const goToSlide = useCallback((index: number, settled: boolean) => {
    const f = now();
    const c = cueRef.current;
    const target = Math.min(SLIDES.length - 1, Math.max(0, index));
    const def = SLIDES[target];
    const lastBuild = settled ? def.builds - 1 : 0;
    setCue({
      slide: target,
      prevSlide: c.slide,
      prevStart: c.slideStart,
      prevBuild: buildRef.current,
      prevBuildFrames: c.buildFrames,
      slideStart: settled ? f - SETTLED : f,
      transitionStart: f,
      buildFrames: settled
        ? Array.from({ length: def.builds }, (_, i) => f - SETTLED + i * 20)
        : [f],
    });
    setBuild(lastBuild);
  }, []);

  const advance = useCallback(() => {
    if (busy()) return;
    const f = now();
    const c = cueRef.current;
    const def = SLIDES[c.slide];
    if (buildRef.current < def.builds - 1) {
      const next = buildRef.current + 1;
      setCue({ ...c, buildFrames: [...c.buildFrames.slice(0, next), f] });
      setBuild(next);
      return;
    }
    if (c.slide < SLIDES.length - 1) goToSlide(c.slide + 1, false);
  }, [busy, goToSlide]);

  const back = useCallback(() => {
    if (busy()) return;
    const c = cueRef.current;
    if (buildRef.current > 0) {
      setBuild(buildRef.current - 1);
      setCue({ ...c, buildFrames: c.buildFrames.slice(0, buildRef.current) });
      return;
    }
    if (c.slide > 0) goToSlide(c.slide - 1, true);
  }, [busy, goToSlide]);

  const restart = useCallback(() => {
    const f = now();
    setCue({
      slide: 0,
      prevSlide: -1,
      slideStart: f,
      prevStart: f,
      prevBuild: 0,
      prevBuildFrames: [f],
      transitionStart: -1e9,
      buildFrames: [f],
    });
    setBuild(0);
  }, []);

  const fullscreen = useCallback(() => {
    const el = document.documentElement;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }, []);

  /* keep the clock running ---------------------------------------- */
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    p.play();
    const kick = () => p.play();
    window.addEventListener('pointerdown', kick, { once: true });
    return () => window.removeEventListener('pointerdown', kick);
  }, []);

  /* input ---------------------------------------------------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        back();
      } else if (e.key === 'n' || e.key === 'N') setNotesOpen((v) => !v);
      else if (e.key === 'f' || e.key === 'F') fullscreen();
      else if (e.key === 'r' || e.key === 'R') restart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance, back, fullscreen, restart]);

  /* discreet controls, hidden while presenting ---------------------- */
  useEffect(() => {
    let timer: number;
    const show = () => {
      setUiVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setUiVisible(false), 2200);
    };
    show();
    window.addEventListener('mousemove', show);
    return () => {
      window.removeEventListener('mousemove', show);
      window.clearTimeout(timer);
    };
  }, []);

  /* timed preview mode, separate from live behaviour ---------------- */
  useEffect(() => {
    if (!PREVIEW) return;
    const id = window.setInterval(() => {
      const c = cueRef.current;
      const last = c.slide === SLIDES.length - 1 && buildRef.current === SLIDES[c.slide].builds - 1;
      if (last) restart();
      else advance();
    }, (DWELL / DECK_SIZE.fps) * 1000);
    return () => window.clearInterval(id);
  }, [advance, restart]);

  const inputProps = useMemo(() => ({ cue, build }), [cue, build]);
  const def = SLIDES[cue.slide];

  return (
    <div
      onClick={advance}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#141210',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: uiVisible ? 'default' : 'none',
        overflow: 'hidden',
      }}
    >
      <Player
        ref={playerRef}
        component={DeckStage}
        inputProps={inputProps}
        durationInFrames={DECK_DURATION}
        compositionWidth={DECK_SIZE.width}
        compositionHeight={DECK_SIZE.height}
        fps={DECK_SIZE.fps}
        controls={false}
        autoPlay
        loop={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />

      {/* speaker notes, outside the projected frame */}
      {notesOpen && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '18px 26px',
            background: 'rgba(20,18,16,0.94)',
            color: '#E8E2D6',
            fontFamily: TYPE.family,
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.5,
            borderTop: `1px solid ${C.terracottaDeep}`,
            zIndex: 20,
          }}
        >
          <span style={{ color: C.terracottaLift, letterSpacing: '0.16em', fontSize: 13, fontWeight: 600 }}>
            {String(cue.slide + 1).padStart(2, '0')} · {def.title.toUpperCase()} · BUILD {build + 1}/{def.builds}
          </span>
          <div style={{ marginTop: 6 }}>{def.notes}</div>
        </div>
      )}

      {/* discreet controls */}
      <div
        style={{
          position: 'fixed',
          right: 20,
          bottom: notesOpen ? 108 : 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: uiVisible ? 1 : 0,
          transition: 'opacity 320ms ease',
          pointerEvents: uiVisible ? 'auto' : 'none',
          zIndex: 21,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Pill>{String(cue.slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</Pill>
        <Btn onClick={back} label="Previous">‹</Btn>
        <Btn onClick={advance} label="Next">›</Btn>
        <Btn onClick={() => setNotesOpen((v) => !v)} label="Notes">N</Btn>
        <Btn onClick={restart} label="Restart">↺</Btn>
        <Btn onClick={fullscreen} label="Fullscreen">⤢</Btn>
      </div>
    </div>
  );
};

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: TYPE.family,
      fontSize: 12,
      letterSpacing: '0.18em',
      fontWeight: 600,
      color: '#BFB6A6',
      padding: '8px 12px',
      border: '1px solid rgba(191,182,166,0.28)',
      borderRadius: 999,
    }}
  >
    {children}
  </span>
);

const Btn: React.FC<{ children: React.ReactNode; onClick: () => void; label: string }> = ({
  children,
  onClick,
  label,
}) => (
  <button
    aria-label={label}
    title={label}
    onClick={onClick}
    style={{
      width: 38,
      height: 38,
      borderRadius: 999,
      border: '1px solid rgba(191,182,166,0.28)',
      background: 'rgba(30,27,24,0.7)',
      color: '#D7CFC0',
      fontSize: 16,
      cursor: 'pointer',
      lineHeight: 1,
      fontFamily: TYPE.family,
    }}
  >
    {children}
  </button>
);
