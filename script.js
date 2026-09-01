/* ============================================================
   MAIN JAVASCRIPT — Aditya Patel Portfolio
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ─────────── CURSOR GLOW ───────────
  const cursorGlow = document.getElementById("cursorGlow");
  let mouseX = 0,
    mouseY = 0,
    glowX = 0,
    glowY = 0;

  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ─────────── NAVBAR SCROLL ───────────
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ─────────── HAMBURGER MENU ───────────
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ─────────── TYPEWRITER ───────────
  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const phrases = [
      "Frontend Developer",
      "Competitive Programmer",
      "Open Source Contributor",
      "CSE Student",
      "Problem Solver",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }
    type();
  }

  // ─────────── SCROLL REVEAL ───────────
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // ─────────── COUNTER ANIMATION ───────────
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute("data-target"), 10);
            if (!isNaN(target)) {
              animateCounter(entry.target, target);
            }
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 1500;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, stepTime);
  }

  // ─────────── HERO PARTICLES ───────────
  const particlesContainer = document.getElementById("heroParticles");
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("hero-particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 6 + Math.random() * 6 + "s";

      const colors = ["#7c3aed", "#06b6d4", "#f43f5e", "#a78bfa", "#22d3ee"];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = 2 + Math.random() * 4 + "px";
      particle.style.height = particle.style.width;

      particlesContainer.appendChild(particle);
    }
  }

  // ─────────── SKILL CARD TILT ───────────
  const tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

      card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(500px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ─────────── SMOOTH NAV LINKS ───────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // ─────────── ACTIVE NAV LINK HIGHLIGHT ───────────
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }

  // ─────────── CONTACT FORM ───────────
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Prevent double submission
      if (contactForm.classList.contains("is-loading") || submitBtn.disabled) {
        return;
      }

      // Get form inputs
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      // Honeypot field for spam protection
      const honey = contactForm.querySelector('input[name="_honey"]');
      if (honey && honey.value.trim() !== "") {
        showFormStatus("error", "Spam submission detected.");
        return;
      }

      // Basic validation
      if (name.length < 2) {
        showFormStatus("error", "Please enter your name (at least 2 characters).");
        if (nameInput) nameInput.focus();
        shakeForm();
        return;
      }

      if (!isValidEmail(email)) {
        showFormStatus("error", "Please enter a valid email address.");
        if (emailInput) emailInput.focus();
        shakeForm();
        return;
      }

      if (message.length < 10) {
        showFormStatus("error", "Please write a message of at least 10 characters.");
        if (messageInput) messageInput.focus();
        shakeForm();
        return;
      }

      // Loading state
      setLoading(true);
      clearFormStatus();

      try {
        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showFormStatus(
            "success",
            "Message sent successfully! I'll get back to you soon."
          );

          // Clear form
          contactForm.reset();

          // Auto-clear success message after 7 seconds
          setTimeout(() => {
            clearFormStatus();
          }, 7000);
        } else {
          const data = await response.json().catch(() => null);
          throw new Error((data && data.message) || "Form submission failed");
        }
      } catch (error) {
        console.error("Contact form error:", error);
        showFormStatus(
          "error",
          "Something went wrong. Please try again or email me directly at adityapatel9950@gmail.com."
        );
        shakeForm();
      } finally {
        setLoading(false);
      }
    });

    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    function setLoading(loading) {
      if (loading) {
        contactForm.classList.add("is-loading");
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
      } else {
        contactForm.classList.remove("is-loading");
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-busy", "false");
      }
    }

    function showFormStatus(type, message) {
      formStatus.className = "form-status " + type;
      formStatus.textContent = message;
    }

    function clearFormStatus() {
      formStatus.className = "form-status";
      formStatus.textContent = "";
    }

    function shakeForm() {
      contactForm.classList.remove("shake");
      void contactForm.offsetWidth; // Force browser reflow to restart animation
      contactForm.classList.add("shake");
      setTimeout(() => {
        contactForm.classList.remove("shake");
      }, 400);
    }
  }
});
