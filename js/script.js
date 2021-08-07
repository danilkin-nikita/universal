"use strict";

const tabs = () => {
  const tabHeader = document.querySelector(".recommendations__list"),
    tab = [...tabHeader.querySelectorAll(".recommendations__item")],
    tabContent = document.querySelectorAll(".main-article__promo");

  const toggleTabContent = (index) => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add("recommendations__item--active");
        tabContent[i].classList.add("main-article__promo--active");
      } else {
        tab[i].classList.remove("recommendations__item--active");
        tabContent[i].classList.remove("main-article__promo--active");
      }
    }
  };

  tabHeader.addEventListener("click", (event) => {
    let target = event.target;
    target = target.closest(".recommendations__item");
    console.log(target);
    toggleTabContent(tab.indexOf(target));
  });
};

tabs();

const addToBookmarks = () => {
  document.addEventListener("click", (event) => {
    let target = event.target;

    if (target.closest(".bookmark__icon")) {
      target.classList.toggle("bookmark__icon--active");
    }
  });
};

addToBookmarks();

const articlesSlider = new Swiper(".articles-slider", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade",
});

const toogleMobileMenu = () => {
  let menuButton = document.querySelector(".burger-button"),
    navbarMenu = document.querySelector(".mobile-menu");

  document.addEventListener("click", (event) => {
    let target = event.target;

    if (
      target.closest(".burger-button") ||
      target.closest(".mobile-menu__link")
    ) {
      navbarMenu.classList.toggle("mobile-menu--active");
      menuButton.classList.toggle("burger-button--active");
      document.body.classList.toggle("scroll-menu");
    }
  });
};

toogleMobileMenu();
