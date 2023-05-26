let navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.color = '#fff';
    link.style.backgroundColor = '#666';
  });

  link.addEventListener('mouseleave', () => {
    link.style.color = '';
    link.style.backgroundColor = '';
  });
});
