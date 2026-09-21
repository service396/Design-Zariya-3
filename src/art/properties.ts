/**
 * The five properties used on slides 11, 12 and 14.
 *
 * Photographs are dropped into `src/assets/properties/` and named after the
 * property's `key`. A property may carry more than one, numbered in the order
 * they should be used:
 *
 *   src/assets/properties/swabhumi-1.jpg
 *   src/assets/properties/swabhumi-2.jpg
 *   src/assets/properties/udayan-1.jpg      …and so on
 *
 * A bare `key.jpg` is accepted too and sorts first. `.jpg .jpeg .png .webp
 * .avif` are all picked up.
 *
 * Where no photograph exists the frame renders an on-brand placeholder rather
 * than substituting an unrelated building. Every property currently carries
 * at least one, so no placeholder is showing.
 *
 * City Centre and Bhagirathi Neotia each have more than one branch, so any
 * file dropped in must be the branch the client has approved. The Bhagirathi
 * Neotia photographs currently in the folder carry the Neotia Bhagirathi
 * Women and Child Care Centre signage on the façade.
 */

const files = import.meta.glob('../assets/properties/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** key -> every supplied shot, in filename order. */
const byKey: Record<string, string[]> = {};
for (const path of Object.keys(files).sort()) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
  const key = name.replace(/-\d+$/, '');
  (byKey[key] ||= []).push(files[path]);
}

export type Property = {
  key: string;
  label: string;
  /** The lead photograph. Resolved only when one has been supplied. */
  src?: string;
  /** Every supplied photograph of this property, lead first. */
  shots: string[];
};

const P = (key: string, label: string): Property => {
  const shots = byKey[key] ?? [];
  return { key, label, src: shots[0], shots };
};

export const PROPERTIES: Property[] = [
  P('udayan', 'Udayan'),
  P('city-centre', 'City Centre'),
  P('ecospace', 'Ecospace'),
  P('bhagirathi-neotia', 'Bhagirathi Neotia'),
  P('swabhumi', 'Swabhumi'),
];

const byKeyLookup: Record<string, Property> = Object.fromEntries(
  PROPERTIES.map((p) => [p.key, p]),
);

/** Fetch a property by key. Throws at build time if the key is wrong. */
export const property = (key: string): Property => {
  const p = byKeyLookup[key];
  if (!p) throw new Error(`Unknown property key: ${key}`);
  return p;
};

/** Slide 11: Swabhumi leads the spread; the rest fill the tile row beneath. */
export const HERO = property('swabhumi');
export const GRID = PROPERTIES.filter((p) => p.key !== HERO.key);

/**
 * Slide 12's montage strip: every supplied photograph, paired with its
 * property so a caption could be attached later. Properties without a
 * photograph are left out rather than represented by a placeholder.
 */
export const MONTAGE: { property: Property; src: string }[] = PROPERTIES.flatMap((p) =>
  p.shots.map((src) => ({ property: p, src })),
);

/** True once every property has at least one verified photograph. */
export const ALL_SUPPLIED = PROPERTIES.every((p) => p.shots.length > 0);

/** Properties still waiting on a photograph, for the README and for checks. */
export const PENDING = PROPERTIES.filter((p) => p.shots.length === 0).map((p) => p.label);
