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

    toggleTabContent(tab.indexOf(target));
  });
};

if (document.querySelector(".recommendations__list")) {
  tabs();
}

const addToBookmarks = () => {
  document.addEventListener("click", (event) => {
    let target = event.target;

    if (target.closest(".bookmark")) {
      target.classList.toggle("bookmark--active");
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

const contentSlider = new Swiper(".content-slider__container", {
  loop: true,
  navigation: {
    nextEl: ".content-slider__button-next",
    prevEl: ".content-slider__button-prev",
  },
  keyboard: {
    enabled: true,
  },
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
      target.closest(".mobile-menu__item")
    ) {
      navbarMenu.classList.toggle("mobile-menu--active");
      menuButton.classList.toggle("burger-button--active");
      document.body.classList.toggle("scroll-menu");
    }
    if (
      target.closest(".scroll-link") ||
      target.closest(".comments-article__button")
    ) {
      event.preventDefault();
      moveToAnchor(target.closest("a"));
    }
  });
};

navigation();

const toogleModal = () => {
  const modalOverlay = document.querySelector(".modal__overlay"),
    modalDialog = document.querySelector(".modal__dialog"),
    modalStatus = document.querySelector(".modal__status");

  const openModal = () => {
    modalOverlay.classList.add("modal__overlay--visible");
    modalDialog.classList.add("modal__dialog--visible");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("modal__overlay--visible");
    modalDialog.classList.remove("modal__dialog--visible");
    modalDialog.classList.remove("modal__dialog--visible");
    modalStatus.classList.remove("modal__status--visible");
  };

  document.addEventListener("click", (event) => {
    let target = event.target;

    if (target.matches('[data-toggle="modal"]')) {
      event.preventDefault();
      openModal();
    }

    if (
      target.closest(".modal__close") ||
      target.matches(".modal__overlay") ||
      target.closest(".modal__status-button")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.keyCode === 27 &&
      modalOverlay.classList.contains("modal__overlay--visible")
    ) {
      closeModal();
    }
  });
};

toogleModal();

const sendForm = () => {
  const statusMessage = document.querySelector(".modal__status-message"),
    modalOverlay = document.querySelector(".modal__overlay"),
    modalDialog = document.querySelector(".modal__dialog"),
    modalStatus = document.querySelector(".modal__status");

  const resetForm = () => {
    if (modalDialog.classList.contains("modal__dialog--visible")) {
      modalDialog.classList.remove("modal__dialog--visible");
    }
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.matches("form")) {
      const formData = new FormData(target);

      resetForm();

      modalOverlay.classList.add("modal__overlay--visible");
      modalStatus.classList.add("modal__status--visible");
      statusMessage.innerHTML = `<img class="modal__preloader" src="./img/loading.svg">`;

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent =
            "Сообщение отправлено! Мы скоро с вами свяжемся.";
        })
        .catch((error) => {
          console.error(error);
          statusMessage.textContent = "Что-то пошло не так...";
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

const showingComments = () => {
  const commentsButton = document.querySelector(".comments-button");
  const comment = document.querySelectorAll(".comment");

  commentsButton.addEventListener("click", () => {
    comment.forEach((element) => {
      element.classList.remove("comment--hidden");
      commentsButton.style.display = "none";
    });
  });
};

if (document.querySelector(".comments-button")) {
  showingComments();
}

$("form").each(function () {
  $(this).validate({
    errorClass: "invalid",
    messages: {
      email: {
        required: "Пожалуйста, укажите email",
        email: "Email формат: name@domain.com",
      },
      message: {
        required: "Пожалуйста, оставьте сообщение",
      },
      processing: {
        required: "Пожалуйста, потвердите согласие",
      },
      comment: {
        required: "Поле не может быть пустым",
        minlength: "Минимальная длина символов - 100",
      },
    },
  });
});
