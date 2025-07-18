// Scroll Progress Bar
window.onscroll = () => {
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scroll / height) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
};

// Auto Footer Year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.innerText = new Date().getFullYear();
});

// Typed.js effect (optional)
if (document.querySelector('.typing')) {
  const typed = new Typed('.typing', {
    strings: ["Business Developer", "CRM Expert", "Digital Marketer", "Learner"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
}

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

// Hero Scroll Animation
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    if (window.scrollY > 100) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }
  }
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});