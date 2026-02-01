// ===============================
// ===== THEME TOGGLE ============
// ===============================
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

if (sunIcon && moonIcon) {
  sunIcon.style.display = savedTheme === "dark" ? "none" : "block";
  moonIcon.style.display = savedTheme === "dark" ? "block" : "none";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";

    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    sunIcon.style.display = next === "dark" ? "none" : "block";
    moonIcon.style.display = next === "dark" ? "block" : "none";
  });
}

// ===============================
// ===== LOAD NAVBAR ==============
// ===============================
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    const nav = document.getElementById("navbar");
    if (nav) nav.innerHTML = data;
  })
  .catch(() => {
    const nav = document.getElementById("navbar");
    if (nav) {
      nav.innerHTML = `
        <nav class="navbar">
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      `;
    }
  });

// ===============================
// ===== FOOTER YEAR ==============
// ===============================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// ===== SMOOTH SCROLL ============
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// ===============================
// ===== SCROLL ANIMATIONS ========
// ===============================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(
      ".cv-card, .skill-category, .project-card, .achievement-item"
    )
    .forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "0.6s ease";
      observer.observe(el);
    });
});

// ===============================
// ===== ACTIVE NAV LINK ==========
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop() || "index.html";

  setTimeout(() => {
    document.querySelectorAll(".nav-links a").forEach(link => {
      if (link.getAttribute("href") === page) {
        link.style.color = "#4facfe";
      }
    });
  }, 100);
});

// =================================================
// ===== CONTACT FORM (LOCAL + RAILWAY AUTO) =======
// =================================================
const contactForm = document.querySelector(".contact-form");

const API_URL =
  location.hostname === "localhost"
    ? "http://localhost:5000/contact"
    : "https://personal-portfolio-production-aa0d.up.railway.app/contact";

if (contactForm) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.text();

      if (response.ok) {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } else {
        alert("❌ " + result);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Backend not reachable");
    }
  });
}

// ===============================
// ===== CONSOLE MESSAGE ==========
// ===============================
console.log(
  "%c🚀 Welcome to Kishan's Portfolio!",
  "color:#4facfe;font-size:18px;font-weight:bold"
);
