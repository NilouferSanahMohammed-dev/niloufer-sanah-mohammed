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

/* ---------------- Project cards ---------------- */

const projectsTrack = document.getElementById("projectsTrack");

function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = `project-card${project.featured ? " featured" : ""}${project.flagship ? " flagship" : ""}`;
  card.innerHTML = `
    ${project.flagship ? `<span class="flagship-badge">the big one right now</span>` : ""}
    <h3 class="project-name">${project.name}</h3>
    <p class="project-tagline">${project.tagline}</p>
    <p class="project-desc">${project.description}</p>
    <div class="project-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="project-links">
      <a href="${project.live}" target="_blank" rel="noopener">view live &rarr;</a>
    </div>
  `;
  return card;
}

PROJECTS.forEach((project) => projectsTrack.appendChild(buildProjectCard(project)));
PROJECTS.forEach((project) => projectsTrack.appendChild(buildProjectCard(project))); // duplicate for seamless loop

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

setupAutoScroll("projectsMarquee", 55);
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
