'use strict';

const tabs = () => {
  const tabHeader = document.querySelector('.recommendations__list'),
    tab = [...tabHeader.querySelectorAll('.recommendations__item')],
    tabContent = document.querySelectorAll('.main-article__promo');

  const toggleTabContent = index => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add('recommendations__item--active');
        tabContent[i].classList.add('main-article__promo--active');
      } else {
        tab[i].classList.remove('recommendations__item--active');
        tabContent[i].classList.remove('main-article__promo--active');
      }
    }
  };

  tabHeader.addEventListener('click', event => {
    let target = event.target;
    target = target.closest('.recommendations__item');
    toggleTabContent(tab.indexOf(target));
    
  });
};

tabs();