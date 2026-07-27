# niloufer-sanah-mohammed

My personal portfolio. An about-me section, a live grid of everything I've built with links to both the working demo and the source code, what I'm currently up to, and a few life snippets.

![status](https://img.shields.io/badge/status-active-brightgreen) ![license](https://img.shields.io/badge/license-MIT-blue)

I wanted something that felt elegant rather than like a template, deep ink background, gold accents, a serif display font for headings, the kind of look I associate with "royal" rather than the usual bright SaaS-landing-page style most portfolio templates default to.

## What's here

- **Hero** with my name and a one-line tagline
- **About** with a photo, a short bio, and a row of tag chips for the things I'm into
- **Now** section, three cards on what I'm currently doing (studying, building, following this F1 season)
- **Projects**, a live grid pulling from every real project I've shipped, each with its own live demo link and source code link
- **Life, lately**, a small photo gallery
- **Contact**, simple links to reach me

Every section fades in gently as you scroll to it, and there's a soft gold glow that follows your cursor around, small details that make it feel considered rather than static.

## Adding a new project

Every card on the projects page is generated from `projects.js`. Add a new entry and it shows up automatically, no HTML editing needed:

```js
{
  name: "your-project",
  tagline: "a short one-line hook",
  description: "a couple of sentences about what it does and how.",
  tags: ["Tech", "Stack", "Tags"],
  live: "https://yourusername.github.io/your-project/",
  repo: "https://github.com/yourusername/your-project",
  featured: true, // optional, gives it a subtle gold highlight
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
```

The ones currently in there are reused from my `sanah-blog` project as placeholders, swap them for whatever you actually want shown here.

## Updating the about-me text and contact links

Both live directly in `index.html`, in the `<section id="about">` and `<section id="contact">` blocks. Plain paragraphs and links, no templating to fight with. The contact section currently has placeholder links for Instagram and LinkedIn (the `href="#"` ones), replace those with real URLs whenever you're ready.

## Running it

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Notes on the design

- Fonts: **Cormorant Garamond** for the elegant serif headings and name, **Inter** for body text and UI, doing two very different jobs on purpose.
- The palette is a deep aubergine background with gold and a touch of emerald, rather than the cream-and-terracotta look most portfolio templates default to.
- Scroll reveals use `IntersectionObserver`, which is efficient and doesn't run any code for sections that are off screen.
- No frameworks, no build step. Just HTML, CSS, and vanilla JS.

## License

MIT, though this one's mine, so if you fork it, make it yours.
