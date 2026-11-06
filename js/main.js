const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const wrapIndex = (index, length) => (index + length) % length;

const updateDots = (dots, activeIndex) => {
    dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
};

const setupDots = (dots, onSelect) => {
    dots.forEach((dot, index) => {
        dot.type = "button";
        dot.setAttribute("aria-label", `Show slide ${index + 1}`);
        dot.addEventListener("click", () => onSelect(index));
    });
};

const setupArrowButtons = (buttons, onPrevious, onNext) => {
    const [previousButton, nextButton] = buttons;

    if (!previousButton || !nextButton) {
        return;
    }

    previousButton.type = "button";
    nextButton.type = "button";
    previousButton.setAttribute("aria-label", "Previous slide");
    nextButton.setAttribute("aria-label", "Next slide");
    previousButton.addEventListener("click", onPrevious);
    nextButton.addEventListener("click", onNext);
};

const workingHistory = document.querySelector(".working-history");
const workingHistoryCards = workingHistory?.querySelector(".working-history-cards");

if (workingHistory && workingHistoryCards) {
    const buttons = workingHistory.querySelectorAll(".btn-slider .btn-secondary");

    setupArrowButtons(
        buttons,
        () => {
            const lastCard = workingHistoryCards.lastElementChild;
            if (lastCard) {
                workingHistoryCards.prepend(lastCard);
            }
        },
        () => {
            const firstCard = workingHistoryCards.firstElementChild;
            if (firstCard) {
                workingHistoryCards.append(firstCard);
            }
        }
    );
}

const about = document.querySelector(".about");
const aboutSubtitle = about?.querySelector(".about-subtitle");
const aboutAuthor = about?.querySelector(".author .name");
const aboutJobTitle = about?.querySelector(".author .job-title");
const aboutImage = about?.querySelector(".about-image-content");
const aboutDots = about ? Array.from(about.querySelectorAll(".pagination-dot")) : [];

if (about && aboutSubtitle && aboutAuthor && aboutJobTitle && aboutImage && aboutDots.length) {
    const aboutSlides = [
        {
            quote: "\"Life is unpredictable, not everything's in our control. But as long as you're with the right people, you can handle anything.\"",
            author: "Mr. John Wick",
            job: "PSYCHIATRIST DOCTOR",
            image: "./images/doctor-and-nurses.png"
        },
        {
            quote: "\"The best treatment starts with listening, understanding, and building trust with every patient.\"",
            author: "Dr. Sarah Connor",
            job: "NEUROLOGIST",
            image: "./images/hero-doctor-image.png"
        },
        {
            quote: "\"Small progress every day can lead to remarkable changes in a patient's life.\"",
            author: "Dr. Emily Carter",
            job: "CHILD NEUROLOGIST",
            image: "./images/float-banner-doctor-image.png"
        },
        {
            quote: "\"Compassion and science belong together when we care for people.\"",
            author: "Dr. Michael Scott",
            job: "MEDICAL RESEARCHER",
            image: "./images/doctor-avatar.png"
        },
        {
            quote: "\"A strong team gives patients confidence through every step of recovery.\"",
            author: "Dr. Olivia Benson",
            job: "PSYCHIATRIST DOCTOR",
            image: "./images/doctor-and-nurses.png"
        }
    ];
    let aboutIndex = 0;
    let aboutTimer;

    const showAboutSlide = (index) => {
        aboutIndex = wrapIndex(index, aboutSlides.length);
        const slide = aboutSlides[aboutIndex];

        aboutSubtitle.textContent = slide.quote;
        aboutAuthor.textContent = slide.author;
        aboutJobTitle.textContent = slide.job;
        aboutImage.src = slide.image;
        updateDots(aboutDots, aboutIndex);
    };

    const restartAboutTimer = () => {
        window.clearInterval(aboutTimer);
        aboutTimer = window.setInterval(() => showAboutSlide(aboutIndex + 1), 5000);
    };

    setupDots(aboutDots, (index) => {
        showAboutSlide(index);
        restartAboutTimer();
    });
    showAboutSlide(aboutIndex);
    restartAboutTimer();

    about.addEventListener("mouseenter", () => window.clearInterval(aboutTimer));
    about.addEventListener("mouseleave", restartAboutTimer);
    about.addEventListener("focusin", () => window.clearInterval(aboutTimer));
    about.addEventListener("focusout", restartAboutTimer);
}

const successStories = document.querySelector(".success-stories");
const successStoryContent = successStories?.querySelector(".success-story-content");
const successStoryDots = successStories
    ? Array.from(successStories.querySelectorAll(".pagination-dot"))
    : [];

if (successStories && successStoryContent && successStoryDots.length) {
    const successSlides = [
        "When the military doctor tracks down his former fiancee's kidnapped niece, he discovers a complex human trafficking network in Goa.",
        "After years of unexplained seizures, a young patient finally receives a clear diagnosis and a treatment plan that changes her life.",
        "A careful second opinion helps a family understand their child's symptoms and find the specialist support they need.",
        "Through rehabilitation and patience, one patient returns to work and the activities he loves most.",
        "A collaborative care team gives a patient confidence and steady progress throughout recovery."
    ];
    let successIndex = 0;
    const successButtons = successStories.querySelectorAll(
        ".success-stories-content-container .btn-secondary"
    );

    const showSuccessSlide = (index) => {
        successIndex = wrapIndex(index, successSlides.length);
        successStoryContent.textContent = successSlides[successIndex];
        updateDots(successStoryDots, successIndex);
    };

    setupArrowButtons(
        successButtons,
        () => showSuccessSlide(successIndex - 1),
        () => showSuccessSlide(successIndex + 1)
    );
    setupDots(successStoryDots, showSuccessSlide);
    showSuccessSlide(successIndex);
}

const eventAndShow = document.querySelector(".event-and-show");
const eventCards = eventAndShow
    ? Array.from(eventAndShow.querySelectorAll(".event-and-show-cards"))
    : [];
const eventDots = eventAndShow
    ? Array.from(eventAndShow.querySelectorAll(".pagination-dot"))
    : [];

if (eventAndShow && eventCards.length && eventDots.length) {
    const eventSlides = [
        [
            ["8 Sep, 2020", "125 Comments", "BMA Events"],
            ["18 Sep, 2020", "98 Comments", "CESR seminar for SAS grade doctors"]
        ],
        [
            ["22 Oct, 2020", "76 Comments", "Neurology Research Forum"],
            ["30 Oct, 2020", "112 Comments", "Patient Care Workshop"]
        ],
        [
            ["6 Nov, 2020", "64 Comments", "Children's Brain Health Day"],
            ["15 Nov, 2020", "87 Comments", "Medical Innovation Summit"]
        ],
        [
            ["3 Dec, 2020", "143 Comments", "Annual Doctors Conference"],
            ["12 Dec, 2020", "55 Comments", "Community Health Seminar"]
        ],
        [
            ["8 Jan, 2021", "91 Comments", "New Year Medical Meetup"],
            ["20 Jan, 2021", "73 Comments", "Specialist Training Session"]
        ]
    ];
    let eventIndex = 0;
    const eventButtons = eventAndShow.querySelectorAll(
        ".event-and-show-title .btn-secondary"
    );

    const showEventSlide = (index) => {
        eventIndex = wrapIndex(index, eventSlides.length);

        eventCards.forEach((card, cardIndex) => {
            const [date, comments, title] = eventSlides[eventIndex][cardIndex];
            const time = card.querySelector(".time");
            const comment = card.querySelector(".comment");
            const titleElement = card.querySelector(".event-and-show-card-content .title");

            if (time) {
                time.lastChild.textContent = ` ${date}`;
            }
            if (comment) {
                comment.lastChild.textContent = ` ${comments}`;
            }
            if (titleElement) {
                titleElement.textContent = title;
            }
        });

        updateDots(eventDots, eventIndex);
    };

    setupArrowButtons(
        eventButtons,
        () => showEventSlide(eventIndex - 1),
        () => showEventSlide(eventIndex + 1)
    );
    setupDots(eventDots, showEventSlide);
    showEventSlide(eventIndex);
}
