/* =========================================================
   IKURU GROUP
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   01. ELEMENTOS PRINCIPAIS
   ========================================================= */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");


/* =========================================================
   02. HEADER — EFEITO AO FAZER SCROLL
   ========================================================= */

function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

handleHeaderScroll();


/* =========================================================
   03. MENU MOBILE
   ========================================================= */

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

    });


    /* Fechar o menu quando um link for clicado */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });


    /* Fechar o menu ao pressionar Escape */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navigation.classList.remove("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });

}


/* =========================================================
   04. NAVEGAÇÃO ATIVA
   ========================================================= */

function updateActiveNavigation() {

    if (!sections.length || !navLinks.length) return;

    const scrollPosition = window.scrollY + 160;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        const linkTarget = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkTarget === `#${currentSection}`
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   05. SCROLL SUAVE PARA LINKS INTERNOS
   ========================================================= */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length < 2
        ) {
            return;
        }


        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   06. ANIMAÇÕES DE ENTRADA
   ========================================================= */

const animatedElements = document.querySelectorAll(
    ".section-heading, " +
    ".intro-heading, " +
    ".intro-text, " +
    ".about-content, " +
    ".about-highlight, " +
    ".principle-card, " +
    ".value-item, " +
    ".solution-card, " +
    ".group-main, " +
    ".group-unit, " +
    ".process-step, " +
    ".difference-title, " +
    ".difference-content, " +
    ".insights-placeholder, " +
    ".faq-item, " +
    ".contact-content, " +
    ".contact-form-wrapper"
);


const animationObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


animatedElements.forEach((element) => {
    animationObserver.observe(element);
});


/* =========================================================
   07. FAQ — COMPORTAMENTO
   ========================================================= */

const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach((item) => {

    item.addEventListener("toggle", () => {

        if (!item.open) return;

        faqItems.forEach((otherItem) => {

            if (otherItem !== item) {
                otherItem.removeAttribute("open");
            }

        });

    });

});


/* =========================================================
   08. FORMULÁRIO DE CONTACTO
   ========================================================= */

const contactForm = document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formData = new FormData(contactForm);

        const nome =
            formData.get("nome") ||
            formData.get("name") ||
            "";

        const empresa =
            formData.get("empresa") ||
            formData.get("company") ||
            "";

        const telefone =
            formData.get("telefone") ||
            formData.get("phone") ||
            "";

        const email =
            formData.get("email") ||
            "";

        const assunto =
            formData.get("assunto") ||
            formData.get("service") ||
            "";

        const mensagem =
            formData.get("mensagem") ||
            formData.get("message") ||
            "";


        /*
         * Neste momento o formulário não envia dados
         * para nenhum servidor.
         *
         * A lógica de envio será ligada posteriormente
         * ao sistema escolhido pelo IKURU Group.
         */


        console.log("Novo contacto:", {
            nome,
            empresa,
            telefone,
            email,
            assunto,
            mensagem
        });


        /*
         * Criamos uma mensagem simples para o utilizador.
         * O envio real poderá ser integrado posteriormente
         * com WhatsApp, e-mail ou backend próprio.
         */

        const successMessage =
            document.querySelector(".form-success");


        if (successMessage) {

            successMessage.hidden = false;

            successMessage.textContent =
                "Obrigado pelo contacto. A equipa do IKURU Group irá analisar a sua mensagem.";

        }


        contactForm.reset();

    });

}


/* =========================================================
   09. WHATSAPP
   ========================================================= */

const whatsappButton =
    document.querySelector(".whatsapp-button");


if (whatsappButton) {

    whatsappButton.addEventListener("click", () => {

        const phoneNumber = "258834414049";

        const message =
            "Olá, IKURU Group. Gostaria de conhecer melhor as soluções disponíveis para o meu negócio.";

        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* =========================================================
   10. ANO AUTOMÁTICO DO COPYRIGHT
   ========================================================= */

const currentYear =
    document.querySelector("[data-current-year]");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   11. EFEITO DE PARALLAX LEVE NO HERO
   ========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (
    heroVisual &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            heroVisual.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;

        },
        { passive: true }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   12. PROTEÇÃO CONTRA ERROS DE IMAGEM
   ========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

    });

});


/* =========================================================
   13. ESTADO INICIAL
   ========================================================= */

document.documentElement.classList.add("js-enabled");


console.log(
    "IKURU Group — site carregado com sucesso."
);
