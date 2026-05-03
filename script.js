// Project Filter Functionality - Define FIRST
window.filterProjects = function(filter) {
  console.log('Filter clicked:', filter);
  
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-status]');
  const noProjectsMessage = document.getElementById('no-projects-message');
  
  let visibleCount = 0;
  
  // Remove active class from all buttons
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Add active to the clicked button
  const clickedBtn = document.querySelector(`[data-filter="${filter}"]`);
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
  
  // Reset all button colors
  buttons.forEach(btn => {
    btn.style.borderColor = '';
    btn.style.color = '';
  });
  
  // Apply colors to active button
  if (filter === 'completed') {
    if (clickedBtn) clickedBtn.style.borderColor = '#22c55e';
    if (clickedBtn) clickedBtn.style.color = '#22c55e';
  } else if (filter === 'ongoing') {
    if (clickedBtn) clickedBtn.style.borderColor = '#3b82f6';
    if (clickedBtn) clickedBtn.style.color = '#3b82f6';
  } else if (filter === 'all') {
    if (clickedBtn) clickedBtn.style.borderColor = '#9ca3af';
    if (clickedBtn) clickedBtn.style.color = '#d1d5db';
  }
  
  // Filter cards
  cards.forEach(card => {
    const cardStatus = card.getAttribute('data-status');
    if (filter === 'all' || cardStatus === filter) {
      card.style.display = 'block';
      visibleCount++;
      console.log(`✓ Showing card with status: ${cardStatus}`);
    } else {
      card.style.display = 'none';
      console.log(`✗ Hiding card with status: ${cardStatus}`);
    }
  });
  
  // Show/hide "no projects" message
  if (visibleCount === 0) {
    noProjectsMessage.classList.remove('hidden');
    console.log('📭 No projects found - showing message');
  } else {
    noProjectsMessage.classList.add('hidden');
    console.log(`✅ Found ${visibleCount} projects - hiding message`);
  }
};

// Scroll animations - Fade in elements as they scroll into view
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections, headings, and cards
  document.querySelectorAll('section, .project-card, article, .blog').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

yearEl.textContent = new Date().getFullYear();

// Initialize scroll animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
