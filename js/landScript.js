
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