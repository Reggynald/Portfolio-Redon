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
