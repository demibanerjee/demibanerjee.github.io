
// JavaScript for Carousel
function initializeCarousel() {
    // Code to initialize a carousel for projects
}

// JavaScript for Modal Pop-ups
function initializeModals() {
    // Code to initialize modals for detailed views
}

// JavaScript for Hover Effects
function addHoverEffects() {
    // Code to add hover effects to certain elements
}

// Initialize functions on window load
window.onload = function() {
    initializeCarousel();
    initializeModals();
    addHoverEffects();
};

const newsContainer = document.querySelector('.news-container');

newsContainer.addEventListener('mouseover', () => {
    newsContainer.style.animationPlayState = 'paused';
});

newsContainer.addEventListener('mouseout', () => {
    newsContainer.style.animationPlayState = 'running';
});
