document.addEventListener("DOMContentLoaded", function () {
    // Navbar Indicator
    const navLinks = document.querySelectorAll(".navbar a");
    const navbar = document.querySelector(".navbar");
    const indicator = document.createElement("span");
    indicator.classList.add("nav-indicator");
    navbar.appendChild(indicator);

    function moveIndicator(element) {
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    }

    function setActiveLink(link) {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active", "visited");
        moveIndicator(link);
    }

    // Cek halaman aktif dari localStorage
    const currentPage = localStorage.getItem("activePage");
    if (currentPage) {
        const activeLink = [...navLinks].find((link) => link.href === currentPage);
        if (activeLink) setActiveLink(activeLink);
    }

    navLinks.forEach((link) => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            setTimeout(() => setActiveLink(link), 100);
        }
        link.addEventListener("click", function () {
            localStorage.setItem("activePage", this.href);
        });
    });

    // Scroll Indicator & Active Nav Link
    const sections = document.querySelectorAll("section");

    function updateNavbar() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach((section) => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                const targetId = section.getAttribute("id");
                const targetLink = [...navLinks].find(
                    (link) => link.getAttribute("href") === `#${targetId}`
                );
                if (targetLink) setActiveLink(targetLink);
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                event.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth",
                });
                setActiveLink(this);
            }
        });
    });

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const rootElement = document.documentElement;
    const currentTheme = localStorage.getItem("theme") || "light";
    rootElement.setAttribute("data-theme", currentTheme);

    function updateThemeIcon() {
        themeToggle.innerHTML =
            rootElement.getAttribute("data-theme") === "dark"
                ? "<i class='bx bx-sun'></i>"
                : "<i class='bx bx-moon'></i>";
    }

    if (themeToggle) {
        updateThemeIcon();
        themeToggle.addEventListener("click", function () {
            const newTheme = rootElement.getAttribute("data-theme") === "light" ? "dark" : "light";
            rootElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon();
        });
    }

    // Timeline Scroll Animation
    const timelineItems = document.querySelectorAll(".timeline-item");

    function checkScroll() {
        timelineItems.forEach((item) => {
            if (item.getBoundingClientRect().top < window.innerHeight * 0.75) {
                item.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // Progress Bar Animation
    document.querySelectorAll(".progress").forEach((bar) => {
        bar.style.width = bar.style.getPropertyValue("--progress-width");
    });

    // Toggle Navbar (Hamburger Menu)
    const menuIcon = document.getElementById("menu-icon");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("active");
            menuIcon.classList.toggle("active");
        });
    }

    
});
