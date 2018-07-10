var navBarToggler = document.querySelector('.navbar-toggler');
var navBarUL = document.querySelector('[data-navbar-ul');
var navBarDiv = document.querySelector('[data-navbar');

navBarToggler.addEventListener('click', () => {
    navBarUL.classList.toggle('float-right');
    navBarDiv.classList.toggle('collapse');
})