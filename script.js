// ========================================
// IKURU GROUP — INTERACTIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------
    // HEADER SCROLL EFFECT
    // ----------------------------------------

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    // ----------------------------------------
    // SCROLL REVEAL ANIMATIONS
    // ----------------------------------------

    const revealElements = document.querySelectorAll(
        ".section, .service-card, .cta"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });


    // ----------------------------------------
    // SMOOTH NAVIGATION
    // ----------------------------------------

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ----------------------------------------
    // SERVICE CARD INTERACTION
    // ----------------------------------------

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });

    });


    // ----------------------------------------
    // CURRENT YEAR
    // ----------------------------------------

    const yearElement = document.querySelector(
        ".footer p"
    );

    if (yearElement) {

        const currentYear = new Date().getFullYear();

        yearElement.textContent =
            `© ${currentYear} IKURU Group. All rights reserved.`;

    }

});
