const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const bookingForm = document.querySelector("#booking-form");
const bookingHint = document.querySelector("#booking-hint");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-10% 0px -45% 0px"
  }
);

sections.forEach((section) => sectionObserver.observe(section));

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#customer-name")?.value.trim() || "";
    const phone = document.querySelector("#customer-phone")?.value.trim() || "";
    const service = document.querySelector("#booking-service")?.value.trim() || "";
    const day = document.querySelector("#booking-day")?.value.trim() || "";
    const time = document.querySelector("#booking-time")?.value.trim() || "";
    const note = document.querySelector("#booking-note")?.value.trim() || "";

    const message = [
      "Hallo Slemani Barber Shop,",
      "",
      "ich möchte gerne einen Termin anfragen.",
      `Name: ${name}`,
      `Telefon: ${phone}`,
      `Service: ${service}`,
      `Wunschtag: ${day}`,
      `Uhrzeit: ${time}`,
      note ? `Zusatzinfo: ${note}` : null
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/4917670385473?text=${encodeURIComponent(message)}`;

    if (bookingHint) {
      bookingHint.textContent = "WhatsApp wird mit deiner vorbereiteten Anfrage geöffnet.";
    }

    window.open(whatsappUrl, "_blank", "noopener");
  });
}
