// === Mobile Nav Toggle ===
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => mobileNav.classList.toggle('show'));
}

// === Dark Mode ===
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    darkToggle.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';

    if (document.documentElement.classList.contains('dark-mode')) {
      document.documentElement.style.setProperty('--bg', '#07120a');
      document.documentElement.style.setProperty('--card', '#0d1a12');
      document.documentElement.style.setProperty('--muted', '#bfcfbf');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--muted');
    }
  });
}

// === Sticky Header Shadow on Scroll ===
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// === Hero Parallax Overlay ===
const heroOverlay = document.querySelector('.hero-overlay');
if (heroOverlay) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.2;
    heroOverlay.style.transform = `translateY(${y}px)`;
  });
}

// === Carousel ===
const track = document.querySelector('.carousel-track');
const imgs = document.querySelectorAll('.carousel-track img');
let index = 0;
const prevBtn = document.getElementById('prevHero');
const nextBtn = document.getElementById('nextHero');

function showHero(i) {
  if (!track || imgs.length === 0) return;
  if (i < 0) index = imgs.length - 1;
  else if (i >= imgs.length) index = 0;
  else index = i;

  const w = imgs[0].clientWidth || 480;
  track.classList.add('fade');
  setTimeout(() => {
    track.style.transform = `translateX(-${index * w}px)`;
    track.classList.remove('fade');
  }, 200);
}

if (prevBtn) prevBtn.addEventListener('click', () => showHero(index - 1));
if (nextBtn) nextBtn.addEventListener('click', () => showHero(index + 1));

if (imgs.length > 0) {
  setInterval(() => showHero(index + 1), 5000);
  window.addEventListener('resize', () => showHero(index));
}

// === Horizontal Scroll Buttons ===
document.querySelectorAll('.scroll-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const container = document.getElementById(targetId);
    if (!container) return;
    const shift = btn.classList.contains('left') ? -320 : 320;
    container.scrollBy({ left: shift, behavior: 'smooth' });
  });
});

// === Simple Quiz ===
const quizData = [
  { q: "What is the national bird of the Philippines?", a: "philippine eagle" },
  { q: "Name a major cause of habitat loss in the Philippines.", a: "deforestation" },
  { q: "Which ecosystem is Apo Reef known for?", a: "coral" }
];

const quizArea = document.getElementById('quizArea');
if (quizArea) {
  quizData.forEach((item, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-item reveal';
    wrap.innerHTML = `
      <label><strong>${i + 1}. ${item.q}</strong></label><br>
      <input type="text" id="ans${i}" placeholder="Type your answer here" style="padding:8px;margin-top:6px;width:100%;max-width:420px">
    `;
    quizArea.appendChild(wrap);
  });

  const submitBtn = document.getElementById('submitQuiz');
  const result = document.getElementById('quizResult');

  if (submitBtn && result) {
    submitBtn.addEventListener('click', () => {
      let score = 0;
      quizData.forEach((item, i) => {
        const val = (document.getElementById('ans' + i).value || '').trim().toLowerCase();
        if (val && val.includes(item.a)) score++;
      });
      result.textContent = `You got ${score} of ${quizData.length} correct.`;
      result.style.opacity = 1;
    });
  }
}

// === Scroll-triggered animations ===
const revealEls = document.querySelectorAll('.reveal');
function checkReveal() {
  const trigger = window.innerHeight * 0.9;
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// === Smooth Anchor Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileNav && mobileNav.classList.contains('show')) mobileNav.classList.remove('show');
    }
  });
});

// === Search Functionality ===
const searchBox = document.getElementById('searchBox');
if (searchBox) {
  searchBox.addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.h-card').forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
  });
}

// === READ MORE Toggle ===
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.h-card');
    const moreText = card.querySelector('.more-text');
    const summary = card.querySelector('.summary');

    if (moreText.style.display === 'block') {
      moreText.style.display = 'none';
      summary.style.display = 'block';
      this.textContent = 'Read More';
    } else {
      moreText.style.display = 'block';
      summary.style.display = 'none';
      this.textContent = 'Read Less';
    }
  });
});
