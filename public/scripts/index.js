var navBarToggler = document.querySelector('.navbar-toggler');
var navBarUL = document.querySelector('[data-navbar-ul');
var navBarDiv = document.querySelector('[data-navbar');


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

document.onclick = function () {
    navBarToggler.addEventListener('click', () => {
    navBarUL.classList.toggle('float-right');
    navBarDiv.classList.toggle('collapse');
    })
}

navBarToggler.onclick = function () {}
