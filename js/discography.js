const albums = [
    {
        title: "Kiss Land",
        year: "2013",
        cover: "images/kissLand.png",
        spotify: "#",
        position: "top",
        text1: "A dark and atmospheric project that introduced a more cinematic sound and strengthened Abel’s unique identity.",
        text2: "The album explores themes of isolation, fame and emotional detachment, becoming an important step in shaping his early style."
    },
    {
        title: "Beauty Behind the Madness",
        year: "2015",
        cover: "images/beautyBehindTheMadness.png",
        spotify: "#",
        position: "bottom",
        text1: "The album that brought The Weeknd massive global recognition and marked his breakthrough into the mainstream.",
        text2: "With hits like Can’t Feel My Face and The Hills, the record combines pop accessibility with his darker R&B aesthetics."
    },
    {
        title: "Starboy",
        year: "2016",
        cover: "images/starboy.png",
        spotify: "#",
        position: "top",
        text1: "An album that cemented Abel's status as one of the most influential artists of his generation.",
        text2: "In collaboration with Daft Punk, he experiments with sound, adding electronic motifs to traditional R&B. Theme: conflict between fame, personal life and struggle for identity."
    },
    {
        title: "My Dear Melancholy,",
        year: "2018",
        cover: "images/myDearMelancholy.png",
        spotify: "#",
        position: "bottom",
        text1: "A concise and emotionally intense release that returned Abel to a darker and more intimate sound.",
        text2: "The EP reflects heartbreak, nostalgia and emotional vulnerability, connecting strongly with his earlier aesthetic."
    },
    {
        title: "After Hours",
        year: "2020",
        cover: "images/afterHours.jpg",
        spotify: "#",
        position: "top",
        text1: "One of his most critically acclaimed albums, featuring a polished retro sound and a strong visual identity.",
        text2: "With tracks like Blinding Lights and Save Your Tears, the project blends synth-pop, vulnerability and cinematic storytelling."
    },
    {
        title: "Hurry Up Tomorrow",
        year: "2025",
        cover: "images/hurryUpTomorrow.jpg",
        spotify: "#",
        position: "bottom",
        text1: "A later-era project that continues The Weeknd’s evolution while preserving his dramatic and emotionally charged atmosphere.",
        text2: "The album expands his visual and musical universe, combining introspection, grandeur and modern production."
    }
];

const track = document.getElementById("discographyTrack");
const prevButton = document.querySelector(".discographyPrev");
const nextButton = document.querySelector(".discographyNext");

const visibleSlides = 3;
const cloneCount = visibleSlides;

let currentIndex = 2;
let isAnimating = false;

function normalizeIndex(index) {
    return (index + albums.length) % albums.length;
}

function getExtendedAlbums() {
    const firstClones = albums.slice(0, cloneCount);
    const lastClones = albums.slice(-cloneCount);

    return [...lastClones, ...albums, ...firstClones];
}

function createSlideMarkup(album, index) {
    const cardClass = album.position === "top" ? "albumCardTop" : "albumCardBottom";

    return `
        <div class="albumSlide" data-slide-index="${index}">
            <article class="albumCard ${cardClass}">
                <div class="albumAxis">
                    ${album.position === "top" ? '<span class="albumLineTop"></span>' : ""}
                    <span class="albumDot"></span>
                    ${album.position === "bottom" ? '<span class="albumLineBottom"></span>' : ""}
                </div>

                <div class="albumContent">
                    <p class="albumVerticalTitle">${album.title} - ${album.year}</p>

                    <img class="albumCover" src="${album.cover}" alt="${album.title} album cover">

                    <div class="albumMain">
                        <p class="albumYear">${album.year}</p>
                        <h3 class="albumTitle">${album.title}</h3>

                        <div class="albumDetails">
                            <p class="albumText">${album.text1}</p>
                            <p class="albumText">${album.text2}</p>

                            <a href="${album.spotify}" class="spotifyButton" target="_blank" rel="noopener noreferrer">
                                Listen on Spotify
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `;
}

function getSlideGap() {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap) || 32;
}

function getSlideStep() {
    const slide = track.querySelector(".albumSlide");

    if (!slide) {
        return 0;
    }

    return slide.getBoundingClientRect().width + getSlideGap();
}

function updateActiveSlide() {
    const slides = track.querySelectorAll(".albumSlide");

    slides.forEach((slide) => {
        slide.classList.remove("isActive");
    });

    const activeSlideIndex = currentIndex + cloneCount;

    if (slides[activeSlideIndex]) {
        slides[activeSlideIndex].classList.add("isActive");
    }
}

function updateTrackPosition(withAnimation = true) {
    const slideStep = getSlideStep();

    const offsetIndex = currentIndex + cloneCount - 1;
    const offset = offsetIndex * slideStep;

    track.style.transition = withAnimation ? "transform 0.45s ease" : "none";
    track.style.transform = `translateX(-${offset}px)`;

    updateActiveSlide();
}

function renderTrack() {
    const extendedAlbums = getExtendedAlbums();

    track.innerHTML = extendedAlbums
        .map((album, index) => createSlideMarkup(album, index))
        .join("");

    const slides = track.querySelectorAll(".albumSlide");

    slides.forEach((slide, slideIndex) => {
        slide.addEventListener("click", () => {
            const realIndex = slideIndex - cloneCount;
            currentIndex = normalizeIndex(realIndex);
            updateTrackPosition(true);
        });
    });

    requestAnimationFrame(() => {
        updateTrackPosition(false);
    });
}

function goNext() {
    if (isAnimating) {
        return;
    }

    isAnimating = true;
    currentIndex += 1;
    updateTrackPosition(true);
}

function goPrev() {
    if (isAnimating) {
        return;
    }

    isAnimating = true;
    currentIndex -= 1;
    updateTrackPosition(true);
}

track.addEventListener("transitionend", () => {
    if (currentIndex >= albums.length) {
        currentIndex = 0;
        updateTrackPosition(false);
    }

    if (currentIndex < 0) {
        currentIndex = albums.length - 1;
        updateTrackPosition(false);
    }

    isAnimating = false;
});

prevButton.addEventListener("click", goPrev);
nextButton.addEventListener("click", goNext);

window.addEventListener("resize", () => {
    updateTrackPosition(false);
});

renderTrack();