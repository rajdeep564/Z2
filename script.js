document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const menuWrapper = document.querySelector('.menu-wrapper');
    const navBackground = document.querySelector('.nav-background');

    // Toggle menu and background on click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        navBackground.classList.toggle('open'); // Toggle background
    });

    // Close the menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!menuWrapper.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            navBackground.classList.remove('open'); // Hide background
        }
    });
});

// Code for the canvas animations
function files(index) {
    return `new Scroll/out-Drone_${1000 + index}.jpg`;
}

const frameCount = 230;
const images = [];
const imageSeq = { frame: 0 };

const canvas = document.querySelector("#home > canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

// Load images directly from the path
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    img.onload = function() {
        images.push(img);
        if (i === 0) { // Render the first frame once the first image is loaded
            render();
        }
    };
}

gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 1.8,
        pin: true,
        trigger: "#home",
    },
    onUpdate: render
});

function render() {
    scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

ScrollTrigger.create({
    trigger: "#home",
    pin: true,
    start: "top top",
    scrub: 1.8
});
