const COMPONENTS = {
  header: "/components/header.html",
  footer: "/components/footer.html",
};

async function loadComponent(elementId, url) {
  const target = document.getElementById(elementId);
  if (!target) return;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to load component: ${url}`);
      return;
    }
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(`Error loading component ${url}:`, error);
  }
}

function setActiveNavLinks() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, "");
    const isActive =
      currentPath === linkPath ||
      (linkPath !== "/" && currentPath.endsWith(linkPath));

    if (isActive) {
      link.classList.add("nav-link--active");
      link.setAttribute("aria-current", "page");
      link.addEventListener("click", (e) => e.preventDefault());
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadComponent("site-header", COMPONENTS.header),
    loadComponent("site-footer", COMPONENTS.footer),
  ]);

  setActiveNavLinks();
});
