const moonIcon = document.querySelector('svg.feather-moon');
const sunIcon = document.querySelector('svg.feather-sun');

moonIcon.addEventListener('click', () => {
  if (sunIcon.style.display === 'none') {
    moonIcon.style.display = 'none';
    sunIcon.style.display = '';
    document.body.classList.add('dark-mode');
  }
});

sunIcon.addEventListener('click', () => {
  if (moonIcon.style.display === 'none') {
    moonIcon.style.display = '';
    sunIcon.style.display = 'none';
    document.body.classList.remove('dark-mode');
  }
});
