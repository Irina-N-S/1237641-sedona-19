var buttonMenu = document.querySelector(".logo__menu");
var nav = document.querySelector(".navigation");
var closeButton = document.querySelector('.navigation__button');

var closeMenu = function () {
  nav.classList.add("navigation--closed");
};

var openMenu = function () {
  nav.classList.remove("navigation--closed");
};

buttonMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  openMenu();
});

closeButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeMenu();
})

closeMenu();
