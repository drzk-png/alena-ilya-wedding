(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Закрыть' : 'Меню';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = 'Меню';
    }));
  }

  const target = new Date('2026-07-29T14:45:00+03:00').getTime();
  const parts = { days: document.querySelector('[data-days]'), hours: document.querySelector('[data-hours]'), minutes: document.querySelector('[data-minutes]'), seconds: document.querySelector('[data-seconds]') };
  const labels = { days: ['день', 'дня', 'дней'], hours: ['час', 'часа', 'часов'], minutes: ['минута', 'минуты', 'минут'], seconds: ['секунда', 'секунды', 'секунд'] };
  const plural = (value, forms) => { const n = Math.abs(value) % 100, n1 = n % 10; if (n > 10 && n < 20) return forms[2]; if (n1 > 1 && n1 < 5) return forms[1]; if (n1 === 1) return forms[0]; return forms[2]; };
  function updateCountdown() {
    let distance = Math.max(0, target - Date.now());
    const values = { days: Math.floor(distance / 86400000), hours: Math.floor((distance % 86400000) / 3600000), minutes: Math.floor((distance % 3600000) / 60000), seconds: Math.floor((distance % 60000) / 1000) };
    Object.entries(values).forEach(([key, value]) => { if (parts[key]) { parts[key].textContent = String(value).padStart(2, '0'); parts[key].nextElementSibling.textContent = plural(value, labels[key]); } });
  }
  updateCountdown(); setInterval(updateCountdown, 1000);
})();
