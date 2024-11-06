// import AOS from 'aos';
// import 'aos/dist/aos.css';


// AOS.init({
//     offset: 120, // Offset from the original trigger point
//     duration: 800, // Animation duration in milliseconds
//     easing: 'ease-in-out', // Easing function for the animation
//     once: true, // Whether animation should happen only once
//     mirror: false, // Whether elements should animate out when scrolling past them
// });

document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector(".button");
    let buttonclass = document.querySelector(".buttonclass");
    let mobileNav = document.querySelector(".mobile");
    let temp = 0;

    button.addEventListener("click", () => {
        temp++;
        if (temp % 2 != 1) {
            mobileNav.classList.replace("flex", "hidden");
            buttonclass.classList.replace("fa-close", "fa-bars");
        } else {
            buttonclass.classList.replace("fa-bars", "fa-close");
            mobileNav.classList.replace("hidden", "flex");
            mobileNav.classList.add("delay-400");
            mobileNav.classList.add("animate-slideDown");
        }
    });

    const background = document.getElementById("background");
    const images = ["bg-image1", "bg-image2", "bg-image3"];
    let currentIndex = 0;

    function changeBackground() {
        background.classList.remove(images[currentIndex]);
        currentIndex = (currentIndex + 1) % images.length;
        background.classList.add(images[currentIndex]);
    }

    setInterval(changeBackground, 4000);
});

