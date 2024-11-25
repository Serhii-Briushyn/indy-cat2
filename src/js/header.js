const body = document.querySelector('body');
const headerButtonMenu = document.querySelector('.header-button-menu');
const headerMobNav = document.querySelector('.header-mob-nav');
const iconOpen = document.querySelector('.header-button-icon-open');
const iconClose = document.querySelector('.header-button-icon-close');
const anchorLinks = document.querySelectorAll('.header-link');
const backdrop = document.querySelector('.header-backdrop');

headerButtonMenu.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  const isMenuOpen = headerMobNav.classList.toggle('is-open');
  body.classList.toggle('no-scroll', isMenuOpen);
  backdrop.classList.toggle('is-visible', isMenuOpen);

  iconOpen.classList.toggle('hidden', isMenuOpen);
  iconClose.classList.toggle('hidden', !isMenuOpen);

  if (isMenuOpen) {
    document.addEventListener('click', closeOnClickOutside);
  } else {
    document.removeEventListener('click', closeOnClickOutside);
  }
}

anchorLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const header = document.querySelector('.header-container');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      closeMobileMenu();
    }
  });
});

function closeMobileMenu() {
  headerMobNav.classList.remove('is-open');
  body.classList.remove('no-scroll');
  backdrop.classList.remove('is-visible');
  iconOpen.classList.remove('hidden');
  iconClose.classList.add('hidden');
  document.removeEventListener('click', closeOnClickOutside);
}

function closeOnClickOutside(event) {
  if (
    !headerMobNav.contains(event.target) &&
    !headerButtonMenu.contains(event.target) &&
    !backdrop.contains(event.target)
  ) {
    closeMobileMenu();
  }
}

backdrop.addEventListener('click', closeMobileMenu);
