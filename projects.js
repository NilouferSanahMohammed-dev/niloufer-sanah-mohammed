/**
 * Every project card on the site is generated from this array.
 * Add a new project by adding a new object here, nothing else needs
 * to change, the grid picks it up automatically.
 */

const PROJECTS = [
  {
    name: "handjam",
    tagline: "play music by moving your hand in front of a webcam",
    description:
      "Real-time hand tracking (MediaPipe, running entirely in the browser) mapped to a live synth, guitar, piano, and bells. A second hand controls a filter sweep, and there's a guided \"learn a song\" mode.",
    tags: ["Computer Vision", "Tone.js", "MediaPipe"],
    live: "https://niloufersanahmohammed-dev.github.io/handjam/",
    repo: "https://github.com/NilouferSanahMohammed-dev/handjam",
    featured: true,
  },
  {
    name: "jarvis",
    tagline: "a voice-activated HUD assistant",
    description:
      "A holographic interface you talk to, hands-free with a \"hey jarvis\" wake word or by tapping the core. Remembers your name, answers real questions, checks live weather, sets reminders, and drafts emails.",
    tags: ["Web Speech API", "JavaScript"],
    live: "https://niloufersanahmohammed-dev.github.io/jarvis/",
    repo: "https://github.com/NilouferSanahMohammed-dev/jarvis",
    featured: true,
  },
  {
    name: "pixel-arcade",
    tagline: "16 fully playable retro games in one arcade",
    description:
      "Snake, Pong, Breakout, 2048, Minesweeper, an unbeatable Tic-Tac-Toe AI, and more, all built on a plugin-style architecture so new games drop in as single files.",
    tags: ["Canvas", "Game Architecture"],
    live: "https://niloufersanahmohammed-dev.github.io/pixel-arcade/",
    repo: "https://github.com/NilouferSanahMohammed-dev/pixel-arcade",
    featured: true,
  },
  {
    name: "nova-deck",
    tagline: "a futuristic command dashboard",
    description:
      "Clock, real live weather, a countdown timer, quick tasks, and notes, styled like a spaceship console. Doubles as a genuinely useful new-tab page.",
    tags: ["Open-Meteo API", "CSS"],
    live: "https://niloufersanahmohammed-dev.github.io/nova-deck/",
    repo: "https://github.com/NilouferSanahMohammed-dev/nova-deck",
  },
  {
    name: "vinyl-now-playing",
    tagline: "your Spotify track, spinning on a vinyl record",
    description:
      "A realistic spinning record widget that shows whatever's currently playing, with a demo mode out of the box and a documented path to wire up real Spotify data.",
    tags: ["Spotify API", "Vercel"],
    live: "https://niloufersanahmohammed-dev.github.io/vinyl-now-playing/",
    repo: "https://github.com/NilouferSanahMohammed-dev/vinyl-now-playing",
  },
  {
    name: "read-shelf",
    tagline: "a personal bookshelf that looks like a real one",
    description:
      "Books render as spines with heights and widths derived from their titles, so the shelf looks organically uneven. Click a spine to flip it open, change its shelf, or leave a note.",
    tags: ["LocalStorage", "JavaScript"],
    live: "https://niloufersanahmohammed-dev.github.io/read-shelf/",
    repo: "https://github.com/NilouferSanahMohammed-dev/read-shelf",
  },
  {
    name: "aesthetic-pomodoro",
    tagline: "a focus timer with rain, cafe, and forest scenes",
    description:
      "The ambient sound isn't audio files, it's generated live with the Web Audio API from filtered noise, so it never exactly repeats and the whole thing ships as three small text files.",
    tags: ["Web Audio API", "CSS Animation"],
    live: "https://niloufersanahmohammed-dev.github.io/aesthetic-pomodoro/",
    repo: "https://github.com/NilouferSanahMohammed-dev/aesthetic-pomodoro",
  },
  {
    name: "stardust-wishlist",
    tagline: "a shareable wishlist under a starry sky",
    description:
      "Send a link, people claim gifts without spoiling the surprise for whoever owns the list. A starfield background with an occasional shooting star for atmosphere.",
    tags: ["JavaScript", "LocalStorage"],
    live: "https://niloufersanahmohammed-dev.github.io/stardust-wishlist/",
    repo: "https://github.com/NilouferSanahMohammed-dev/stardust-wishlist",
  },
  {
    name: "soup-of-the-day",
    tagline: "a mood-based soup recipe picker",
    description:
      "Tell it how you're feeling, rainy and cozy, short on time, feeling adventurous, and it hands you a real recipe with an illustrated bowl to match, ingredients you can check off as you cook.",
    tags: ["JavaScript", "CSS"],
    live: "https://niloufersanahmohammed-dev.github.io/soup-of-the-day/",
    repo: "https://github.com/NilouferSanahMohammed-dev/soup-of-the-day",
  },
  {
    name: "pixel-tamagotchi",
    tagline: "a baby bunny that grows the more you care for it",
    description:
      "A tiny virtual pet drawn entirely in pixel art on canvas, no image files at all. Feed it, play with it, watch it grow from a newborn kit into a full grown rabbit.",
    tags: ["Canvas", "Game Logic"],
    live: "https://niloufersanahmohammed-dev.github.io/pixel-tamagotchi/",
    repo: "https://github.com/NilouferSanahMohammed-dev/pixel-tamagotchi",
  },
  {
    name: "sanah-blog",
    tagline: "a personal journal and photo album",
    description:
      "Part about-me page, part blog, part scrapbook, styled like tilted polaroids with washi tape instead of the usual template card grid.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://niloufersanahmohammed-dev.github.io/sanah-blog/",
    repo: "https://github.com/NilouferSanahMohammed-dev/sanah-blog",
  },
];
