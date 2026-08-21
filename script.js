// ========================================
// IKURU GROUP — SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------
    // MENU MOBILE
    // ----------------------------------------

    const menuButton = document.getElementById("menu-btn");
    const navbar = document.getElementById("navbar");

    if (menuButton && navbar) {

        menuButton.addEventListener("click", function () {

            navbar.classList.toggle("active");

            const menuAberto = navbar.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                menuAberto
            );

            menuButton.setAttribute(
                "aria-label",
                menuAberto ? "Fechar menu" : "Abrir menu"
            );

        });


        // Fechar o menu quando clicar num link
        const links = navbar.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }


    // ----------------------------------------
    // ANO AUTOMÁTICO NO RODAPÉ
    // ----------------------------------------

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ----------------------------------------
    // SCROLL SUAVE
    // ----------------------------------------

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ----------------------------------------
    // HEADER AO FAZER SCROLL
    // ----------------------------------------

    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }

});
