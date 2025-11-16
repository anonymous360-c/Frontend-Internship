function toggleMenu() {
    let nav = document.getElementById("nav-links");
    nav.style.display = (nav.style.display === "block") ? "none" : "block";
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});