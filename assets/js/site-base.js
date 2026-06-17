/**
 * GitHub Pages project sites live at https://user.github.io/REPO_NAME/
 * Root-relative URLs (/pages/...) miss the repo folder. This script sets
 * <base href="..."> so relative links work everywhere.
 *
 * Optional override: <meta name="site-base" content="/your-repo-name/">
 */
(function () {
  function trailingSlash(path) {
    return path.endsWith("/") ? path : path + "/";
  }

  function detectSiteBase() {
    var meta = document.querySelector('meta[name="site-base"]');
    if (meta && meta.content.trim()) {
      return trailingSlash(meta.content.trim());
    }

    var segments = window.location.pathname.split("/").filter(Boolean);
    var pagesIndex = segments.indexOf("pages");

    if (pagesIndex > 0) {
      return trailingSlash("/" + segments.slice(0, pagesIndex).join("/"));
    }
    if (pagesIndex === 0) {
      return "/";
    }

    var last = segments[segments.length - 1] || "";
    if (segments.length >= 2 && /\.html?$/i.test(last)) {
      return trailingSlash("/" + segments.slice(0, -1).join("/"));
    }
    if (segments.length === 1 && !/\.html?$/i.test(last)) {
      return trailingSlash("/" + segments[0]);
    }

    return "/";
  }

  window.SITE_BASE = detectSiteBase();

  var base = document.createElement("base");
  base.href = window.SITE_BASE;
  document.head.insertBefore(base, document.head.firstChild);
})();
