function init() {
  // section 2 accordion
  const buttonAccordions = document.querySelectorAll(".section__2__accordion__button");
  const contentAccordions = document.querySelectorAll(".section__2__accordion__content");
  buttonAccordions.forEach((buttonAccordion, index) => {
    buttonAccordion.addEventListener("click", () => {
      if (contentAccordions[index].style.maxHeight) {
        contentAccordions[index].style.maxHeight = null;
        buttonAccordion.classList.remove("section__2__accordion__button__active");
      } else {
        buttonAccordion.classList.add("section__2__accordion__button__active");
        contentAccordions[index].style.maxHeight = contentAccordions[index].scrollHeight + "px";
      }
    });
  });

  // section 2 tabs
  const section2Buttons = document.querySelectorAll(".section__2__button");
  const section2Descriptions = document.querySelectorAll(".section__2__description__container");
  const section2Accordions = document.querySelectorAll(".section__2__accordion__container");
  section2Buttons.forEach((section2Button, index) => {
    section2Button.addEventListener("click", () => {
      section2Buttons.forEach((section2Button) => {
        section2Button.classList.remove("section__2__button__active");
      });
      section2Descriptions.forEach((section2Description) => {
        section2Description.style.display = "none";
      });
      section2Descriptions[index].style.display = "block";
      section2Accordions.forEach((section2Accordion) => {
        section2Accordion.style.display = "none";
      });
      section2Accordions[index].style.display = "block";
      section2Button.classList.add("section__2__button__active");
    });
  });

  // section 3 slide
  const section3PrevBtn = document.querySelector(".section__3__swiper-prev-btn");
  const section3NextBtn = document.querySelector(".section__3__swiper-next-btn");
  const section3Swiper = new Swiper(".section__3__swiper", {
    slidesPerView: "auto",
    autoHeight: true,
    spaceBetween: 48,
    initialSlide: Math.floor(document.querySelectorAll(".section__3__swiper-slide").length / 2) - 1,
    speed: 500,
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      1920: {
        spaceBetween: 128,
      },
      768: {
        spaceBetween: 80,
      },
    },
    on: {
      slideChange: function () {
        const activeIndex = this.activeIndex;
        const slidesLength = this.slides.length;
        const slides = this.slides;
        const opacityDecrement = 1 / (slidesLength - 1);
        const opacityMultiply = 2.4;

        // remove active class from all slides
        document.querySelectorAll(".section__3__swiper-slide").forEach(function (slide) {
          slide.classList.remove("section__3__swiper-slide-active");
        });
        // add active class to active slide
        slides[activeIndex].classList.add("section__3__swiper-slide-active");

        // set opacity for disabled slide decrement
        slides[activeIndex].style.opacity = 1;
        for (let i = activeIndex - 1; i >= 0; i--) {
          slides[i].style.opacity = Math.max(1 - opacityDecrement * (activeIndex - i) * opacityMultiply, 0.2);
        }
        for (let i = activeIndex + 1; i <= slidesLength - 1; i++) {
          slides[i].style.opacity = Math.max(1 - opacityDecrement * (i - activeIndex) * opacityMultiply, 0.2);
        }

        // set opacity for slide description
        slides.forEach((slide, index) => {
          if (index === activeIndex) {
            slide.querySelector(".section__3__swiper-slide__caption").style.opacity = 0;
          } else {
            slide.querySelector(".section__3__swiper-slide__caption").style.opacity = 1;
          }
        });

        // set detail for active slide
        const detailName = document.querySelector(".section__3__slide__detail__name");
        const detailJob = document.querySelector(".section__3__slide__detail__job");
        detailName.textContent = slides[activeIndex].querySelector(
          ".section__3__swiper-slide__caption__name"
        ).textContent;
        detailJob.textContent =
          (window.innerWidth >= 768 ? " - " : "") +
          slides[activeIndex].querySelector(".section__3__swiper-slide__caption__job").textContent;

        // set disabled or active for prev btn
        if (this.isBeginning) {
          section3PrevBtn.classList.add("section__3__swiper-disabled-btn");
        } else {
          section3PrevBtn.classList.remove("section__3__swiper-disabled-btn");
        }
        // set disabled or active for next btn
        if (this.isEnd) {
          section3NextBtn.classList.add("section__3__swiper-disabled-btn");
        } else {
          section3NextBtn.classList.remove("section__3__swiper-disabled-btn");
        }
      },
    },
  });
  section3PrevBtn.addEventListener("click", () => {
    section3Swiper.slidePrev();
  });

  section3NextBtn.addEventListener("click", () => {
    section3Swiper.slideNext();
  });

  // section 4 slide
  let activeTab = "cheers-hostel-hanoi";
  const buttonsTab = document.querySelectorAll(".section__4__contained__btn");
  buttonsTab.forEach((buttonTab) => {
    buttonTab.addEventListener("click", () => {
      activeTab = buttonTab.dataset.tab;
      buttonsTab.forEach((button) => {
        button.classList.remove("section__4__contained__btn__active");
      });
      buttonTab.classList.add("section__4__contained__btn__active");
    });
  });

  const section4Swiper = new Swiper(".section__4__swiper", {
    slidesPerView: 1,
    speed: 500,
    spaceBetween: 14,
    autoHeight: true,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
      el: ".section__4_swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    }
  });

  const section4PrevBtn = document.querySelector(".section__4__swiper__prev__btn");
  const section4NextBtn = document.querySelector(".section__4__swiper__next__btn");
  section4PrevBtn.addEventListener("click", () => {
    section4Swiper.slidePrev();
  });
  section4NextBtn.addEventListener("click", () => {
    section4Swiper.slideNext();
  });
}

window.onload = init;
