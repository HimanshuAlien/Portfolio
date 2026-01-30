# Implementation Plan - Scrollytelling Portfolio

Build a high-performance, cinematic scrollytelling experience using Next.js, Tailwind CSS, Framer Motion, and HTML5 Canvas.

## Goal Description
Create a premium landing page featuring a scroll-linked image sequence of an exploding laptop. The experience relies on a `sticky` canvas element that draws specific frames based on the user's scroll position.

## User Review Required
> [!NOTE]
> **Assets**: Since I do not have the actual 3D render frames of the laptop, I will generate numbered placeholder images (frame_000.webp to frame_143.webp) so the code is functional and testable. You can replace these in `public/frames/` later.

## Proposed Changes

### Project Structure
- Initialize a new Next.js 14 app (App Router) at `portfolio-scrollytelling`.
- Configure `tailwind.config.ts` for the specific colors and fonts.

### Component Architecture

#### `components/LaptopScroll.tsx`
- **Logic**:
    - Use `framer-motion`'s `useScroll` to track vertical scroll progress.
    - Preload images into an `HTMLImageElement[]` array to ensure smooth playback.
    - Render a `<canvas>` element.
    - On `scroll` (or `requestAnimationFrame`), draw the frame corresponding to the current scroll percentage: `frameIndex = Math.floor(scrollY * totalFrames)`.
    - Handle resizing to maintain aspect ratio (contain).
- **Overlays**:
    - Use `motion.div` for text overlays that fade in/out at specific scroll thresholds (0%, 30%, 60%, 90%).

### Pages

#### `app/page.tsx`
- Main entry point.
- Renders the `LaptopScroll` component as the primary content.
- Sets the page height to allow scrolling (e.g., `400vh`).

#### `app/globals.css`
- Reset styles.
- Enforce `#050505` background.
- Configure typography (Inter).

### Asset Generation
- Create a temporary Node.js script to generate 144 placeholder WebP or PNG images into `public/frames/`.

## Verification Plan

### Automated Tests
- Build verification: `npm run build`

### Manual Verification
- Run `npm run dev`.
- Scroll through the page to verify:
    - Canvas stays sticky.
    - Images update smoothly.
    - Text overlays appear at correct scroll positions.
    - Loading screen appears before assets are ready.
