/* Walgo Whitepaper — Minimal JS (<3KB) */
(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     Dark / Light Mode Toggle
     — Inline <script> in <head> already restores theme before paint.
     — This section just wires up the toggle button and icon visibility.
     ------------------------------------------------------------------------- */
  var THEME_KEY = "walgo-whitepaper-theme";
  var html = document.documentElement;

  function getPreferred() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateIcons(theme);
  }

  function updateIcons(theme) {
    var darkIcon = document.querySelector(".theme-icon--dark");
    var lightIcon = document.querySelector(".theme-icon--light");
    if (darkIcon && lightIcon) {
      darkIcon.style.display = theme === "dark" ? "block" : "none";
      lightIcon.style.display = theme === "light" ? "block" : "none";
    }
  }

  /* Read the already-applied theme (set by inline script or server) */
  var current = html.getAttribute("data-theme");
  if (!current || current === "auto") {
    applyTheme(getPreferred());
  } else {
    /* Theme already correct — just sync icons */
    updateIcons(current);
  }

  var toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var now = html.getAttribute("data-theme");
      applyTheme(now === "dark" ? "light" : "dark");
    });
  }

  /* -------------------------------------------------------------------------
     Scroll Spy — update URL hash only (sidebar active is set by Hugo)
     Sidebar links point to pages, not anchors, so we don't touch them.
     ------------------------------------------------------------------------- */
  var headings = document.querySelectorAll(".wp-article__body h2, .wp-article__body h3");

  if (headings.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          if (id) {
            history.replaceState(null, null, "#" + id);
          }
        }
      });
    }, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0
    });

    headings.forEach(function (h) { observer.observe(h); });
  }

  /* -------------------------------------------------------------------------
     Copy to Clipboard — data-copy buttons (contract addresses etc.)
     ------------------------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;

    var text = btn.getAttribute("data-copy");
    if (!text) return;

    navigator.clipboard.writeText(text).then(function () {
      btn.classList.add("wp-footer__copy--copied");
      var original = btn.getAttribute("title");
      btn.setAttribute("title", "Copied!");
      setTimeout(function () {
        btn.classList.remove("wp-footer__copy--copied");
        btn.setAttribute("title", original || "Copy");
      }, 2000);
    });
  });

  /* -------------------------------------------------------------------------
     Code Block Copy Buttons — inject into every .highlight block
     ------------------------------------------------------------------------- */
  var copyIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var checkIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  document.querySelectorAll(".highlight").forEach(function (block) {
    var btn = document.createElement("button");
    btn.className = "code-copy-btn";
    btn.setAttribute("type", "button");
    btn.setAttribute("title", "Copy code");
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.innerHTML = copyIcon;
    block.appendChild(btn);

    btn.addEventListener("click", function () {
      /* Get only the code text, excluding line numbers */
      var code = block.querySelector("td:last-child code, pre code, code");
      var text = code ? code.textContent : block.textContent;

      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = checkIcon;
        btn.classList.add("code-copy-btn--copied");
        setTimeout(function () {
          btn.innerHTML = copyIcon;
          btn.classList.remove("code-copy-btn--copied");
        }, 2000);
      });
    });
  });

  /* -------------------------------------------------------------------------
     Reading Progress Bar
     ------------------------------------------------------------------------- */
  var progressBar = document.getElementById("progress-bar");
  var ticking = false;

  function updateProgress() {
    if (!progressBar) { ticking = false; return; }
    var docHeight = document.documentElement.scrollHeight;
    var winHeight = window.innerHeight;
    var scrolled = window.scrollY;
    var total = docHeight - winHeight;
    var pct = total > 0 ? Math.min(Math.max(scrolled / total * 100, 0), 100) : 0;
    progressBar.style.width = pct + "%";
    var progressEl = document.getElementById("reading-progress");
    if (progressEl) progressEl.setAttribute("aria-valuenow", Math.round(pct));
    ticking = false;
  }

  if (progressBar) {
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
     Mobile Sidebar Toggle
     ------------------------------------------------------------------------- */
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  var hamburger = document.getElementById("sidebar-toggle");
  var sidebarLinks = document.querySelectorAll(".wp-sidebar__link");

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("wp-sidebar--open");
    if (overlay) overlay.classList.add("wp-sidebar-overlay--visible");
    document.body.classList.add("wp-sidebar-open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("wp-sidebar--open");
    if (overlay) overlay.classList.remove("wp-sidebar-overlay--visible");
    document.body.classList.remove("wp-sidebar-open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      var isOpen = sidebar && sidebar.classList.contains("wp-sidebar--open");
      if (isOpen) { closeSidebar(); } else { openSidebar(); }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  /* Close sidebar when clicking a sidebar link (mobile) */
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });

  /* -------------------------------------------------------------------------
     Auto-Print for PDF — when ?print is in the URL, trigger browser print
     dialog which allows saving as PDF.
     ------------------------------------------------------------------------- */
  if (window.location.search.indexOf("print") !== -1) {
    /* Small delay to let fonts/styles finish rendering */
    setTimeout(function () { window.print(); }, 600);
  }
})();
