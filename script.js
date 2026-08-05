/**
 * Builds the two carousels (projects and life photos) by rendering
 * their content once, then duplicating it in place so the auto-scroll
 * below can loop seamlessly, no visible seam when it wraps back to
 * the start.
 *
 * Both strips are real scrollable elements (not a CSS animation), so
 * a finger swipe, a trackpad, a mouse drag, or a scroll wheel all work
 * on them directly, on phone or laptop alike. The auto-scroll just
 * nudges scrollLeft forward on its own, and steps out of the way the
 * instant a person actually touches or drags the strip themselves,
 * resuming a couple seconds after they let go.
 */

/* ---------------- Project cards, fetched live from GitHub ---------------- */

const projectsTrack = document.getElementById("projectsTrack");
const projectsLoading = document.getElementById("projectsLoading");

function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = `project-card${project.flagship ? " flagship featured" : ""}`;
  card.innerHTML = `
    ${project.flagship ? `<span class="flagship-badge">the big one right now</span>` : ""}
    <h3 class="project-name">${project.name}</h3>
    <p class="project-tagline">${project.tagline}</p>
    <div class="project-tags">
      ${project.language ? `<span>${project.language}</span>` : ""}
    </div>
    <div class="project-links">
      <a href="${project.live}" target="_blank" rel="noopener">view live &rarr;</a>
    </div>
  `;
  return card;
}

/**
 * Pulls a one-line tagline out of a repo's actual README: skip the H1
 * title, skip badge lines (they start with "!"), and use the first
 * real paragraph after that. Every README here follows that shape on
 * purpose, so this holds up without needing a special field anywhere.
 */
function extractTagline(readmeText) {
  const paragraphs = readmeText.split(/\n\s*\n/).map((p) => p.trim());
  for (const p of paragraphs) {
    if (!p || p.startsWith("#") || p.startsWith("!") || p.startsWith("![")) continue;
    const oneLine = p.replace(/\s+/g, " ").replace(/[`*_]/g, "");
    return oneLine.length > 220 ? `${oneLine.slice(0, 217)}...` : oneLine;
  }
  return "see the repo for details.";
}

async function fetchProjects() {
  const CACHE_KEY = "portfolio-projects-cache-v1";
  const CACHE_MAX_AGE = 60 * 60 * 1000; // 1 hour

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.savedAt < CACHE_MAX_AGE) {
      return cached.projects;
    }
  } catch {
    // No usable cache, fall through to a live fetch.
  }

  const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
  if (!reposRes.ok) throw new Error(`repo list fetch failed: ${reposRes.status}`);
  const repos = await reposRes.json();

  const visible = repos.filter((r) => !HIDDEN_REPOS.includes(r.name) && !r.fork);

  const withTaglines = await Promise.all(
    visible.map(async (r) => {
      let tagline = r.description || "see the repo for details.";
      try {
        const readmeRes = await fetch(
          `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${r.name}/main/README.md`
        );
        if (readmeRes.ok) tagline = extractTagline(await readmeRes.text());
      } catch {
        // Keep the fallback tagline above, no need to fail the whole card over this.
      }

      return {
        name: r.name,
        tagline,
        language: r.language,
        live: `https://${GITHUB_USERNAME}.github.io/${r.name}/`,
        flagship: r.name === FLAGSHIP_REPO,
        pushedAt: r.pushed_at,
      };
    })
  );

  withTaglines.sort((a, b) => {
    if (a.flagship !== b.flagship) return a.flagship ? -1 : 1;
    return new Date(b.pushedAt) - new Date(a.pushedAt);
  });

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), projects: withTaglines }));
  } catch {
    // Storage full or unavailable, not worth failing over.
  }

  return withTaglines;
}

fetchProjects()
  .then((projects) => {
    projectsLoading.classList.add("hidden");
    projects.forEach((project) => projectsTrack.appendChild(buildProjectCard(project)));
    projects.forEach((project) => projectsTrack.appendChild(buildProjectCard(project))); // duplicate for seamless loop
    setupAutoScroll("projectsMarquee", 55);
  })
  .catch((err) => {
    console.error("Couldn't load projects from GitHub", err);
    try {
      const stale = JSON.parse(localStorage.getItem("portfolio-projects-cache-v1"));
      if (stale?.projects?.length) {
        projectsLoading.classList.add("hidden");
        stale.projects.forEach((project) => projectsTrack.appendChild(buildProjectCard(project)));
        stale.projects.forEach((project) => projectsTrack.appendChild(buildProjectCard(project)));
        setupAutoScroll("projectsMarquee", 55);
        return;
      }
    } catch {
      // No usable stale cache either, fall through to the error message.
    }
    projectsLoading.textContent = "couldn't reach GitHub just now, refresh to try again.";
  });

/* ---------------- Life photos ---------------- */

const snippetsTrack = document.getElementById("snippetsTrack");
const SNIPPET_FILES = ["snippet-1.jpg", "snippet-2.jpg", "snippet-3.jpg", "snippet-4.jpg"];

function buildSnippet(file) {
  const div = document.createElement("div");
  div.className = "snippet";
  div.innerHTML = `<img src="images/${file}" alt="" onerror="this.parentElement.classList.add('empty')" />`;
  return div;
}

SNIPPET_FILES.forEach((file) => snippetsTrack.appendChild(buildSnippet(file)));
SNIPPET_FILES.forEach((file) => snippetsTrack.appendChild(buildSnippet(file))); // duplicate for seamless loop

/* ---------------- Auto-scroll, pausable by real interaction ---------------- */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupAutoScroll(wrapId, durationSeconds) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;

  let userControlled = false;
  let resumeTimeoutId = null;

  const pause = () => {
    userControlled = true;
    clearTimeout(resumeTimeoutId);
  };
  const scheduleResume = () => {
    clearTimeout(resumeTimeoutId);
    resumeTimeoutId = setTimeout(() => { userControlled = false; }, 2200);
  };

  // Covers mouse drag, touch swipe, trackpad, and scroll wheel alike,
  // since all of them fire these same events on the element.
  wrap.addEventListener("pointerdown", pause);
  wrap.addEventListener("pointerup", scheduleResume);
  wrap.addEventListener("pointercancel", scheduleResume);
  wrap.addEventListener("touchstart", pause, { passive: true });
  wrap.addEventListener("touchend", scheduleResume);
  wrap.addEventListener("wheel", () => {
    pause();
    scheduleResume();
  }, { passive: true });
  wrap.addEventListener("mouseenter", pause);
  wrap.addEventListener("mouseleave", scheduleResume);

  if (prefersReducedMotion) return; // still fully scrollable by hand, just no auto-nudge

  function tick() {
    const halfWidth = wrap.scrollWidth / 2;
    if (halfWidth > 0) {
      if (!userControlled) {
        const speed = halfWidth / (durationSeconds * 60); // approx px per animation frame at ~60fps
        wrap.scrollLeft += speed;
      }
      if (wrap.scrollLeft >= halfWidth) {
        wrap.scrollLeft -= halfWidth;
      } else if (wrap.scrollLeft < 0) {
        wrap.scrollLeft += halfWidth;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

setupAutoScroll("lifeMarquee", 26);

/* ---------------- Scroll reveal ---------------- */

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------------- Cursor glow ---------------- */

const cursorGlow = document.getElementById("cursorGlow");
let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let targetX = glowX;
let targetY = glowY;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateGlow() {
  glowX += (targetX - glowX) * 0.08;
  glowY += (targetY - glowY) * 0.08;
  cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ---------------- Nav background on scroll ---------------- */

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 40 ? "0 10px 30px -20px rgba(0,0,0,0.6)" : "none";
});
