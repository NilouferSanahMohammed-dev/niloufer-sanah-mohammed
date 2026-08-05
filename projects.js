/**
 * Every project card on the site is generated from this array.
 * Add a new project by adding a new object here, nothing else needs
 * to change, the strip picks it up automatically.
 *
 * This used to be pulled live from the GitHub API instead of kept
 * here by hand, but that had a real bug: when a repo's second README
 * paragraph was too long, the description silently fell back to
 * duplicating the tagline, so cards showed the same text twice with a
 * big gap in between. A static, hand-written list doesn't have that
 * failure mode, and it's easy enough to keep in sync by hand.
 */

const PROJECTS = [
  {
    name: "jarvis",
    tagline: "a voice-activated HUD assistant",
    description:
      "A holographic interface you talk to, hands-free with a \"hey jarvis\" wake word or by tapping the core. Remembers your name, answers real questions, checks live weather, sets reminders, drafts emails, and can hold an actual open-ended conversation. It also reads tasks from daily-deck and greets you with what's on your plate for the day.",
    tags: ["Web Speech API", "JavaScript", "Voice Assistant"],
    live: "https://niloufersanahmohammed-dev.github.io/jarvis/",
    flagship: true,
  },
  {
    name: "digibouquet",
    tagline: "build a bouquet, send it to someone",
    description:
      "Pick flowers, colors, wrapping, and a ribbon, write a little note, then send it as a link through your own email or messages app. The whole design lives in the link itself, no accounts, no backend, and every flower is original SVG artwork.",
    tags: ["SVG", "JavaScript"],
    live: "https://niloufersanahmohammed-dev.github.io/digibouquet/",
  },
  {
    name: "daily-deck",
    tagline: "a cozy Notion-style task manager that actually talks to jarvis",
    description:
      "Custom lists, due dates, notes per task, and calendar import via .ics files. It genuinely connects to jarvis, no API, just a shared browser storage key, since all my projects live on the same domain.",
    tags: ["LocalStorage", "Notion-style UI", "Calendar Import"],
    live: "https://niloufersanahmohammed-dev.github.io/daily-deck/",
  },
  {
    name: "handjam",
    tagline: "play music by moving your hand in front of a webcam",
    description:
      "Real-time hand tracking (MediaPipe, running entirely in the browser) mapped to a live synth, guitar, piano, and bells. A second hand controls a filter sweep, and there's a guided \"learn a song\" mode.",
    tags: ["Computer Vision", "Tone.js", "MediaPipe"],
    live: "https://niloufersanahmohammed-dev.github.io/handjam/",
  },
  {
    name: "pixel-arcade",
    tagline: "16 fully playable retro games in one arcade",
    description:
      "Snake, Pong, Breakout, 2048, Minesweeper, an unbeatable Tic-Tac-Toe AI, and more, all built on a plugin-style architecture so new games drop in as single files.",
    tags: ["Canvas", "Game Architecture"],
    live: "https://niloufersanahmohammed-dev.github.io/pixel-arcade/",
  },
  {
    name: "the cookbook",
    tagline: "recipes from all over the world, old and new, fully yours to edit",
    description:
      "Started as a mood-based soup picker, grew into a real personal cookbook. Two dozen real recipes to start, custom categories, add your own recipes, edit or delete anything including the built-ins, and a look you can recolor to match your kitchen.",
    tags: ["JavaScript", "CSS", "LocalStorage"],
    live: "https://niloufersanahmohammed-dev.github.io/soup-of-the-day/",
  },
  {
    name: "pixel-tamagotchi",
    tagline: "a little plant buddy that grows the more you care for it",
    description:
      "A tiny virtual plant drawn entirely in pixel art on canvas, no image files at all. Water it, give it sunlight, watch it grow from a bare sprout into a full bloom, with a cute face right on the pot that stays put as the plant above it changes.",
    tags: ["Canvas", "Game Logic"],
    live: "https://niloufersanahmohammed-dev.github.io/pixel-tamagotchi/",
  },
  {
    name: "vinyl-now-playing",
    tagline: "your Spotify track, spinning on a vinyl record",
    description:
      "A realistic spinning record widget that shows whatever's currently playing, with a demo mode out of the box and a documented path to wire up real Spotify data.",
    tags: ["Spotify API", "Vercel"],
    live: "https://niloufersanahmohammed-dev.github.io/vinyl-now-playing/",
  },
  {
    name: "read-shelf",
    tagline: "a personal bookshelf that looks like a real one",
    description:
      "Books render as spines with heights and widths derived from their titles, so the shelf looks organically uneven. Click a spine to flip it open, change its shelf, or leave a note.",
    tags: ["LocalStorage", "JavaScript"],
    live: "https://niloufersanahmohammed-dev.github.io/read-shelf/",
  },
  {
    name: "aesthetic-pomodoro",
    tagline: "a focus timer with rain, cafe, and forest scenes",
    description:
      "The ambient sound isn't audio files, it's generated live with the Web Audio API from filtered noise, so it never exactly repeats and the whole thing ships as three small text files.",
    tags: ["Web Audio API", "CSS Animation"],
    live: "https://niloufersanahmohammed-dev.github.io/aesthetic-pomodoro/",
  },
  {
    name: "stardust-wishlist",
    tagline: "a shareable wishlist under a starry sky",
    description:
      "Send a link, people claim gifts without spoiling the surprise for whoever owns the list. A starfield background with an occasional shooting star for atmosphere.",
    tags: ["JavaScript", "LocalStorage"],
    live: "https://niloufersanahmohammed-dev.github.io/stardust-wishlist/",
  },
];
