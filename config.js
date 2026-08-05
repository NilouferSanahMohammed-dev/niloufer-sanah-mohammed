/**
 * config.js
 * ---------
 * The project list on this site isn't hand-maintained, it's fetched
 * live from the GitHub API every time the page loads (see script.js).
 * Push a new public repo to GitHub and it shows up here on its own,
 * no code change needed.
 *
 * This file is the only manual part: which repos to leave out of the
 * list (this portfolio's own repo, and anything else not meant to be
 * a public project card), and which one gets the bigger "flagship"
 * card. Both are just repo names, nothing else needs to change here
 * when a new project gets added.
 */

const GITHUB_USERNAME = "NilouferSanahMohammed-dev";

const HIDDEN_REPOS = ["niloufer-sanah-mohammed", "sanah-blog"];

const FLAGSHIP_REPO = "jarvis";

/**
 * A few tags per project, shown as pills on each card. This is the
 * one bit of real hand-maintenance left: GitHub's API doesn't hand
 * back rich tags for free the way it does descriptions, so a new repo
 * without an entry here just falls back to whatever language GitHub
 * auto-detected, still shows something, just less specific until you
 * add real tags for it.
 */
const PROJECT_TAGS = {
  "jarvis": ["Web Speech API", "JavaScript", "Voice Assistant"],
  "handjam": ["Computer Vision", "Tone.js", "MediaPipe"],
  "pixel-arcade": ["Canvas", "Game Architecture"],
  "daily-deck": ["LocalStorage", "Notion-style UI", "Calendar Import"],
  "vinyl-now-playing": ["Spotify API", "Vercel"],
  "read-shelf": ["LocalStorage", "JavaScript"],
  "aesthetic-pomodoro": ["Web Audio API", "CSS Animation"],
  "stardust-wishlist": ["JavaScript", "LocalStorage"],
  "soup-of-the-day": ["JavaScript", "CSS"],
  "pixel-tamagotchi": ["Canvas", "Game Logic"],
  "nova-deck": ["Open-Meteo API", "CSS"],
  "digibouquet": ["SVG", "JavaScript"],
};
