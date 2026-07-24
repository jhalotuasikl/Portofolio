"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("pageLoader");
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const backToTop = document.getElementById("backToTop");
  const sections = [...document.querySelectorAll("main section[id]")];
  const projectCards = [...document.querySelectorAll(".project-card")];

  body.classList.add("loading");

  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    body.classList.remove("loading");
  }, 1850);

  window.setTimeout(() => loader?.remove(), 2800);

  const closeNavigation = () => {
    siteNav?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Buka menu navigasi");
    body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const willOpen = !siteNav.classList.contains("open");
    siteNav.classList.toggle("open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
    body.classList.toggle("nav-open", willOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("click", (event) => {
    if (!siteNav?.classList.contains("open")) return;
    if (siteNav.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNavigation();
  });

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  revealItems.forEach((item) => revealObserver.observe(item));

  const updateOnScroll = () => {
    const y = window.scrollY;
    navbar?.classList.toggle("scrolled", y > 28);
    backToTop?.classList.toggle("visible", y > 650);

    let activeId = "profile";
    sections.forEach((section) => {
      if (y >= section.offsetTop - 180) activeId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  window.addEventListener("scroll", updateOnScroll, { passive: true });
  updateOnScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Project accordion: only one project is expanded at a time.
  projectCards.forEach((card) => {
    card.addEventListener("toggle", () => {
      if (!card.open) return;
      projectCards.forEach((other) => {
        if (other !== card) other.open = false;
      });

      window.setTimeout(() => {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
    });
  });

  // GitHub Pages bersifat case-sensitive. Untuk gambar RAMERAME,
  // coba beberapa variasi nama/ekstensi sebelum menampilkan placeholder.
  const ramerameImage = document.getElementById("ramerameImage");
  if (ramerameImage) {
    const candidates = (ramerameImage.dataset.srcCandidates || "")
      .split("|")
      .map((value) => value.trim())
      .filter(Boolean);

    let candidateIndex = Math.max(
      candidates.indexOf(ramerameImage.getAttribute("src")),
      0,
    );

    ramerameImage.addEventListener("error", () => {
      candidateIndex += 1;
      if (candidateIndex < candidates.length) {
        ramerameImage.src = candidates[candidateIndex];
      }
    });
  }

  // Keep the layout attractive even before optional images are uploaded.
  document.querySelectorAll(".media-shell img").forEach((image) => {
    const shell = image.closest(".media-shell");
    const markMissing = () => shell?.classList.add("is-missing");
    const markLoaded = () => shell?.classList.remove("is-missing");

    image.addEventListener("error", markMissing);
    image.addEventListener("load", markLoaded);

    if (image.complete) {
      image.naturalWidth > 0 ? markLoaded() : markMissing();
    }
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});
