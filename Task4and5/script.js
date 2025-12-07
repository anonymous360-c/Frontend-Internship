function toggleMenu() {
    let nav = document.getElementById("nav-links");
    nav.style.display = (nav.style.display === "block") ? "none" : "block";
}

// Smooth scroll only for links that start with "#"
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth"
            });

            // Close mobile menu after click
            let nav = document.getElementById("nav-links");
            if (window.innerWidth <= 768) {
                nav.style.display = "none";
            }
        }
    });
});

// Simple form validation + messages
const contactForms = document.querySelectorAll(".contact-form");

contactForms.forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        const messageBox = form.querySelector(".form-message");

        let errorText = "";

        if (!nameInput.value.trim()) {
            errorText = "Please enter your name.";
        } else if (!emailInput.value.trim()) {
            errorText = "Please enter your email.";
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value.trim())) {
            errorText = "Please enter a valid email address.";
        } else if (!messageInput.value.trim()) {
            errorText = "Please enter your message.";
        }

        if (errorText) {
            messageBox.textContent = errorText;
            messageBox.classList.remove("success");
            messageBox.classList.add("error");
        } else {
            messageBox.textContent = "Thank you! Your message has been sent.";
            messageBox.classList.remove("error");
            messageBox.classList.add("success");
            form.reset();
        }
    });
});