/**
 * Builds the two auto-sliding carousels (projects and life photos) by
 * rendering their content once, then duplicating it in place so the
 * looping animation in style.css can scroll from 0% to -50% and land
 * exactly back where it started, no visible seam. Hovering either
 * strip pauses it (see .marquee-track:hover in style.css) so it's
 * still possible to read a card or click into a project.
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
