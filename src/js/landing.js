// Mobile drawer toggling and current year footer text
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const yearEl = document.getElementById('year');

if (burger && drawer) {
  burger.addEventListener('click', () => {
    const isHidden = drawer.hasAttribute('hidden');
    if (isHidden) {
      drawer.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
    } else {
      drawer.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

if (yearEl) yearEl.textContent = new Date().getFullYear();
