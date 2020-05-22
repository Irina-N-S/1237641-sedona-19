(function () {
  var down = document.querySelector(".welcome-picture");
  var closeButton = document.querySelector(".navigation__button");
  var buttonMenu = document.querySelector(".logo__menu");
  var text = document.querySelector(".photo__description");

  var review = document.querySelector(".review");

  down && down.classList.add("welcome-picture--down");
  text && text.classList.add("photo__description--down");
  review && review.classList.add("review--down");

  buttonMenu.addEventListener("click", function (evt) {
    evt.preventDefault();
    down && down.classList.remove("welcome-picture--down");
    text && text.classList.remove("photo__description--down");
    review && review.classList.remove("review--down");
  })

  closeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    down && down.classList.add("welcome-picture--down");
    text && text.classList.add("photo__description--down");
    review && review.classList.add("review--down");
  })
})();
