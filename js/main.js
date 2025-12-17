// Smooth scroll for in-page navigation
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            event.preventDefault();
            const target = document.querySelector(targetId);
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
