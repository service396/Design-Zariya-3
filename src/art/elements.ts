/**
 * ELEMENTS — asset register.
 *
 * Every image here was generated with Higgsfield for this deck. They are
 * CONCEPT VISUALS: the people are fictional stand-ins, not appointed experts,
 * and the rooms are not Ambuja Neotia properties. No name, credential,
 * affiliation or quotation is attached to any of them anywhere in the deck.
 *
 * Where an expert or room recurs, the follow-up images were generated with
 * the first image as a Higgsfield reference so identity, clothing, setting
 * and light hold:
 *
 *   s27-wide   → s27-closeup, s27-hands        one materials expert, three framings
 *   s28-colour → s28-wall                      the same sage wall, in raking light
 *   s29-sound  → s29-headphones                the same studio
 *   s30-nature → s30-leaf                      the same window light
 *   s31-energy → s32-route                     the same house, its circulation route
 *   s31-order  → s32-shelf                     the same shelving
 *
 * The six full-bleed images were upscaled through Higgsfield to 2K before
 * being fitted to 1920 × 1080.
 */

import s25Expert from '../assets/elements/s25-expert.jpg';
import s26Room from '../assets/elements/s26-room.jpg';
import s27Wide from '../assets/elements/s27-wide.jpg';
import s27Closeup from '../assets/elements/s27-closeup.jpg';
import s27Hands from '../assets/elements/s27-hands.jpg';
import s28Colour from '../assets/elements/s28-colour.jpg';
import s28Wall from '../assets/elements/s28-wall.jpg';
import s29Sound from '../assets/elements/s29-sound.jpg';
import s29Headphones from '../assets/elements/s29-headphones.jpg';
import s30Nature from '../assets/elements/s30-nature.jpg';
import s30Leaf from '../assets/elements/s30-leaf.jpg';
import s31Energy from '../assets/elements/s31-energy.jpg';
import s31Order from '../assets/elements/s31-order.jpg';
import s32Route from '../assets/elements/s32-route.jpg';
import s32Shelf from '../assets/elements/s32-shelf.jpg';
import s33Room from '../assets/elements/s33-room.jpg';

export const EL = {
  expert: s25Expert,
  room: s26Room,
  interviewWide: s27Wide,
  interviewClose: s27Closeup,
  interviewHands: s27Hands,
  colour: s28Colour,
  colourWall: s28Wall,
  sound: s29Sound,
  soundDetail: s29Headphones,
  nature: s30Nature,
  natureLeaf: s30Leaf,
  energy: s31Energy,
  energyRoute: s32Route,
  order: s31Order,
  orderShelf: s32Shelf,
  closingRoom: s33Room,
} as const;
