# Design Zariya — ideation deck

A 37-slide, presenter-controlled presentation built with Vite, React and
Remotion. Every slide is code, all text is live, and motion is driven by frame
values, so it plays back the same way every time.

## Run it locally

```
npm install
npm run dev
```

Open the address it prints. Right arrow or click advances, left arrow goes back,
`N` opens the speaker notes, `F` goes fullscreen.

`?slide=12` in the address jumps straight to a slide.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, and import that repository.
3. Leave the settings as they are. `vercel.json` already sets the framework
   (Vite), the build command (`npm run build`) and the output folder (`dist`).
4. **Give the project any name except `design-zariya`.** That name belongs to
   the live site the CLICK HERE button on slide 36 opens, and reusing it would
   overwrite that site. `design-zariya-deck` works.
5. Deploy. Every push to the main branch redeploys automatically.

## What is inside

```
index.html            the page
src/main.tsx          mounts the deck
src/deck/             the player, controls, running order (slides.ts) and notes
src/slides/           one file per slide
src/design/           tokens, type, motion, shared components
src/art/              line drawings and image registers
src/assets/           photographs, films and fonts
public/favicon.svg
vercel.json           Vercel build settings
```

To reorder, add or remove slides, edit `src/deck/slides.ts`.

## Media

Every film is an H.264 MP4, which plays in Chrome, Safari, Firefox and Edge on
desktop and mobile. The films on slides 2, 15, 30 and 35 are silent and loop,
except the opening film on slide 2, which plays once and holds.

To swap a reference film, replace the file in its folder and keep the name:

- Slide 15 — `src/assets/reels/reel-1.mp4`, `reel-2.mp4`, `reel-3.mp4`
- Slide 30 — `src/assets/conversation/1.mp4`, `2.mp4`, `3.mp4`
- Slide 35 — `src/assets/podcast-ref/promo.mp4`

## Notes on the material

The photography of Udayan, Swabhumi, City Centre, Bhagirathi Neotia and
Ecospace is the client's own. Every other image of a person or a room is
generated concept imagery and is marked **Images are for reference only** on
the slide. The experts shown are fictional.

The films on slides 15, 30 and 35 are existing work by other makers, shown as
references for treatment only. They are not our footage and imply no
association with those shows.
