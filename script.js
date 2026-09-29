/* =====================================================
   LOADING SCREEN
===================================================== */

const loader = document.getElementById("loader");
const loaderProgress = document.querySelector(".loader-progress");
const loaderNumber = document.querySelector(".loader-number");

let loadValue = 0;

const loadingInterval = setInterval(() => {

    loadValue += Math.floor(Math.random() * 8) + 2;

    if (loadValue >= 100) {
        loadValue = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);
    }

    loaderProgress.style.width = `${loadValue}%`;
    loaderNumber.textContent = `${loadValue}%`;

}, 60);


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

});

function animateCursor() {

    outlineX += (mouseX - outlineX) * 0.13;
    outlineY += (mouseY - outlineY) * 0.13;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

document
    .querySelectorAll("button, a, input")
    .forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("hover");
        });

    });


/* =====================================================
   MOUSE SPOTLIGHT
===================================================== */

const mouseLight = document.querySelector(".mouse-light");

document.addEventListener("mousemove", (event) => {

    mouseLight.style.left = `${event.clientX}px`;
    mouseLight.style.top = `${event.clientY}px`;

});


/* =====================================================
   HERO 3D MOVEMENT
===================================================== */

const hero = document.querySelector(".hero");
const heroCard = document.getElementById("heroCard");

hero.addEventListener("mousemove", (event) => {

    if (window.innerWidth <= 768) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

    heroCard.style.transform =
        `rotateY(${x * 2.2}deg)
         rotateX(${-y * 2.2}deg)
         translate3d(${x * 3}px, ${y * 3}px, 0)`;

});

hero.addEventListener("mouseleave", () => {

    heroCard.style.transition = "transform 0.8s ease";
    heroCard.style.transform =
        "rotateY(0deg) rotateX(0deg) translate3d(0,0,0)";

    setTimeout(() => {
        heroCard.style.transition = "";
    }, 800);

});


/* =====================================================
   COUNTDOWN
===================================================== */

/*
   Atur tanggal launching di sini.
   Contoh ini otomatis menggunakan 30 hari dari sekarang.
*/

const launchDate =
    new Date().getTime() +
    (30 * 24 * 60 * 60 * 1000);

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

function formatTime(value) {
    return String(value).padStart(2, "0");
}

function updateCountdown() {

    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

    daysElement.textContent = formatTime(days);
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   CHANGING TEXT
===================================================== */

const changingText =
    document.getElementById("changingText");

const words = [
    "extraordinary.",
    "meaningful.",
    "beautiful.",
    "different.",
    "unforgettable."
];

let wordIndex = 0;

setInterval(() => {

    changingText.style.opacity = "0";
    changingText.style.transform = "translateY(5px)";

    setTimeout(() => {

        wordIndex =
            (wordIndex + 1) % words.length;

        changingText.textContent =
            words[wordIndex];

        changingText.style.opacity = "1";
        changingText.style.transform = "translateY(0)";

    }, 300);

}, 2500);


/* =====================================================
   MAGNETIC BUTTON
===================================================== */

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach(element => {

    element.addEventListener("mousemove", event => {

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        element.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });

    element.addEventListener("mouseleave", () => {

        element.style.transition =
            "transform 0.4s ease";

        element.style.transform =
            "translate(0, 0)";

        setTimeout(() => {
            element.style.transition = "";
        }, 400);

    });

});


/* =====================================================
   MODAL
===================================================== */

const notifyButton =
    document.getElementById("notifyButton");

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

notifyButton.addEventListener("click", () => {

    modal.classList.add("active");

});

function hideModal() {

    modal.classList.remove("active");

}

closeModal.addEventListener("click", hideModal);

modalBackdrop.addEventListener("click", hideModal);

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        hideModal();
    }

});


/* =====================================================
   EMAIL FORM
===================================================== */

const emailForm =
    document.getElementById("emailForm");

const successMessage =
    document.getElementById("successMessage");

emailForm.addEventListener("submit", event => {

    event.preventDefault();

    emailForm.style.display = "none";
    successMessage.style.display = "block";

});


/* =====================================================
   PARTICLE CONSTELLATION
===================================================== */

const canvas =
    document.getElementById("particleCanvas");

const context =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth * window.devicePixelRatio;

    canvas.height =
        window.innerHeight * window.devicePixelRatio;

    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;

    context.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

    createParticles();
}

function createParticles() {

    particles = [];

    const particleCount =
        Math.min(
            80,
            Math.floor(window.innerWidth / 18)
        );

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * window.innerHeight,

            vx: (Math.random() - 0.5) * 0.15,

            vy: (Math.random() - 0.5) * 0.15,

            radius:
                Math.random() * 0.8 + 0.2

        });

    }
}

function animateParticles() {

    context.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach((particle, index) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
            particle.x < 0 ||
            particle.x > window.innerWidth
        ) {
            particle.vx *= -1;
        }

        if (
            particle.y < 0 ||
            particle.y > window.innerHeight
        ) {
            particle.vy *= -1;
        }

        context.beginPath();

        context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle =
            "rgba(255,255,255,0.25)";

        context.fill();

        /*
         * Hubungkan partikel yang berdekatan
         */

        for (
            let j = index + 1;
            j < particles.length;
            j++
        ) {

            const other =
                particles[j];

            const dx =
                particle.x - other.x;

            const dy =
                particle.y - other.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {

                const opacity =
                    (1 - distance / 110) * 0.06;

                context.beginPath();

                context.moveTo(
                    particle.x,
                    particle.y
                );

                context.lineTo(
                    other.x,
                    other.y
                );

                context.strokeStyle =
                    `rgba(255,255,255,${opacity})`;

                context.lineWidth = 0.5;

                context.stroke();
            }
        }

        /*
         * Reaksi partikel terhadap mouse
         */

        const mouseDX =
            particle.x - mouseX;

        const mouseDY =
            particle.y - mouseY;

        const mouseDistance =
            Math.sqrt(
                mouseDX * mouseDX +
                mouseDY * mouseDY
            );

        if (mouseDistance < 130) {

            const force =
                (130 - mouseDistance) / 130;

            particle.x +=
                (mouseDX / mouseDistance) *
                force *
                0.7;

            particle.y +=
                (mouseDY / mouseDistance) *
                force *
                0.7;
        }

    });

    requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================================
   CLICK RIPPLE
===================================================== */

document.addEventListener("click", event => {

    const ripple =
        document.createElement("div");

    ripple.style.position = "fixed";

    ripple.style.left =
        `${event.clientX}px`;

    ripple.style.top =
        `${event.clientY}px`;

    ripple.style.width = "5px";
    ripple.style.height = "5px";

    ripple.style.border =
        "1px solid rgba(199,255,94,.6)";

    ripple.style.borderRadius = "50%";

    ripple.style.pointerEvents = "none";

    ripple.style.zIndex = "9998";

    ripple.style.transform =
        "translate(-50%, -50%) scale(1)";

    ripple.style.opacity = "1";

    ripple.style.transition =
        "all .7s cubic-bezier(.16,1,.3,1)";

    document.body.appendChild(ripple);

    requestAnimationFrame(() => {

        ripple.style.transform =
            "translate(-50%, -50%) scale(15)";

        ripple.style.opacity = "0";

    });

    setTimeout(() => {
        ripple.remove();
    }, 750);

});