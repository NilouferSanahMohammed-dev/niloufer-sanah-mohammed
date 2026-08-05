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

- Project cards get built from the list in `projects.js`, one card per entry, in order
- Both the project strip and the photo strip have their content duplicated once, back to back, so a looping auto-scroll can wrap around invisibly instead of snapping back to the start
- A small loop nudges each strip forward on its own, unless someone's actually touching or dragging it, in which case it backs off and lets them scroll it by hand, then picks back up a couple seconds after they let go
- Sections stay invisible until they scroll into view, then fade and slide in once, using `IntersectionObserver` so nothing off-screen is doing any work

I did try pulling this list live from the GitHub API at one point, fetching each repo's actual README so the cards would always match whatever was currently written there. It mostly worked, but it had a real bug: if a repo's second README paragraph ran long, the description quietly fell back to repeating the tagline verbatim, which showed up as duplicated text with an odd gap in the card. A static list doesn't have that failure mode, and it's genuinely not much extra work to keep a dozen entries in sync by hand, so that's what this is now.

## Adding a new project

Every card on the projects strip is generated from `projects.js`. Add a new entry and it shows up automatically, no HTML editing needed:

```js
{
  name: "your-project",
  tagline: "a short one-line hook",
  description: "a couple of sentences about what it does and how.",
  tags: ["Tech", "Stack", "Tags"],
  live: "https://yourusername.github.io/your-project/",
  flagship: true, // optional, makes it the bigger badged card, only use this on one project at a time
}
```

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
