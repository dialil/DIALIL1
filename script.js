// Menu burger responsive
const burger = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('open');
  });
}
// Loader animé
window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 700);
  }
});
// ========================
// ANIMATIONS HERO
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const titre = document.querySelector("h1");
  titre.style.opacity = "0";
  titre.style.transform = "translateY(30px)";

  setTimeout(() => {
    titre.style.transition = "all 1s ease";
    titre.style.opacity = "1";
    titre.style.transform = "translateY(0)";
  }, 300);

  const video = document.querySelector(".logo-video");
  video.style.opacity = "0";
  video.style.transform = "translateY(30px)";

  setTimeout(() => {
    video.style.transition = "all 1.2s ease";
    video.style.opacity = "1";
    video.style.transform = "translateY(0)";
  }, 100);
});

// ========================
// CAROUSEL
// ========================
const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;
let autoScrollInterval;

function updateCarousel() {
  const width = items[0].clientWidth;
  track.style.transition = "transform 0.7s cubic-bezier(.4,2,.3,1)";
  track.style.transform = `translateX(${-index * width}px)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % items.length;
  updateCarousel();
  resetAutoScroll();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
  resetAutoScroll();
});

// Swipe mobile
let startX = 0;
track.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
track.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) nextBtn.click();
  if (startX < endX - 50) prevBtn.click();
});

// Défilement automatique
function autoScroll() {
  autoScrollInterval = setInterval(() => {
    index = (index + 1) % items.length;
    updateCarousel();
  }, 3000); // 3 secondes
}
function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScroll();
}
autoScroll();

// ========================
// MODE SOMBRE / CLAIR
// ========================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "🌞";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    themeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

// ========================
// FOOTER YEAR AUTO
// ========================
const yearSpan = document.getElementById('footer-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ========================
// FORM CONFIRMATION
// ========================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        contactForm.reset();
        formSuccess.style.display = 'block';
      } else {
        formSuccess.textContent = "Une erreur est survenue. Veuillez réessayer.";
        formSuccess.style.display = 'block';
      }
    }).catch(() => {
      formSuccess.textContent = "Une erreur est survenue. Veuillez réessayer.";
      formSuccess.style.display = 'block';
    });
  });
}