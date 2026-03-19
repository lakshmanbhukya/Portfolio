import "./styles/main.css";
import navSection from "./sections/nav.html?raw";
import heroSection from "./sections/hero.html?raw";
import impactStripSection from "./sections/impact-strip.html?raw";
import statusStripSection from "./sections/status-strip.html?raw";
import aboutSection from "./sections/about.html?raw";
import skillsSection from "./sections/skills.html?raw";
import logsSection from "./sections/logs.html?raw";
import codingStatsSection from "./sections/coding-stats.html?raw";
import projectsSection from "./sections/projects.html?raw";
import contactSection from "./sections/contact.html?raw";
import footerSection from "./sections/footer.html?raw";

const GITHUB_MOCK_PROFILE = {
  public_repos: 28,
  followers: 41,
  stars: 32,
  contributions: "760+",
  created_at: "2021-08-01T00:00:00Z",
};

function applyGitHubStats(data) {
  const reposCount = document.getElementById("repos-count");
  const followersCount = document.getElementById("followers-count");
  const starsCount = document.getElementById("stars-count");
  const commitsCount = document.getElementById("total-contributions");
  const commitsCountGrid = document.getElementById("total-contributions-grid");
  if (reposCount) reposCount.textContent = String(data.public_repos ?? 0);
  if (followersCount) followersCount.textContent = String(data.followers ?? 0);
  if (starsCount) starsCount.textContent = String(data.stars ?? 0);
  const computedContributions = `${(data.public_repos ?? 0) * 20 + (data.followers ?? 0) * 5}+`;
  const contributions = data.contributions ?? computedContributions;
  if (commitsCount) commitsCount.textContent = String(contributions);
  if (commitsCountGrid) commitsCountGrid.textContent = String(contributions);

  if (data.created_at) {
    const date = new Date(data.created_at);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
    const createdAt = document.getElementById("created-at");
    if (createdAt) createdAt.textContent = formattedDate;
  }
}

function applyMockGitHubBadges() {
  const statusEl = document.getElementById("gh-badges-status");
  const activeContainer = document.getElementById("gh-active-badge");
  const historyContainer = document.getElementById("gh-history-badges");

  if (statusEl) {
    statusEl.textContent = "Mock";
    statusEl.className =
      "text-neo-yellow text-[9px] font-mono uppercase tracking-widest";
  }

  if (activeContainer) {
    activeContainer.innerHTML = `
      <div class="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
        <div class="w-full h-full rounded-full border-2 border-neo-green flex items-center justify-center bg-neo-green/10">
          <i class="ri-star-smile-fill text-neo-green text-2xl drop-shadow-[0_0_8px_rgba(51,255,87,0.5)]"></i>
        </div>
      </div>
      <span class="text-[10px] font-mono text-white text-center leading-tight max-w-[90px] truncate" title="Builder Rank">Builder Rank</span>
    `;
  }

  if (historyContainer) {
    const awards = [
      { name: "Cloud Builder", icon: "ri-cloud-fill" },
      { name: "API Craft", icon: "ri-braces-fill" },
      { name: "Full Stack", icon: "ri-stack-fill" },
      { name: "Ship Fast", icon: "ri-rocket-2-fill" },
    ];

    const repeatedAwards = [...awards, ...awards, ...awards];
    historyContainer.innerHTML = repeatedAwards
      .map(
        (badge) => `
        <div class="min-w-[70px] flex flex-col items-center group/badge">
          <div class="w-10 h-10 mb-2 relative group-hover/badge:-translate-y-1 transition-transform flex items-center justify-center border-2 border-white/20 rounded-full bg-white/5 shadow-[2px_2px_0_rgba(51,255,87,0.3)] hover:border-neo-green hover:shadow-[4px_4px_0_rgba(51,255,87,1)] cursor-pointer">
            <i class="${badge.icon} text-neo-green text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"></i>
          </div>
          <span class="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1" title="${badge.name}">${badge.name}</span>
        </div>
      `,
      )
      .join("");
  }
}

function mountSections() {
  const sectionMap = {
    "section-nav": navSection,
    "section-hero": heroSection,
    "section-impact-strip": impactStripSection,
    "section-status-strip": statusStripSection,
    "section-about": aboutSection,
    "section-skills": skillsSection,
    "section-logs": logsSection,
    "section-coding-stats": codingStatsSection,
    "section-projects": projectsSection,
    "section-contact": contactSection,
    "section-footer": footerSection,
  };

  Object.entries(sectionMap).forEach(([mountId, markup]) => {
    const mountEl = document.getElementById(mountId);
    if (mountEl) {
      mountEl.innerHTML = markup;
    }
  });
}

function initMobileNav() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

function initCursor() {
  const cursor = document.getElementById("cursor");
  const hoverElements = document.querySelectorAll(
    ".cursor-hover, a, button, input, textarea",
  );

  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.style.transform = "translate(-50%, -50%)";
  });

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "60px";
      cursor.style.height = "60px";
      cursor.style.backgroundColor = "#FBFF48";
      cursor.style.mixBlendMode = "normal";
      cursor.style.border = "2px solid black";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.backgroundColor = "#fff";
      cursor.style.mixBlendMode = "difference";
      cursor.style.border = "none";
    });
  });
}

async function fetchGitHubStats() {
  try {
    const response = await fetch(
      "https://api.github.com/users/lakshmanbhukya",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const [data, reposResponse] = await Promise.all([
      response.json(),
      fetch("https://api.github.com/users/lakshmanbhukya/repos?per_page=100", {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
    ]);

    let stars = 0;
    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      stars = repos.reduce(
        (total, repo) => total + (repo.stargazers_count || 0),
        0,
      );
    }

    data.stars = stars;
    data.contributions = `${(data.public_repos ?? 0) * 20 + (data.followers ?? 0) * 5}+`;
    applyGitHubStats(data);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    applyGitHubStats(GITHUB_MOCK_PROFILE);
  }
}

async function fetchGitHubBadges() {
  try {
    const username = "lakshmanbhukya";
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("GH API Error");
    const data = await response.json();

    const statusEl = document.getElementById("gh-badges-status");
    const activeContainer = document.getElementById("gh-active-badge");
    const historyContainer = document.getElementById("gh-history-badges");

    if (statusEl) {
      statusEl.textContent = "Loaded";
      statusEl.classList.remove("animate-pulse", "text-neo-yellow");
      statusEl.classList.add("text-neo-green");
    }

    if (activeContainer) {
      let rankTitle = "Open Sourcer";
      let iconClass = "ri-git-repository-fill";
      if (data.followers > 20) {
        rankTitle = "Star Developer";
        iconClass = "ri-star-smile-fill";
      }

      activeContainer.innerHTML = `
        <div class="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform">
          <div class="w-full h-full rounded-full border-2 border-neo-green flex items-center justify-center bg-neo-green/10">
            <i class="${iconClass} text-neo-green text-2xl drop-shadow-[0_0_8px_rgba(51,255,87,0.5)]"></i>
          </div>
        </div>
        <span class="text-[10px] font-mono text-white text-center leading-tight max-w-[90px] truncate" title="${rankTitle}">${rankTitle}</span>
      `;
    }

    if (historyContainer) {
      const awards = [];
      if (data.public_repos >= 10) {
        awards.push({ name: "10+ Repos", icon: "ri-folder-open-fill" });
      }
      if (data.public_repos >= 50) {
        awards.push({ name: "50+ Repos", icon: "ri-folder-add-fill" });
      }
      if (data.followers > 10) {
        awards.push({ name: "Popular", icon: "ri-user-heart-fill" });
      }
      if (awards.length === 0) {
        awards.push({ name: "Contributor", icon: "ri-medal-line" });
      }

      const repeatedAwards = [...awards, ...awards, ...awards, ...awards];
      historyContainer.innerHTML = repeatedAwards
        .map(
          (badge) => `
          <div class="min-w-[70px] flex flex-col items-center group/badge">
            <div class="w-10 h-10 mb-2 relative group-hover/badge:-translate-y-1 transition-transform flex items-center justify-center border-2 border-white/20 rounded-full bg-white/5 shadow-[2px_2px_0_rgba(51,255,87,0.3)] hover:border-neo-green hover:shadow-[4px_4px_0_rgba(51,255,87,1)] cursor-pointer">
              <i class="${badge.icon} text-neo-green text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"></i>
            </div>
            <span class="text-[9px] font-mono text-gray-300 font-bold text-center w-full truncate px-1" title="${badge.name}">${badge.name}</span>
          </div>
        `,
        )
        .join("");
    }
  } catch (error) {
    console.error("Error fetching GH badges:", error);
    applyMockGitHubBadges();
  }
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

function initProgressBar() {
  window.onscroll = function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("progressBar");
    if (progressBar) progressBar.style.width = scrolled + "%";
  };
}

function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  mountSections();
  initMobileNav();
  initCursor();
  await fetchGitHubStats();
  await fetchGitHubBadges();
  initScrollReveal();
  initProgressBar();
  setFooterYear();
});
