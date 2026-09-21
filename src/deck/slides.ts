import { SlideDef } from './types';
import { S00Hello } from '../slides/S00Hello';
import { S01Opening } from '../slides/S01Opening';
import { S02Brief } from '../slides/S02Brief';
import { S03Decoding } from '../slides/S03Decoding';
import { S04Essentials } from '../slides/S04Essentials';
import { S06WhatIsSpace } from '../slides/S06WhatIsSpace';
import { S07ExploringSpaces } from '../slides/S07ExploringSpaces';
import { S07Kolkata } from '../slides/S07Kolkata';
import { S08Places } from '../slides/S08Places';
import { S09Life } from '../slides/S09Life';
import { S11CityAsSpace } from '../slides/S11CityAsSpace';
import { S12BuiltWithPurpose } from '../slides/S12BuiltWithPurpose';
import { S13EverySpace } from '../slides/S13EverySpace';
import { S14OnePlace } from '../slides/S14OnePlace';
import { S15Storytelling } from '../slides/S15Storytelling';
import { S16People } from '../slides/S16People';
import { S17Questions } from '../slides/S17Questions';
import { S18Specific } from '../slides/S18Specific';
import { S19Coverage } from '../slides/S19Coverage';
import { S20Logo } from '../slides/S20Logo';
import { S21BuildingTomorrow } from '../slides/S21BuildingTomorrow';
import { S22Ideas } from '../slides/S22Ideas';
import { S23OneConversation } from '../slides/S23OneConversation';
import { S24MoreThanYouSee } from '../slides/S24MoreThanYouSee';
import { S25Elements } from '../slides/S25Elements';
import { S26FeelRight } from '../slides/S26FeelRight';
import { S27OneExpert } from '../slides/S27OneExpert';
import { S28Colour } from '../slides/S28Colour';
import { S29Sound } from '../slides/S29Sound';
import { S30Nature } from '../slides/S30Nature';
import { S31TwoMore } from '../slides/S31TwoMore';
import { S32FiveElements } from '../slides/S32FiveElements';
import { S33LookAgain } from '../slides/S33LookAgain';
import { S34ConversationStyle } from '../slides/S34ConversationStyle';
import { S35PodcastReference } from '../slides/S35PodcastReference';
import { S36Explore } from '../slides/S36Explore';
import { S37ThankYou } from '../slides/S37ThankYou';

export const SLIDES: SlideDef[] = [
  {
    id: 's01',
    title: 'Hello',
    builds: 1,
    notes:
      'The greeting. One word on ivory, with the ground line the rest of the deck is built on drawing across beneath it. Hold it while the room settles, say hello yourself, then move on. Nothing to advance through.',
    component: S00Hello,
  },
  {
    id: 's02',
    title: 'Opening',
    builds: 1,
    notes: 'The opening film plays once (about 11 seconds) and then holds on the lock-up. Let it finish before you speak. ?opening=drawn swaps in the condensed built-in version if the file will not play on the machine.',
    component: S01Opening,
  },
  {
    id: 's03',
    title: 'The Brief',
    builds: 1,
    notes: 'This is what we have been asked to build.',
    component: S02Brief,
  },
  {
    id: 's04',
    title: 'Decoding the Brief',
    builds: 4,
    notes:
      'We have interpreted the brief through its guiding principle, the spaces it encompasses, and the purpose connecting them. Advance three times: Guideline, Spaces, Purpose.',
    component: S03Decoding,
  },
  {
    id: 's05',
    title: 'The Absolute Essentials',
    builds: 5,
    notes:
      'These are the principles we need to carry into every creative decision. Opens on the heading alone; one advance per principle, four in all.',
    component: S04Essentials,
  },
  {
    id: 's06',
    title: 'What is Space?',
    builds: 1,
    notes:
      'Before deciding how to explore space, we need to ask what we mean by it. The boundary closes into a whole volume as you ask it. Let it land.',
    component: S06WhatIsSpace,
  },
  {
    id: 's07',
    title: 'Exploring Spaces',
    builds: 2,
    notes:
      'The volume comes apart and the words take its place. Advance once for the line beneath: deconstructing the essential perspectives of space.',
    component: S07ExploringSpaces,
  },
  {
    id: 's08',
    title: 'Kolkata: the City as Space',
    builds: 1,
    notes:
      'A city is a space. Kolkata is shaped by culture, memory, movement and everyday life. Ambuja Neotia has contributed to this wider urban story. These landmarks establish the city; they are not attributed to any developer. The panorama builds over about four seconds, so give it room before you speak.',
    component: S07Kolkata,
  },
  {
    id: 's09',
    title: 'The Places Within the City',
    builds: 2,
    notes:
      'Within cities are individual places. Each has an intention, a history, decisions, challenges and possibilities. Advance once for the second group of five. These are conceptual drawings, not named properties.',
    component: S08Places,
  },
  {
    id: 's10',
    title: 'The Life Within the Space',
    builds: 3,
    notes:
      'A physical structure is one level of space. What happens inside it is another: the people, rituals, relationships, atmosphere and feelings that make it feel right. Three scenes: calm and focus, work and making, belonging and gathering. Hold the last one.',
    component: S09Life,
  },
  {
    id: 's11',
    title: 'The City as Space',
    builds: 1,
    notes:
      'Kolkata is our starting point, and Bengal widens the story. Swabhumi leads the spread; Udayan, City Centre, Ecospace and Bhagirathi Neotia sit beneath it. The slide is deliberately static: everything is on screen at once, so talk across it.',
    component: S11CityAsSpace,
  },
  {
    id: 's12',
    title: 'Built with Purpose',
    builds: 1,
    notes:
      'The montage runs once, about three seconds, and lands on the segment name. Let it finish, then speak. It does not repeat while you hold.',
    component: S12BuiltWithPurpose,
  },
  {
    id: 's13',
    title: 'Every Space Started with a Purpose',
    builds: 1,
    notes:
      'Four questions guide every film: the need, the vision, the making, the impact. The whole slide, closing line included, arrives on entry — no advance needed. Let it settle, then talk across it.',
    component: S13EverySpace,
  },
  {
    id: 's14',
    title: 'One Place. Many Stories.',
    builds: 2,
    notes:
      'Bhagirathi Neotia is the worked example. One documentary per place, and a set of shorter reels drawn from it. Explain the full film first, then advance to bring in the reels, the formats and the platforms. The three portraits are illustrative of the kind of footage a reel would carry; they are not photographs of this facility, so do not describe them as such.',
    component: S14OnePlace,
  },
  {
    id: 's15',
    title: 'The Storytelling We Envision',
    builds: 1,
    notes:
      'Three reference films showing the intended shooting style and treatment. They loop silently at their own speeds. Hold here for as long as you need.',
    component: S15Storytelling,
  },
  {
    id: 's16',
    title: 'Celebrating the People Behind the Vision',
    builds: 1,
    notes:
      'This opens the human half of Built with Purpose: from the city, to its places, to the people who made them. Words only, no photograph — let the line land and then hold it. Everything is on screen within a second.',
    component: S16People,
  },
  {
    id: 's17',
    title: 'The People. The Decisions. The Details.',
    builds: 1,
    notes:
      'The format: firsthand accounts from people who actually made and run these places. Three questions open every conversation — the vision, the challenge, the personal story. The strip beneath shows the three kinds of expertise we would film: architecture and planning, healthcare and laboratory, project execution and operations. All three photographs are concept visuals of fictional professionals. Attach no name, title or quotation to them.',
    component: S17Questions,
  },
  {
    id: 's18',
    title: 'Specific Questions. Personal Perspectives.',
    builds: 1,
    notes:
      'This is the level of specificity that makes a conversation worth watching. The whole slide arrives on entry — no advance — so take the laboratory panel first and then move across to City Centre in your own time. Both photographs are concept visuals of fictional professionals: the left is not the Bhagirathi Neotia laboratory and the right is not a reconstruction of City Centre. The embryology lab is a proposed subject — confirm the facility, the team and the project history before any specific achievement is attributed. The Charles Correa question is written for a verified former collaborator; if the interviewee did not work with him, ask instead about the intent behind the open spaces and how they work today. On City Centre, talk about the open-air spaces, the pedestrian routes and the cross-ventilation. Do not use the "India’s first naturally air-conditioned mall" line — it is unverified.',
    component: S18Specific,
  },
  {
    id: 's19',
    title: 'How the Conversations Will Look',
    builds: 1,
    notes:
      'The filming treatment: three perspectives cut from one sitting, not three separate shoots. Close-up for recollection, three-quarter for conversation, environmental for the person within the place. These are stills, deliberately — nothing here simulates speech. Same fictional expert throughout, generated from one master setup.',
    component: S19Coverage,
  },
  {
    id: 's20',
    title: 'A Space Is Much More Than What You See',
    builds: 1,
    notes:
      'The turn from the city into what it feels like to be inside a room. Let the frame draw and the statement land; the empty space inside the frame is the point. The next slide opens its photograph from this same frame. This opens ELEMENTS, straight after the people section.',
    component: S24MoreThanYouSee,
  },
  {
    id: 's21',
    title: 'Elements',
    builds: 1,
    notes:
      'Introduce the series: ELEMENTS, and the question it keeps asking. The woman pictured is a concept visual — a fictional expert generated for this deck, not an appointed specialist. Do not name her or attach a credential.',
    component: S25Elements,
  },
  {
    id: 's22',
    title: 'What Makes a Space Feel Right?',
    builds: 1,
    notes:
      'Name the six feelings the audience already recognises: calm, warmth, energy, balance, personality, breath. The sentence that says this is what Elements explores follows on its own — no advance. The room is a generated concept visual.',
    component: S26FeelRight,
  },
  {
    id: 's23',
    title: 'One Element. One Expert.',
    builds: 1,
    notes:
      'The format in three beats, each arriving with its picture: one element, one expert, one new way to see a space. How it is filmed — talking heads, supported by details and demonstrations in the space — follows on its own; no advance. All three pictures are one fictional expert generated for this deck; he is not a real specialist.',
    component: S27OneExpert,
  },
  {
    id: 's24',
    title: '01 / Colour',
    builds: 1,
    notes:
      'The first element. A colour specialist and an interior designer on tone, light and the feeling they create together. The pictured specialist is a concept visual of a fictional expert; the swatches carry no brand.',
    component: S28Colour,
  },
  {
    id: 's25',
    title: '02 / The Sounds of Serenity',
    builds: 1,
    notes:
      'Take the experience of space beyond what we see. No sound plays on this slide — describe it. The pictured sound designer is a concept visual of a fictional expert.',
    component: S29Sound,
  },
  {
    id: 's26',
    title: '03 / Breathing Spaces',
    builds: 1,
    notes:
      'Living greenery as part of how a room feels: plants, light and care. The pictured landscape specialist is a concept visual of a fictional expert.',
    component: S30Nature,
  },
  {
    id: 's27',
    title: 'Two More Ways to Feel a Space',
    builds: 1,
    notes:
      'Both panels arrive on entry, energy flow then less is more. Frame Feng Shui as the practitioner\u2019s perspective on placement, flow and balance — how a room invites you to move, pause or settle — not as an established scientific mechanism. Both people pictured are concept visuals of fictional experts.',
    component: S31TwoMore,
  },
  {
    id: 's28',
    title: 'Five Elements',
    builds: 1,
    notes:
      'The framework, all at once: colour, sound, nature, energy, order. Each picture is a detail from the element slide that introduced it, so the audience recognises all five. Hold here as long as you need.',
    component: S32FiveElements,
  },
  {
    id: 's29',
    title: 'Look Again',
    builds: 1,
    notes:
      'Close the vertical by handing the idea back to the audience. Everything arrives on entry, LOOK AGAIN last; no advance. Let it land before you speak. The room is a generated concept visual.',
    component: S33LookAgain,
  },
  {
    id: 's30',
    title: 'The Conversation Style',
    builds: 1,
    notes:
      'Three real interview references showing the intended talking-head treatment, running silently side by side and looping for as long as you hold: a dark studio with burned-in kinetic captions, a bright studio cutting between a wide and a close-up, and a location walk-and-talk through a built project. These are existing films by other makers, supplied as references for treatment only. Say so: they are here for framing, lighting and cutting, not as our footage and not as anyone’s endorsement. Talk across them.',
    component: S34ConversationStyle,
  },
  {
    id: 's31',
    title: 'Building Tomorrow — Logo Reveal',
    builds: 1,
    notes:
      'The six-second reveal runs once on entry and then holds on the finished mark. Let it play out in silence — it is a single thread: three dots in conversation become buildings, the buildings become a city, and the city closes into a microphone. Landing on the name is the whole point, so do not talk over the last two seconds. The wordmark is set in the deck typeface as a proposed lock-up; if an approved Building Tomorrow asset exists, it drops straight in.',
    component: S20Logo,
  },
  {
    id: 's32',
    title: 'Building Tomorrow',
    builds: 1,
    notes:
      'The title card. The same mark as the previous slide, built in about two seconds — base, name, then the microphone drawn on — and then still. Name the podcast here and let the byline sit; the next slide explains it.',
    component: S21BuildingTomorrow,
  },
  {
    id: 's33',
    title: 'The Ideas That Move Us Forward',
    builds: 1,
    notes:
      'What the podcast is: founder-led, about the ideas and decisions shaping our cities and Bengal. The whole slide arrives on entry — no advance — with the conversation drawing itself beside the copy. Let it settle, then talk across it. The drawing is a line illustration, not a set design; do not describe it as a studio.',
    component: S22Ideas,
  },
  {
    id: 's34',
    title: 'One Conversation. Every Week.',
    builds: 1,
    notes:
      'The publishing rhythm: one 30 to 40 minute conversation a week on YouTube, and the sharp moments cut out of it for the vertical feeds. The whole slide arrives on entry, left to right — no advance — so take the full conversation first and then move across in your own time. The frames hold schematic drawings, not stills from the teaser; say they are indicative of framing, not footage.',
    component: S23OneConversation,
  },
  {
    id: 's35',
    title: 'The Podcast We Envision',
    builds: 1,
    notes:
      'The format reference: one existing show running silently and looping for as long as you hold. Point at what we are borrowing — the guest at the microphone, the bold kinetic captions burned in, the cutaways to whatever is being talked about. It is someone else’s film and the line beneath the frame says so; say it out loud too, so nobody takes it as our footage or as an association with that show.',
    component: S35PodcastReference,
  },
  {
    id: 's36',
    title: 'Let’s Explore the Space',
    builds: 1,
    notes:
      'The hand-off. CLICK HERE is a live link: click it and the working site opens in a new tab at the story section. It only works in the running deck, not in the PDF, so if you are presenting from the PDF read the address out or send it across instead. Come back to the deck with alt-tab, not the back button.',
    component: S36Explore,
  },
  {
    id: 's37',
    title: 'Thank You',
    builds: 1,
    notes:
      'The same card the deck opened on. Land it, stop talking, and take questions. This is the last slide.',
    component: S37ThankYou,
  },
];
