const base = () => window.SITE_BASE || "/";

const COMPONENTS = {
  header: "components/header.html",
  footer: "components/footer.html",
};

function assetUrl(path) {
  const root = base();
  const clean = path.replace(/^\//, "");
  return root === "/" ? "/" + clean : root + clean;
}

async function loadComponent(elementId, path) {
  const target = document.getElementById(elementId);
  if (!target) return;

  try {
    const response = await fetch(assetUrl(path));
    if (!response.ok) {
      console.error("Failed to load component:", assetUrl(path));
      return;
    }
    target.innerHTML = await response.text();
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

function setActiveNavLinks() {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPath = new URL(href, window.location.href).pathname.replace(/\/$/, "");
    const basePath = base().replace(/\/$/, "") || "";
    const isHome =
      link.getAttribute("data-nav") === "home" &&
      (currentPath === basePath ||
        currentPath.endsWith("/index.html") ||
        currentPath === basePath + "/index.html");

    const isActive =
      isHome ||
      currentPath === linkPath ||
      (linkPath.length > 1 && currentPath.endsWith(linkPath));

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
