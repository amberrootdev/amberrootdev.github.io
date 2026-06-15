const root = document.documentElement;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const newsletterForm = document.querySelector("#newsletter");

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeToggle.querySelector("span").textContent = nextTheme === "dark" ? "Dark" : "Light";
  }
}

function setHeaderElevation() {
  if (!header) return;
  header.dataset.elevated = window.scrollY > 8 ? "true" : "false";
}

function closeMenu() {
  if (!navToggle || !navLinks) return;
  document.body.classList.remove("nav-open");
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

setTheme(initialTheme);
setHeaderElevation();

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", setHeaderElevation, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("nav-open", !isOpen);
  navLinks?.classList.toggle("is-open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

newsletterForm?.addEventListener("submit", (event) => {
  const email = newsletterForm.querySelector('input[type="email"]');

  if (email instanceof HTMLInputElement && !email.checkValidity()) {
    return;
  }

  const originalText = newsletterForm.querySelector("button")?.textContent;
  const submitButton = newsletterForm.querySelector("button");

  if (submitButton && originalText) {
    submitButton.textContent = "Opening your email app...";
    window.setTimeout(() => {
      submitButton.textContent = originalText;
    }, 2400);
  }

  // Let the mailto action continue so the static site needs no backend.
});
