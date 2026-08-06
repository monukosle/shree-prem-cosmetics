document.addEventListener("DOMContentLoaded", function () {

    // Page load hone par agar URL me #id ho to us section par scroll karo
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    }

});