(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Закрыть" : "Меню";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "Меню";
      });
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const target = new Date("2026-07-29T14:45:00+03:00").getTime();

  const parts = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
  };

  const labels = {
    days: ["день", "дня", "дней"],
    hours: ["час", "часа", "часов"],
    minutes: ["минута", "минуты", "минут"],
    seconds: ["секунда", "секунды", "секунд"]
  };

  const plural = (value, forms) => {
    const n = Math.abs(value) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];

    return forms[2];
  };

  function updateCountdown() {
    const distance = Math.max(0, target - Date.now());

    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000)
    };

    Object.entries(values).forEach(([key, value]) => {
      const element = parts[key];

      if (!element) return;

      const nextValue = String(value).padStart(2, "0");

      if (element.textContent !== nextValue) {
        element.textContent = nextValue;

        if (!reduceMotion) {
          element.classList.remove("is-ticking");
          void element.offsetWidth;
          element.classList.add("is-ticking");
        }
      }

      const label = element.nextElementSibling;

      if (label) {
        label.textContent = plural(value, labels[key]);
      }
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
