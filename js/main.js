const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

const syncHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -48px 0px",
});

revealItems.forEach((item) => revealObserver.observe(item));

const workTriggers = document.querySelectorAll(".work-trigger");
const workPanels = document.querySelectorAll("[data-panel]");

workTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const caseId = trigger.dataset.case;

    workTriggers.forEach((item) => item.classList.toggle("is-active", item === trigger));
    workPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === caseId);
    });
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;

  button.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");
    faqItems.forEach((faq) => faq.classList.remove("is-open"));
    if (willOpen) item.classList.add("is-open");
  });
});

const brandsTrack = document.querySelector(".brands-track");

if (brandsTrack && !brandsTrack.dataset.doubled) {
  brandsTrack.insertAdjacentHTML("beforeend", brandsTrack.innerHTML);
  brandsTrack.dataset.doubled = "true";
}

const featuredRail = document.querySelector("[data-featured-rail]");
const featuredNavButtons = document.querySelectorAll("[data-featured-nav]");

featuredNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!featuredRail) return;

    const direction = button.dataset.featuredNav === "next" ? 1 : -1;
    const card = featuredRail.querySelector(".featured-card");
    const step = card ? card.getBoundingClientRect().width + 18 : 320;

    featuredRail.scrollBy({
      left: step * direction,
      behavior: "smooth",
    });
  });
});
