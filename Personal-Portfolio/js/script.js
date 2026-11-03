// =========================================
// 1. MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a navigation link

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================================
// 2. ACTIVE NAVIGATION LINK ON SCROLL
// =========================================

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle(
            "active",
            item.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  },
);

sections.forEach((section) => {
  observer.observe(section);
});

// =========================================
// 3. CONTACT FORM VALIDATION
// =========================================

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// Display validation error messages

const setError = (id, message) => {
  document.getElementById(id).textContent = message;
};

// =========================================
// 4. FORM SUBMISSION
// =========================================

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Email validation pattern

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Clear previous error messages

  setError("nameError", "");
  setError("emailError", "");
  setError("subjectError", "");
  setError("messageError", "");

  formNote.textContent = "";
  formNote.className = "form-note";

  // =====================================
  // 5. VALIDATE EACH FIELD
  // =====================================

  let isValid = true;

  // Name validation

  if (name.length < 2) {
    setError("nameError", "Please enter your name (at least 2 characters).");

    isValid = false;
  }

  // Email validation

  if (!emailPattern.test(email)) {
    setError("emailError", "Please enter a valid email address.");

    isValid = false;
  }

  // Subject validation

  if (subject.length < 3) {
    setError("subjectError", "Please enter a valid subject.");

    isValid = false;
  }

  // Message validation

  if (message.length < 10) {
    setError("messageError", "Message must contain at least 10 characters.");

    isValid = false;
  }

  // =====================================
  // 6. DISPLAY VALIDATION NOTIFICATION
  // =====================================

  if (!isValid) {
    formNote.textContent =
      "Please correct the highlighted errors and try again.";

    formNote.classList.add("error-message");

    return;
  }

  // =====================================
  // 7. PREPARE EMAIL
  // =====================================

  const recipient = "vedantidalane22@gmail.com";

  const body =
    `Name: ${name}\n` + `Email: ${email}\n\n` + `Message: ${message}`;

  const mailto =
    `mailto:${recipient}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // =====================================
  // 8. SUCCESS NOTIFICATION
  // =====================================

  formNote.textContent =
    "Your details are valid! Your email application is opening. Please click Send to deliver your message.";

  formNote.classList.add("success");

  // =====================================
  // 9. OPEN EMAIL APPLICATION
  // =====================================

  window.location.href = mailto;
});

// =========================================
// 10. AUTOMATIC FOOTER YEAR
// =========================================

document.getElementById("year").textContent = new Date().getFullYear();
