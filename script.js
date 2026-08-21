/* =========================================================
   IKURU GROUP
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");
    const contactForm = document.querySelector(".contact-form");


    /* =====================================================
       02. HEADER ON SCROLL
    ===================================================== */

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       03. SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       04. MOBILE NAVIGATION
    ===================================================== */

    /*
       O HTML atual ainda não possui um botão de menu mobile.

       Este código cria o botão automaticamente em telas
       pequenas. Assim não precisamos alterar o HTML agora.
    */

    const createMobileMenu = () => {

        if (!nav || !header) return;

        const existingButton =
            document.querySelector(".mobile-menu-button");

        if (existingButton) return;


        const menuButton =
            document.createElement("button");

        menuButton.className = "mobile-menu-button";

        menuButton.type = "button";

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;


        const headerContainer =
            document.querySelector(".header-container");

        if (headerContainer) {
            headerContainer.appendChild(menuButton);
        }


        menuButton.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("mobile-open");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                menuButton.classList.remove("active");

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

    };


    createMobileMenu();


    /* =====================================================
       05. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!nav) return;

        const menuButton =
            document.querySelector(".mobile-menu-button");

        if (!menuButton) return;

        const clickedInsideNav =
            nav.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedButton &&
            nav.classList.contains("mobile-open")
        ) {

            nav.classList.remove("mobile-open");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    /* =====================================================
       06. ESC CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (!nav) return;

        const menuButton =
            document.querySelector(".mobile-menu-button");

        if (!menuButton) return;

        nav.classList.remove("mobile-open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    });


    /* =====================================================
       07. CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /*
                   IMPORTANTE:

                   O formulário ainda não está conectado
                   a um backend ou serviço de envio.

                   Portanto, não vamos apresentar uma
                   mensagem falsa dizendo que a mensagem
                   foi enviada.
                */


                const name =
                    document.querySelector("#name")?.value.trim();

                const phone =
                    document.querySelector("#phone")?.value.trim();

                if (!name || !phone) {

                    alert(
                        "Por favor, preencha o seu nome e número de WhatsApp/telefone."
                    );

                    return;
                }


                /*
                   Aqui será implementado posteriormente
                   o envio real do formulário.
                */

                alert(
                    "O formulário está pronto. O envio será conectado na próxima etapa."
                );

            }
        );

    }


    /* =====================================================
       08. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(".footer-bottom p");

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.innerHTML =
            `© ${currentYear} IKURU Group. Todos os direitos reservados.`;

    }


    /* =====================================================
       09. PREVENT BROKEN ANCHORS
    ===================================================== */

    const allAnchorLinks =
        document.querySelectorAll('a[href="#"]');

    allAnchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });

})
/* =========================================================
   MOBILE MENU
   ========================================================= */

.mobile-menu-button {
    display: none;

    width: 42px;
    height: 42px;

    padding: 9px;

    background: transparent;

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;

    flex-direction: column;
    justify-content: center;
    gap: 5px;
}

.mobile-menu-button span {
    display: block;

    width: 100%;
    height: 2px;

    background: #FFFFFF;

    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
}

.site-header.scrolled {
    background: rgba(7, 17, 31, 0.98);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 640px) {

    .mobile-menu-button {
        display: flex;
    }

    .main-nav {
        position: absolute;

        top: var(--header-height);
        left: 15px;
        right: 15px;

        display: flex;
        flex-direction: column;

        align-items: stretch;

        gap: 0;

        padding: 10px;

        background: #0B1728;

        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;

        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);

        opacity: 0;
        visibility: hidden;

        transform: translateY(-10px);

        transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            visibility 0.25s ease;
    }

    .main-nav.mobile-open {
        opacity: 1;
        visibility: visible;

        transform: translateY(0);
    }

    .main-nav a {
        display: block;

        padding: 14px 12px;

        border-radius: 5px;
    }

    .main-nav a:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .main-nav a::after {
        display: none;
    }


    /* Animated hamburger */

    .mobile-menu-button.active span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    .mobile-menu-button.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-button.active span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

}
