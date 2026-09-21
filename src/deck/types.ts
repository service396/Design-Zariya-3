import React from 'react';

/** Everything a slide needs. Entrance clock and ambient clock are separate. */
export type SlideProps = {
  /** Frames since this slide entered. Monotonic. Never resets while held. */
  frame: number;
  /** Global monotonic frame. Ambient loops run off this so they never restart. */
  global: number;
  /** Current narrative build index. 0 is the initial state. */
  build: number;
  /** Frames since build i was triggered. -1e9 if it has not been triggered. */
  since: (buildIndex: number) => number;
};

export type SlideDef = {
  id: string;
  title: string;
  /** Number of presenter-controlled states, including the initial one. */
  builds: number;
  /** Speaker's purpose. Shown in the notes panel, never on the slide. */
  notes: string;
  component: React.FC<SlideProps>;
};
