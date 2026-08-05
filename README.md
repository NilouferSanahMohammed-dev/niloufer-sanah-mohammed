# niloufer-sanah-mohammed

My personal portfolio. An about-me section, an auto-scrolling strip of everything I've built with live demo links, what I'm currently up to, and a few life snippets.

![status](https://img.shields.io/badge/status-active-brightgreen) ![license](https://img.shields.io/badge/license-MIT-blue)

I wanted something that felt elegant rather than like a template, deep ink background, gold accents, a serif display font for headings, the kind of look I associate with "royal" rather than the usual bright SaaS-landing-page style most portfolio templates default to.

## What's here

- **Hero** with my name and a one-line tagline
- **About** with a photo, a full bio, and a row of tag chips for the things I'm into, each one links out to the real thing (my GitHub, my Spotify, my YouTube, and so on)
- **Projects**, a strip that scrolls through on its own, pulling from every real project I've shipped, with a live demo link each. Jarvis gets a bigger card and a badge since it's the project I'm most actively working on
- **Now** section, three cards on what I'm currently doing
- **Life, lately**, a small photo gallery that also scrolls on its own
- **Contact**, simple links to reach me

Every section fades in gently as you scroll to it, and there's a soft gold glow that follows your cursor around, small details that make it feel considered rather than static.

## How it works, in plain English

- On every page load, it asks GitHub's public API for the full list of my public repos, no login, no key, that's just public information anyone can request
- It skips a couple of repos on purpose (this portfolio itself, and my personal blog) using a small list in `config.js`
- For each remaining repo, it fetches that repo's actual `README.md` and pulls out the first real paragraph after the title as the card's tagline, so the card genuinely reflects whatever the README currently says, not a copy I have to remember to update by hand
- Whichever repo name matches `FLAGSHIP_REPO` in `config.js` gets sorted to the front with a bigger card and a badge, everything else sorts by whichever repo I pushed to most recently
- The result gets cached in `localStorage` for an hour, so refreshing the page a bunch doesn't hammer GitHub's free rate limit, and if a fetch ever fails outright, it falls back to whatever was cached last rather than showing an empty section
- Both the project strip and the photo strip have their content duplicated once, back to back, so a looping auto-scroll can wrap around invisibly instead of snapping back to the start
- A small loop nudges each strip forward on its own, unless someone's actually touching or dragging it, in which case it backs off and lets them scroll it by hand, then picks back up a couple seconds after they let go
- Sections stay invisible until they scroll into view, then fade and slide in once, using `IntersectionObserver` so nothing off-screen is doing any work

## Adding a new project

There's nothing to add here. Push a new public repo to GitHub with a README that follows the same shape as my others (a title, then a short paragraph, then the badges line), and it shows up in the projects strip on its own the next time the cache refreshes. The only thing to touch by hand is `config.js`, and only if you want to hide the new repo from the list or make it the flagship card:

```js
const HIDDEN_REPOS = ["niloufer-sanah-mohammed", "sanah-blog", "your-new-repo-if-you-want-it-hidden"];
const FLAGSHIP_REPO = "your-new-repo-if-it-should-be-the-big-one";
```

Editing a repo's README updates its card here too, again with nothing to touch on this side, just wait out the hour-long cache or clear `localStorage` to see it immediately.

## Updating your photos

Drop your own images into `/images` using these names and they'll show up automatically:

```
images/hero.jpg
images/about.jpg
images/snippet-1.jpg
images/snippet-2.jpg
images/snippet-3.jpg
images/snippet-4.jpg
```

## Updating the about-me text and contact links

Both live directly in `index.html`, in the `<section id="about">` and `<section id="contact">` blocks. Plain paragraphs and links, no templating to fight with.

## Running it

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Notes on the design

- Fonts: **Cormorant Garamond** for the elegant serif headings and name, **Inter** for body text and UI, doing two very different jobs on purpose.
- The palette is a deep aubergine background with gold and a touch of emerald, rather than the cream-and-terracotta look most portfolio templates default to.
- No frameworks, no build step. Just HTML, CSS, and vanilla JS.

## License

MIT, though this one's mine, so if you fork it, make it yours.
