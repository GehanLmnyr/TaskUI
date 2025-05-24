const langToggleBtn = document.getElementById('lmn-lang-toggle');
const langToggleSpan = document.getElementById('lmn-lang-span');

let currentLang = localStorage.getItem('lang') || 'en';
setLanguage(currentLang);

langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(currentLang);
});

async function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
  langToggleSpan.textContent = lang === 'en' ? 'ع' : 'E';

  const res = await fetch(`i18n/${lang}.json`);
  const translations = await res.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}