
document.addEventListener("DOMContentLoaded", function () {

    const mobileToggle =
        document.querySelector(".vs-mobile-toggle");

    const mobileMenu =
        document.querySelector(".vs-mobile-menu");

    if (!mobileToggle || !mobileMenu) {
        return;
    }


    /* =========================================
       OPEN / CLOSE MOBILE MENU
    ========================================= */

    mobileToggle.addEventListener("click", function () {

        const isOpen =
            mobileMenu.classList.toggle("open");


        mobileToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );


        const icon =
            mobileToggle.querySelector("i");


        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    /* =========================================
       CLOSE AFTER CLICKING MOBILE LINK
    ========================================= */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                mobileToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        });

    });


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedToggle =
            mobileToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                mobileToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });


    /* =========================================
       RESET MOBILE MENU ON DESKTOP
    ========================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 767) {

            mobileMenu.classList.remove("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                mobileToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const desktopLinks =
        document.querySelectorAll(
            ".vs-nav-menu li a"
        );


    desktopLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            document
                .querySelectorAll(".vs-nav-menu li")
                .forEach(function (item) {

                    item.classList.remove("active");

                });


            const parent =
                link.closest("li");


            if (parent) {
                parent.classList.add("active");
            }

        });

    });

});




const TESTIMONIALS = [
    {
        text: "White Bunnie has transformed our business! The quality of leads and ROI we get from their ads is exceptional.",
        name: "James R.", role: "Business Owner, USA", stars: 5,
        img: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?fm=jpg&q=80&w=200&h=200&fit=crop&crop=faces",
        initials: "JR", color: "#2F5FAF"
    },
    {
        text: "Their team took our Google Ads to a whole new level. We doubled our booked calls in just two months.",
        name: "Sophia M.", role: "Marketing Head, USA", stars: 5,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=80&w=200&h=200&fit=crop&crop=faces",
        initials: "SM", color: "#B03A48"
    },
    {
        text: "Professional, responsive and truly data-driven. Our cost per lead dropped while conversions kept climbing.",
        name: "Daniel K.", role: "Founder, USA", stars: 5,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=80&w=200&h=200&fit=crop&crop=faces",
        initials: "DK", color: "#2E7D66"
    },
    {
        text: "Best marketing decision we made this year. The custom plan they built fits our market perfectly.",
        name: "Olivia T.", role: "CEO, USA", stars: 5,
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=80&w=200&h=200&fit=crop&crop=faces",
        initials: "OT", color: "#7A4BA8"
    }
];

function fallbackAvatar(initials, color) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
        '<rect width="120" height="120" fill="' + color + '"/>' +
        '<text x="50%" y="50%" dy="2" dominant-baseline="middle" text-anchor="middle" ' +
        'font-family="Poppins,Arial" font-size="44" font-weight="700" fill="#fff">' + initials + '</text></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

var stage = document.getElementById('tStage');

TESTIMONIALS.forEach(function (t, i) {
    var el = document.createElement('div');
    el.className = 't-slide' + (i === 0 ? ' is-active' : '');

    var p = document.createElement('p');
    p.className = 't-text';
    p.textContent = t.text;

    var person = document.createElement('div');
    person.className = 't-person';

    var img = document.createElement('img');
    img.className = 't-avatar';
    img.src = t.img;
    img.alt = t.name;
    img.loading = 'lazy';
    img.onerror = function () { this.onerror = null; this.src = fallbackAvatar(t.initials, t.color); };

    var meta = document.createElement('div');
    meta.innerHTML = '<div class="t-name"></div><div class="t-role"></div>' +
        '<div class="t-stars">' + '★'.repeat(t.stars) + '</div>';
    meta.querySelector('.t-name').textContent = t.name;
    meta.querySelector('.t-role').textContent = t.role;

    person.appendChild(img);
    person.appendChild(meta);
    el.appendChild(p);
    el.appendChild(person);
    stage.appendChild(el);
});

var slides = stage.querySelectorAll('.t-slide');
var current = 0, timer = null;

function startRotation() {
    if (slides.length < 2 || timer) return;
    timer = setInterval(function () {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
    }, 6000);
}
function stopRotation() { clearInterval(timer); timer = null; }

startRotation();
stage.addEventListener('mouseenter', stopRotation);
stage.addEventListener('mouseleave', startRotation);
document.addEventListener('visibilitychange', function () {
    document.hidden ? stopRotation() : startRotation();
});

// var service = document.querySelector('select[name="service"]');
// service.addEventListener('change', function () {
//     service.classList.toggle('has-value', !!service.value);
// });

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message")
    };

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwfvL0C8rHyhAXqm_waBLq95Fdi1FX18PMIC_ZS6Ww5slSFQ0QFYalCjME4UuAIfweE/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (result.success) {
            // alert("Form submitted successfully!");
            // form.reset();
            var btn = form.querySelector('.submit');
            var html = btn.innerHTML;
            btn.innerHTML = "Thanks! We'll be in touch \u2713";
            btn.style.background = '#1E7A4C';
            setTimeout(function () {
                btn.innerHTML = html;
                btn.style.background = '';
                form.reset();
                // service.classList.remove('has-value');
            }, 2600);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
    }
});

// document.getElementById('contactForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     var btn = this.querySelector('.submit');
//     var html = btn.innerHTML;
//     var form = this;
//     btn.innerHTML = "Thanks! We'll be in touch \u2713";
//     btn.style.background = '#1E7A4C';
//     setTimeout(function () {
//         btn.innerHTML = html;
//         btn.style.background = '';
//         form.reset();
//         service.classList.remove('has-value');
//     }, 2600);
// });
