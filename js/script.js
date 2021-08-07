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

const navigation = () => {
  let menuButton = document.querySelector(".burger-button"),
    navbarMenu = document.querySelector(".mobile-menu");

  const moveToAnchor = (item) => {
    const blockID = item.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
    if (target.closest(".scroll-link")) {
      event.preventDefault();
      moveToAnchor(target.closest("a"));
    }
  });
};

navigation();

const toogleModal = () => {
  const modalOverlay = document.querySelector(".modal__overlay"),
    modalDialog = document.querySelector(".modal__dialog");

  const openModal = () => {
    modalOverlay.classList.add("modal__overlay--visible");
    modalDialog.classList.add("modal__dialog--visible");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("modal__overlay--visible");
    modalDialog.classList.remove("modal__dialog--visible");
  };

  document.addEventListener("click", (event) => {
    let target = event.target;

    if (target.matches('[data-toggle="modal"]')) {
      event.preventDefault();
      openModal();
    }

    if (target.closest(".modal__close") || target.matches(".modal__overlay")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.keyCode === 27 &&
      modalDialog.classList.contains("modal__dialog--visible")
    ) {
      closeModal();
    }
  });
};

toogleModal();

const sendForm = () => {
  const statusMessage = document.createElement("div"),
    modalOverlay = document.querySelector(".modal__overlay"),
    modalDialog = document.querySelector(".modal__dialog"),
    modalStatus = document.querySelector(".modal__status");

  const resetForm = () => {
    if (modalDialog.classList.contains("modal__dialog--visible")) {
      setTimeout(() => {
        modalOverlay.classList.remove("modal__overlay--visible");
        modalDialog.classList.remove("modal__dialog--visible");
        modalStatus.classList.remove("modal__status--visible");
      }, 7000);
    }
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.matches("form")) {
      const formData = new FormData(target);

      modalStatus.classList.add("modal__status--visible");
      statusMessage.classList.add("status__message");
      modalStatus.appendChild(statusMessage);
      statusMessage.innerHTML = `<img class="status__preloader" src="./img/loading.svg">`;

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent =
            "Сообщение отправлено! Мы скоро с вами свяжемся.";
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          statusMessage.textContent = "Что-то пошло не так...";
          resetForm();
        });
      target.reset();
    }
  });

  const postData = (formData) => {
    return fetch("./send.php", {
      method: "POST",
      body: formData,
      action: "./send.php",
    });
  };
};

sendForm();
