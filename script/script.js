"use strict";
window.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input"),
    result = document.querySelector(".result"),
    lang1 = document.querySelectorAll(".span"),
    lang2 = document.querySelectorAll(".span1");

  const Message = {
    loading: "Tarjima qilinmoqda...",
  };
  let language = "en",
    languageto = "uz";
  const lang = ["auto", "en", "uz", "rus"],
    langto = ["uz", "en", "ru"];

  lang1.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      lang1.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
      language = lang[i];
      Translate();
    });
  });

  lang2.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      lang2.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
      languageto = langto[i];
      Translate();
    });
  });
  function Translate() {
    result.textContent = Message.loading;

    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `https://ggts.herokuapp.com/api?text=${input.value}&from=${language}&to=${languageto}`
    );
    request.setRequestHeader(
      "Content-type",
      "application/json",
      "charset=utf-8"
    );
    request.send();

    request.addEventListener("load", () => {
      if (request.status === 200) {
        result.textContent = JSON.parse(request.response).translate;
      } else if (request.status === 400) {
        result.textContent = "Tarjimasi";
      }
    });
  }
  input.addEventListener("input", () => {
    Translate();
  });
});
