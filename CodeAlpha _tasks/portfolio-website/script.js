const menuIcon = document.querySelector(".menu i");
const sidebar = document.querySelector("aside");
const sidebarLinks = document.querySelectorAll("aside a");
const navLinks = document.querySelectorAll("nav a");

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");

    if (sidebar.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });
}

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });
});

document.addEventListener("click", (e) => {
  if (
    sidebar &&
    menuIcon &&
    !sidebar.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    sidebar.classList.remove("active");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});

const allNavLinks = document.querySelectorAll(
  'nav a, aside a, .footer-section a[href^="#"]'
);
allNavLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        updateActiveNavLink(href);
      }
    }
  });
});

function updateActiveNavLink(hash) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });

  sidebarLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
);

animatedElements.forEach((el) => {
  observer.observe(el);
});

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    header.style.backgroundColor = "rgba(15, 23, 42, 0.98)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    header.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
  }

  updateActiveNavOnScroll();

  lastScroll = currentScroll;
});

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll(".section");
  const headerHeight = header.offsetHeight;
  const scrollPosition = window.scrollY + headerHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });

      sidebarLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("load", () => {
  const heroElements = document.querySelectorAll(
    ".hero-section .fade-in, .hero-section .scale-in"
  );
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("active");
    }, index * 100);
  });

  initFormValidation();
});

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  };

  updateCounter();
};

const statCards = document.querySelectorAll(".hero-project-card h3");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const text = entry.target.textContent;
        const number = parseInt(text);
        if (!isNaN(number)) {
          entry.target.classList.add("counted");
          animateCounter(entry.target, number);
        }
      }
    });
  },
  { threshold: 0.5 }
);

statCards.forEach((card) => {
  statsObserver.observe(card);
});

function initFormValidation() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const inputs = contactForm.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      showFormMessage(
        "success",
        "Thank you! Your message has been sent successfully."
      );
      contactForm.reset();

      inputs.forEach((input) => {
        input.classList.remove("error");
        const errorMsg = input.parentElement.querySelector(".error-message");
        if (errorMsg) errorMsg.textContent = "";
      });
    } else {
      showFormMessage("error", "Please fill in all fields correctly.");
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  const errorMsg = field.parentElement.querySelector(".error-message");
  let isValid = true;
  let errorText = "";

  field.classList.remove("error");

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorText = "This field is required";
  }

  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorText = "Please enter a valid email address";
    }
  }

  if (field.id === "name" && value && value.length < 2) {
    isValid = false;
    errorText = "Name must be at least 2 characters";
  }

  if (field.id === "message" && value && value.length < 10) {
    isValid = false;
    errorText = "Message must be at least 10 characters";
  }

  if (!isValid) {
    field.classList.add("error");
    if (errorMsg) {
      errorMsg.textContent = errorText;
    }
  } else {
    if (errorMsg) {
      errorMsg.textContent = "";
    }
  }

  return isValid;
}

function showFormMessage(type, message) {
  const existingMsg = document.querySelector(".form-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  const messageEl = document.createElement("div");
  messageEl.className = `form-message ${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
    text-align: center;
    font-weight: 500;
    animation: slideDown 0.3s ease;
    ${
      type === "success"
        ? "background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #4ade80;"
        : "background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #f87171;"
    }
  `;

  const form = document.getElementById("contactForm");
  form.appendChild(messageEl);

  setTimeout(() => {
    messageEl.style.animation = "slideUp 0.3s ease";
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}
const messageStyle = document.createElement("style");
messageStyle.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(messageStyle);

const socialLinks = document.querySelectorAll(".social-link, .footer-social a");
socialLinks.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.1)";
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document
  .querySelectorAll("a, button, .project-card, .service-card, .info-card")
  .forEach((el) => {
    el.style.transition = "all 0.3s ease";
  });

const images = document.querySelectorAll("img");
images.forEach((img) => {
  if (img.complete) {
    img.style.opacity = "1";
  } else {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
  }
});

const logo = document.querySelector(".logo h2");
if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");
});
