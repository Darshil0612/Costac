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

(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const text = 'Stack smarter\nScale faster'; // \n becomes <br>
  const speed = 60; // ms per character
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i).replace(/\n/g, '<br>');
      i++;
      if (i <= text.length) {
        setTimeout(type, speed);
      } else {
        // when finished typing → add class to remove caret
        el.parentElement.classList.add('done');
      }
    }
  }
  type();
})();