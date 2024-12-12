
document.addEventListener("DOMContentLoaded", () => {
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

 });

