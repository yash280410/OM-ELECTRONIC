/* =========================================================
   RS PHOTOGRAPHY
   CUSTOMER WEBSITE
   CLEAN MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loader =
        document.getElementById("loader");

    const header =
        document.getElementById("header");

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const themeBtn =
        document.getElementById("themeBtn");

    const topBtn =
        document.getElementById("topBtn");

    const year =
        document.getElementById("year");

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingMessage =
        document.getElementById("bookingMessage");

    const loadMoreBtn =
        document.getElementById("loadMore");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    /* =====================================================
       SIMPLE PAGE LOADER
    ===================================================== */

    const hideLoader = () => {

        if (!loader) {
            return;
        }

        loader.classList.add("hide");

        document.body.classList.remove(
            "no-scroll"
        );

        setTimeout(() => {

            if (loader) {
                loader.remove();
            }

        }, 600);

    };


    window.addEventListener(
        "load",
        hideLoader,
        { once: true }
    );


    /* Safety fallback */

    setTimeout(
        hideLoader,
        1800
    );


    /* =====================================================
       SMART HEADER
       DOWN = HIDE
       UP = SHOW
    ===================================================== */

    let lastScrollY =
        window.scrollY;


    const updateHeader = () => {

        if (!header) {
            return;
        }


        const currentScrollY =
            window.scrollY;


        /* At top */

        if (currentScrollY <= 20) {

            header.classList.remove(
                "scrolled"
            );

            header.classList.remove(
                "header-hidden"
            );

            lastScrollY =
                currentScrollY;

            return;
        }


        /* Header background */

        if (currentScrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }


        /* Scroll direction */

        if (currentScrollY > lastScrollY) {

            header.classList.add(
                "header-hidden"
            );

        } else if (
            currentScrollY < lastScrollY
        ) {

            header.classList.remove(
                "header-hidden"
            );

        }


        lastScrollY =
            currentScrollY;

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMobileMenu = () => {

        if (!mobileMenu || !menuBtn) {
            return;
        }


        mobileMenu.classList.remove(
            "open"
        );


        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        menuBtn.textContent =
            "☰";

    };


    if (
        menuBtn &&
        mobileMenu
    ) {

        menuBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuBtn.textContent =
                    isOpen
                        ? "×"
                        : "☰";

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* =====================================================
       CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileMenu ||
                !menuBtn
            ) {
                return;
            }


            if (
                !mobileMenu.contains(
                    event.target
                ) &&
                !menuBtn.contains(
                    event.target
                )
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "rsPhotographyTheme"
        );


    const updateThemeIcon = () => {

        if (!themeBtn) {
            return;
        }


        themeBtn.textContent =
            document.body.classList.contains(
                "dark"
            )
                ? "☀"
                : "☾";

    };


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeIcon();


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                const isDark =
                    document.body.classList.toggle(
                        "dark"
                    );


                localStorage.setItem(
                    "rsPhotographyTheme",
                    isDark
                        ? "dark"
                        : "light"
                );


                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       GALLERY FILTER
    ===================================================== */

    const filters =
        document.querySelectorAll(
            ".filter"
        );


    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                filter.classList.add(
                    "active"
                );


                const selected =
                    filter.dataset.filter;


                galleryItems.forEach(
                    item => {

                        const category =
                            item.dataset.category;


                        if (
                            selected === "all" ||
                            selected === category
                        ) {

                            item.style.display =
                                "";

                        } else {

                            item.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    let galleryImages = [];

    let currentImageIndex = 0;


    const refreshGalleryImages = () => {

        galleryImages =
            Array.from(
                document.querySelectorAll(
                    ".gallery-item img"
                )
            );

    };


    const showLightboxImage = index => {

        refreshGalleryImages();


        if (
            !lightbox ||
            !lightboxImage ||
            galleryImages.length === 0
        ) {

            return;

        }


        if (index < 0) {

            index =
                galleryImages.length - 1;

        }


        if (
            index >=
            galleryImages.length
        ) {

            index = 0;

        }


        currentImageIndex =
            index;


        const image =
            galleryImages[
                currentImageIndex
            ];


        if (!image) {
            return;
        }


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt ||
            "RS Photography";


        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "no-scroll"
        );

    };


    const closeLightbox = () => {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        if (lightboxImage) {

            lightboxImage.src = "";

        }

    };


    galleryItems.forEach(
        (item, index) => {

            const image =
                item.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            item.addEventListener(
                "click",
                () => {

                    showLightboxImage(
                        index
                    );

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                showLightboxImage(
                    currentImageIndex - 1
                );

            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                showLightboxImage(
                    currentImageIndex + 1
                );

            }
        );

    }


    /* =====================================================
       LIGHTBOX KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                showLightboxImage(
                    currentImageIndex - 1
                );

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                showLightboxImage(
                    currentImageIndex + 1
                );

            }

        }
    );


    /* =====================================================
       VIDEO PLAYER
    ===================================================== */

    const videoCards =
        document.querySelectorAll(
            ".video-card"
        );


    const videos =
        document.querySelectorAll(
            ".video-card video"
        );


    videos.forEach(video => {

        video.addEventListener(
            "play",
            () => {

                videos.forEach(
                    otherVideo => {

                        if (
                            otherVideo !==
                            video
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

            }
        );


        video.addEventListener(
            "error",
            () => {

                console.error(
                    "Video could not load:",
                    video.currentSrc ||
                    video.src
                );

            }
        );

    });


    videoCards.forEach(card => {

        const video =
            card.querySelector(
                "video"
            );


        const playButton =
            card.querySelector(
                ".play-btn"
            );


        if (
            !video ||
            !playButton
        ) {

            return;

        }


        const updateButton = () => {

            playButton.textContent =
                video.paused
                    ? "▶"
                    : "Ⅱ";

        };


        const toggleVideo = event => {

            if (event) {

                event.stopPropagation();

            }


            if (video.paused) {

                videos.forEach(
                    otherVideo => {

                        if (
                            otherVideo !==
                            video
                        ) {

                            otherVideo.pause();

                        }

                    }
                );


                video.play()
                    .catch(error => {

                        console.error(
                            "Video play failed:",
                            error
                        );

                    });

            } else {

                video.pause();

            }


            updateButton();

        };


        playButton.addEventListener(
            "click",
            toggleVideo
        );


        video.addEventListener(
            "click",
            toggleVideo
        );


        video.addEventListener(
            "play",
            updateButton
        );


        video.addEventListener(
            "pause",
            updateButton
        );


        video.addEventListener(
            "ended",
            updateButton
        );


        updateButton();

    });


    /* =====================================================
       LOAD MORE
    ===================================================== */

    if (loadMoreBtn) {

        loadMoreBtn.addEventListener(
            "click",
            () => {

                loadMoreBtn.textContent =
                    "More Photos Coming Soon";


                loadMoreBtn.disabled =
                    true;


                loadMoreBtn.style.opacity =
                    "0.6";

            }
        );

    }


    /* =====================================================
       BOOKING FORM
       CUSTOMER → SUPABASE
    ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            async event => {

                /*
                   IMPORTANT

                   Stop the browser from doing:

                   website/?name=...&phone=...

                   Instead JavaScript sends
                   the data directly to Supabase.
                */

                event.preventDefault();

                event.stopPropagation();


                /* -----------------------------------------
                   MESSAGE ELEMENT
                ----------------------------------------- */

                const showMessage =
                    (
                        text,
                        type = ""
                    ) => {

                        if (!bookingMessage) {
                            return;
                        }


                        bookingMessage.textContent =
                            text;


                        bookingMessage.className =
                            "booking-message";


                        if (type) {

                            bookingMessage.classList.add(
                                type
                            );

                        }

                    };


                /* -----------------------------------------
                   SUPABASE CLIENT CHECK
                ----------------------------------------- */

                if (
                    typeof supabaseClient ===
                    "undefined"
                ) {

                    console.error(
                        "supabaseClient is undefined."
                    );


                    showMessage(
                        "Database connection is not available.",
                        "error"
                    );


                    return;

                }


                /* -----------------------------------------
                   FORM DATA
                ----------------------------------------- */

                const formData =
                    new FormData(
                        bookingForm
                    );


                const customerName =
                    String(
                        formData.get(
                            "name"
                        ) || ""
                    ).trim();


                const phone =
                    String(
                        formData.get(
                            "phone"
                        ) || ""
                    ).trim();


                const location =
                    String(
                        formData.get(
                            "location"
                        ) || ""
                    ).trim();


                const bookingDate =
                    String(
                        formData.get(
                            "date"
                        ) || ""
                    ).trim();


                const functionType =
                    String(
                        formData.get(
                            "function"
                        ) || ""
                    ).trim();


                /*
                   Support BOTH names:

                   OtherEvent
                   other_event
                */

                const otherEvent =
                    String(
                        formData.get(
                            "OtherEvent"
                        ) ||
                        formData.get(
                            "other_event"
                        ) ||
                        ""
                    ).trim();


                const bookingTime =
                    String(
                        formData.get(
                            "time"
                        ) || ""
                    ).trim();


                /*
                   Support BOTH:

                   budget
                   expected_money
                */

                const budgetRaw =
                    String(
                        formData.get(
                            "budget"
                        ) ||
                        formData.get(
                            "expected_money"
                        ) ||
                        ""
                    ).trim();


                /*
                   Support BOTH:

                   message
                   notes
                */

                const message =
                    String(
                        formData.get(
                            "message"
                        ) ||
                        formData.get(
                            "notes"
                        ) ||
                        ""
                    ).trim();


                /* -----------------------------------------
                   FINAL FUNCTION
                ----------------------------------------- */

                const finalFunction =
                    functionType === "Other"
                        ? otherEvent
                        : functionType;


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (
                    !customerName ||
                    !phone ||
                    !location ||
                    !bookingDate ||
                    !finalFunction ||
                    !bookingTime
                ) {

                    showMessage(
                        "Please fill in all required fields.",
                        "error"
                    );


                    return;

                }


                /* -----------------------------------------
                   PHONE VALIDATION
                ----------------------------------------- */

                const phoneDigits =
                    phone.replace(
                        /\D/g,
                        ""
                    );


                if (
                    phoneDigits.length < 8 ||
                    phoneDigits.length > 15
                ) {

                    showMessage(
                        "Please enter a valid phone number.",
                        "error"
                    );


                    return;

                }


                /* -----------------------------------------
                   BUDGET
                ----------------------------------------- */

                let expectedMoney =
                    null;


                if (
                    budgetRaw !== ""
                ) {

                    expectedMoney =
                        Number(
                            budgetRaw
                        );


                    if (
                        !Number.isFinite(
                            expectedMoney
                        ) ||
                        expectedMoney < 0
                    ) {

                        showMessage(
                            "Please enter a valid expected amount.",
                            "error"
                        );


                        return;

                    }

                }


                /* -----------------------------------------
                   SUBMIT BUTTON
                ----------------------------------------- */

                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? (
                            submitButton.textContent ||
                            "Submit"
                        )
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    if (
                        submitButton.tagName ===
                        "INPUT"
                    ) {

                        submitButton.value =
                            "Sending...";

                    } else {

                        submitButton.textContent =
                            "Sending...";

                    }

                }


                showMessage(
                    "Sending your booking..."
                );


                /* -----------------------------------------
                   DATABASE OBJECT
                ----------------------------------------- */

                const booking = {

                    customer_name:
                        customerName,

                    phone:
                        phone,

                    location:
                        location,

                    booking_date:
                        bookingDate,

                    booking_time:
                        bookingTime,

                    function_type:
                        finalFunction,

                    expected_money:
                        expectedMoney,

                    notes:
                        message || null,

                    status:
                        "pending"

                };


                console.log(
                    "RS Photography booking:",
                    booking
                );


                /* -----------------------------------------
                   SEND TO SUPABASE
                ----------------------------------------- */

                const {
                    error
                } =
                    await supabaseClient
                        .from("orders")
                        .insert(
                            booking
                        );


                /* -----------------------------------------
                   DATABASE ERROR
                ----------------------------------------- */

                if (error) {

                    console.error(
                        "SUPABASE BOOKING ERROR:",
                        error
                    );


                    showMessage(
                        "Booking could not be submitted. Please try again.",
                        "error"
                    );


                    return;

                }


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                console.log(
                    "Booking successfully saved."
                );


                showMessage(
                    "Booking request submitted successfully.",
                    "success"
                );


                bookingForm.reset();


                /* -----------------------------------------
                   RESTORE BUTTON
                ----------------------------------------- */

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    if (
                        submitButton.tagName ===
                        "INPUT"
                    ) {

                        submitButton.value =
                            originalButtonText;

                    } else {

                        submitButton.textContent =
                            originalButtonText;

                    }

                }

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const updateTopButton = () => {

        if (!topBtn) {
            return;
        }


        if (
            window.scrollY > 500
        ) {

            topBtn.classList.add(
                "show"
            );

        } else {

            topBtn.classList.remove(
                "show"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );


    updateTopButton();


    if (topBtn) {

        topBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       ESCAPE LIGHTBOX
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            if (
                lightbox &&
                lightbox.classList.contains(
                    "open"
                )
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       WEBSITE READY
    ===================================================== */

    console.log(
        "RS Photography website initialized successfully."
    );

});