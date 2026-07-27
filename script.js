/**
 * Renders the project grid from projects.js, handles the scroll-reveal
 * animation on section content, and drives the subtle gold cursor glow.
 */

/* ---------------- Project cards ---------------- */

const projectsGrid = document.getElementById("projectsGrid");

PROJECTS.forEach((project) => {
  const card = document.createElement("article");
  card.className = `project-card${project.featured ? " featured" : ""}`;
  card.innerHTML = `
    <h3 class="project-name">${project.name}</h3>
    <p class="project-tagline">${project.tagline}</p>
    <p class="project-desc">${project.description}</p>
    <div class="project-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="project-links">
      <a href="${project.live}" target="_blank" rel="noopener">view live &rarr;</a>
      <a href="${project.repo}" target="_blank" rel="noopener">source code</a>
    </div>
  `;
  projectsGrid.appendChild(card);
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
