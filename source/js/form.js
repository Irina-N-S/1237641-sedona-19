var form = document.querySelector(".review-form");
var sendFormButton = document.querySelector(".review-form__button");
var requiredElements = form.querySelectorAll("[required]");
var errorWin = document.querySelector("div.error");
var successWin = document.querySelector("div.review-sent");

var validate = function () {

  var isEmptyEl = function (e) {
    return !e.value;
  };

  function isValidEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  function isValidPhone(value) {
    var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(String(value).toLowerCase());
  }

  var hasErrors = false;
  requiredElements.forEach(function (e) {
    if (isEmptyEl(e)) {
      markAsError(e);
      hasErrors = true;
    }
    if (e.type === 'tel'  && !isValidPhone(e.value)) {
      markAsError(e);
      hasErrors = true;
    }
    if (e.type === 'email'  && !isValidEmail(e.value)) {
      markAsError(e);
      hasErrors = true;
    }
  });
  return !hasErrors;
};

var clearErrors = function () {
  requiredElements.forEach(function (el) {
    el.style.border = '';
  });
};

var markAsError = function (el) {
  el.style.border = '2px solid red';
};

var showSuccessWin = function () {
  successWin.classList.add("review-sent--show");
};

var hideSuccessWin = function () {
  successWin.classList.remove("review-sent--show");
};

var showErrorWin = function () {
  errorWin.classList.add("error--show");
};

var hideErrorWin = function () {
  errorWin.classList.remove("error--show");
};

sendFormButton.addEventListener("click", function (e) {
  e.preventDefault();
  hideErrorWin();
  hideSuccessWin();

  clearErrors();
  if (validate()) {
    showSuccessWin();
  } else {
    showErrorWin();
  }
});

errorWin.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault();
  hideErrorWin();
});

successWin.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault();
  hideSuccessWin();
});
