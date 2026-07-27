/**
 * Renders the project track from projects.js as a horizontal,
 * scroll-snapping strip. Whichever card sits closest to the center of
 * the viewport gets scaled up and brought into full focus, the rest
 * fade back and shrink slightly, so scrolling through feels like
 * flipping through cards rather than reading a static grid.
 */

/* ---------------- Project cards ---------------- */

const projectsTrack = document.getElementById("projectsGrid");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

PROJECTS.forEach((project) => {
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
  projectsTrack.appendChild(card);
});

/* ---------------- Pop-to-center scroll effect ---------------- */

const cards = Array.from(projectsTrack.children);

function updateCardFocus() {
  const trackRect = projectsTrack.getBoundingClientRect();
  const centerX = trackRect.left + trackRect.width / 2;

  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(centerX - cardCenter);
    const maxDistance = trackRect.width / 2 + cardRect.width / 2;
    const proximity = Math.max(0, 1 - distance / maxDistance);

    const scale = 0.88 + proximity * 0.12;
    const opacity = 0.5 + proximity * 0.5;
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = Math.round(proximity * 100);
  });
}

let rafPending = false;
function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    updateCardFocus();
    rafPending = false;
  });
}

projectsTrack.addEventListener("scroll", onScroll);
window.addEventListener("resize", onScroll);

// Give the layout a tick to settle before the first measurement.
setTimeout(updateCardFocus, 200);

scrollLeftBtn.addEventListener("click", () => {
  projectsTrack.scrollBy({ left: -340, behavior: "smooth" });
});
scrollRightBtn.addEventListener("click", () => {
  projectsTrack.scrollBy({ left: 340, behavior: "smooth" });
});

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

/* ---------------- Hero particles ---------------- */

const heroParticles = document.getElementById("heroParticles");
const PARTICLE_COUNT = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement("span");
  p.style.left = `${Math.random() * 100}%`;
  p.style.bottom = `${-10 - Math.random() * 20}px`;
  p.style.animationDuration = `${10 + Math.random() * 12}s`;
  p.style.animationDelay = `${Math.random() * 12}s`;
  heroParticles.appendChild(p);
}

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
