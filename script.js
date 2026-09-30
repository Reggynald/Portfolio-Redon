/* Mobile-Navigation ein-/ausklappen */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

/* Dark-/Light-Mode umschalten und Auswahl merken (localStorage) */
const themeToggle = document.querySelector("#themeToggle");

function applyTheme(theme) {
  if (theme === "dark" || theme === "light") {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  if (themeToggle) {
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    themeToggle.textContent = isDark ? "\u2600\uFE0F" : "\u{1F319}"; // Sonne / Mond
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln"
    );
  }
}

applyTheme(localStorage.getItem("theme"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Nächsten Zustand bestimmen: aktuell hell -> dunkel, sonst hell
    const nowDark = current ? current === "dark" : systemDark;
    const next = nowDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

/* Scroll-Reveal */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selectors = ".hero-text, .hero-photo, .section-title, .lead, .area, .card, .project, .contact-wrap, main .container > p";
  var items = document.querySelectorAll(selectors);

  items.forEach(function (el) {
    el.classList.add("reveal");
    // Leichte Staffelung nur bei Karten/Bereichen, die in Reihen erscheinen:
    var delay = 0;
    if (el.classList.contains("card") || el.classList.contains("area")) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains("card") || c.classList.contains("area");
      });
      delay = sibs.indexOf(el) * 0.08;
    }
    el.style.transitionDelay = delay + "s";
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -15% 0px" });

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      items.forEach(function (el) { io.observe(el); });
    });
  });
})();
