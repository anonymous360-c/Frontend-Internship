// ===== Mobile Menu =====
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("open");
}

// ===== Smooth Scroll =====
document.querySelectorAll("header nav a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
            // close menu on mobile
            document.getElementById("nav-links").classList.remove("open");
        }
    });
});

// ===== Scrollspy (active nav link) =====
function setupScrollSpy() {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("header nav a");

    window.addEventListener("scroll", () => {
        let currentId = "";
        sections.forEach(sec => {
            const top = window.scrollY;
            if (top >= sec.offsetTop - 150) {
                currentId = sec.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    });
}

// ===== Dynamic Services & Testimonials =====
const servicesData = [
    {
        title: "Web Design",
        text: "Creative, user-friendly layouts using clean HTML & CSS."
    },
    {
        title: "Frontend Development",
        text: "Responsive pages using HTML, CSS, and JavaScript."
    },
    {
        title: "UI/UX Improvement",
        text: "Improving colors, spacing, and flow for better experience."
    }
];

const testimonialsData = [
    {
        name: "Ayesha Khan",
        text: "He redesigned my small business website and made it look modern and clean."
    },
    {
        name: "Ali Raza",
        text: "Very responsive and professional. The portfolio page was exactly what I wanted."
    },
    {
        name: "Fatima Noor",
        text: "My landing page now loads fast and looks great on mobile and desktop."
    }
];

function renderServices() {
    const container = document.getElementById("services-container");
    if (!container) return;

    container.innerHTML = "";
    servicesData.forEach(service => {
        const div = document.createElement("div");
        div.className = "service-box card-hover";
        div.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.text}</p>
        `;
        container.appendChild(div);
    });
}

function renderTestimonials() {
    const container = document.getElementById("testimonial-list");
    if (!container) return;

    container.innerHTML = "";
    testimonialsData.forEach(item => {
        const div = document.createElement("div");
        div.className = "testimonial-box card-hover";
        div.innerHTML = `
            <p>"${item.text}"</p>
            <h4>- ${item.name}</h4>
        `;
        container.appendChild(div);
    });
}

// ===== Time & Weather using ONE public API (Open-Meteo) =====
function loadTimeAndWeather() {
    const timeText = document.getElementById("time-text");
    const weatherText = document.getElementById("weather-text");
    if (!timeText && !weatherText) return;

    // Karachi approx: 24.86, 67.01
    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=24.86&longitude=67.01&current=temperature_2m,weather_code&timezone=auto";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Time
            if (timeText && data.current && data.current.time) {
                const dt = new Date(data.current.time);
                const dateStr = dt.toLocaleDateString("en-GB");
                const timeStr = dt.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit"
                });
                timeText.textContent = `${dateStr} | ${timeStr }`;
            }

            // Weather
            if (weatherText && data.current && typeof data.current.temperature_2m === "number") {
                const temp = data.current.temperature_2m;
                weatherText.textContent = `Karachi  • ${temp}°C`;
            }
        })
        .catch(() => {
            if (timeText) timeText.textContent = "Could not load time.";
            if (weatherText) weatherText.textContent = "Could not load weather.";
        });
}

// ===== Form Validation =====
function setupForm() {
    const form = document.getElementById("contact-form");
    const messageBox = document.getElementById("form-message");
    if (!form || !messageBox) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            messageBox.textContent = "Please fill in all the fields.";
            messageBox.className = "form-message error";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            messageBox.textContent = "Please enter a valid email address.";
            messageBox.className = "form-message error";
            return;
        }

        // Simulate JSON payload (like sending to server)
        const payload = {
            name,
            email,
            message,
            createdAt: new Date().toISOString()
        };
        console.log("Form JSON:", JSON.stringify(payload));

        messageBox.textContent = "Message sent successfully!";
        messageBox.className = "form-message success";
        form.reset();
    });
}

// ===== Simple Scroll Animations =====
function setupRevealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal();
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    renderServices();
    renderTestimonials();
    loadTimeAndWeather();
    setupForm();
    setupScrollSpy();
    setupRevealOnScroll();
});