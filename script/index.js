function dropdownSetup(selectFieldClass, selectFieldTextClass, selectFieldItems, selectFieldHidden, confirmTableClass) {
  const section6SelectField = document.querySelector(selectFieldClass);
  const section6SelectFieldText = document.querySelector(selectFieldTextClass);
  const section6SelectFieldItems = document.querySelectorAll(selectFieldItems);
  const section6SelectFieldHidden = document.querySelector(selectFieldHidden);
  const section6ConfirmTable = document.querySelector(confirmTableClass);
  // open dropdown select field
  section6SelectField.addEventListener("click", () => {
    section6SelectField.classList.toggle("section__6__selectField__active");
    window.addEventListener("click", (e) => {
      if (!section6SelectField.contains(e.target)) {
        section6SelectField.classList.remove("section__6__selectField__active");
      }
    });
  });
  // choose dropdown item
  section6SelectFieldItems.forEach((section6SelectFieldItem) => {
    section6SelectFieldItem.addEventListener("click", () => {
      section6SelectFieldHidden.value = section6SelectFieldItem.dataset.value;
      section6SelectFieldText.textContent = section6SelectFieldItem.textContent;
      section6ConfirmTable.textContent = section6SelectFieldItem.textContent;
      section6SelectFieldItems.forEach((item) => {
        item.classList.remove("section__6__dropdown__item__active");
      });
      section6SelectFieldItem.classList.add("section__6__dropdown__item__active");
    });
  });
  return section6SelectFieldText.textContent;
}

function formatDate(date) {
  let parts = date.split("-");
  if (parts.length === 3) {
    let formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formattedDate;
  }
  return date;
}

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

  // section 4 slides
  const section4Images = document.querySelectorAll(".section__4__swiper-slide__image");
  const section4Slides = [
    { state: "cheers-hostel-hanoi", image: "assets/slide-image-4.png" },
    { state: "cheers-du-gia-village", image: "assets/slide-image-2.png" },
  ];

  // section 4 slide tabs
  const section4ButtonsTab = document.querySelectorAll(".section__4__contained__btn");
  section4ButtonsTab.forEach((buttonTab) => {
    buttonTab.addEventListener("click", () => {
      section4ButtonsTab.forEach((button) => {
        button.classList.remove("section__4__contained__btn__active");
      });
      buttonTab.classList.add("section__4__contained__btn__active");
      section4Slides.forEach((slide) => {
        if (slide.state === buttonTab.dataset.tab) {
          section4Images.forEach((section4Image) => {
            section4Image.src = slide.image;
          });
        }
      });
    });
  });

  // section 4 slide
  const section4Swiper = new Swiper(".section__4__swiper", {
    slidesPerView: 1,
    speed: 500,
    spaceBetween: 14,
    autoHeight: true,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
      el: ".section__4__swiper-pagination",
      clickable: true,
      bulletClass: "section__4__swiper-pagination-bullet",
      bulletActiveClass: "section__4__swiper-pagination-bullet-active",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });
  const section4PrevBtn = document.querySelector(".section__4__swiper__prev__btn");
  const section4NextBtn = document.querySelector(".section__4__swiper__next__btn");
  section4PrevBtn.addEventListener("click", () => {
    section4Swiper.slidePrev();
  });
  section4NextBtn.addEventListener("click", () => {
    section4Swiper.slideNext();
  });

  // section 5 slide tabs
  const section5Images = document.querySelectorAll(".section__5__swiper-slide__image");
  const section5Slides = [
    { state: "motorbike-tour", image: "assets/slide-image-5.png" },
    { state: "cruise-tour", image: "assets/slide-image-4.png" },
    { state: "trekking-tour", image: "assets/slide-image-3.png" },
    { state: "jeep-tour", image: "assets/slide-image-2.png" },
    { state: "walking-tour", image: "assets/slide-image-1.png" },
  ];
  const section5ButtonsTab = document.querySelectorAll(".section__5__contained__btn");
  section5ButtonsTab.forEach((buttonTab) => {
    buttonTab.addEventListener("click", () => {
      section5ButtonsTab.forEach((button) => {
        button.classList.remove("section__5__contained__btn__active");
      });
      buttonTab.classList.add("section__5__contained__btn__active");
      section5Slides.forEach((slide) => {
        if (slide.state === buttonTab.dataset.tab) {
          section5Images.forEach((section5Image) => {
            section5Image.src = slide.image;
          });
        }
      });
    });
  });

  // section 4 slide
  const section5Swiper = new Swiper(".section__5__swiper", {
    slidesPerView: 1,
    speed: 500,
    spaceBetween: 12,
    autoHeight: true,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
      el: ".section__5__swiper-pagination",
      clickable: true,
      bulletClass: "section__5__swiper-pagination-bullet",
      bulletActiveClass: "section__5__swiper-pagination-bullet-active",
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
      },
    },
  });
  const section5PrevBtn = document.querySelector(".section__5__swiper__prev__btn");
  const section5NextBtn = document.querySelector(".section__5__swiper__next__btn");
  section5PrevBtn.addEventListener("click", () => {
    section5Swiper.slidePrev();
  });
  section5NextBtn.addEventListener("click", () => {
    section5Swiper.slideNext();
  });

  // footer validation
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneReg = /^\d{10,15}$/;
  const footerForm = document.querySelector(".footer__form");
  const footerInputName = document.querySelector(".footer__input__name");
  const footerInputEmail = document.querySelector(".footer__input__email");
  const footerInputPhone = document.querySelector(".footer__input__phone");
  const footerInputMessage = document.querySelector(".footer__input__message");
  const validateEmailMessage = document.querySelector(".footer__form__validate__email__message");
  const validatePhoneMessage = document.querySelector(".footer__form__validate__phone__message");

  let name = "",
    email = "",
    phone = "",
    message = "";

  // update value input on change
  footerInputName.addEventListener("input", (e) => {
    name = e.target.value;
  });
  footerInputEmail.addEventListener("input", (e) => {
    email = e.target.value;
  });
  footerInputPhone.addEventListener("input", (e) => {
    phone = e.target.value;
  });
  footerInputMessage.addEventListener("input", (e) => {
    message = e.target.value;
  });

  const emailValidateAndDisplayError = (e) => {
    validateEmailMessage.classList.toggle(
      "footer__form__validate__email__message__active",
      !emailReg.test(e.target.value)
    );
  };
  const phoneValidateAndDisplayError = (e) => {
    validatePhoneMessage.classList.toggle(
      "footer__form__validate__phone__message__active",
      !phoneReg.test(e.target.value)
    );
  };

  // submit form action
  footerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // validate email, phone input fields
    if (!emailReg.test(email) || !phoneReg.test(phone)) {
      // display email, phone input fields error message
      validateEmailMessage.classList.add("footer__form__validate__email__message__active");
      validatePhoneMessage.classList.add("footer__form__validate__phone__message__active");
      // validate email, phone input fields on change
      inputEmail.addEventListener("input", emailValidateAndDisplayError);
      inputPhone.addEventListener("input", phoneValidateAndDisplayError);
    } else {
      // send data to server
      console.log(name, email, phone, message);
      // reset form input value
      inputName.value = "";
      inputPhone.value = "";
      inputEmail.value = "";
      inputMessage.value = "";
      // remove listener from email and phone input fields
      inputEmail.removeEventListener("input", emailValidateAndDisplayError);
      inputPhone.removeEventListener("input", phoneValidateAndDisplayError);
    }
  });

  // section 6 no of pax
  const nameReg = /^[a-zA-Z]{3,}$/;
  const moneyPerPax = 169;
  const noOfPax = document.querySelector(".section__6__input__pax__hidden");
  const pax = document.querySelector(".section__6__noOfPax__value");
  const totalPaxMoney = document.querySelector(".section__6__total__pax__money");
  const decrementPaxButton = document.querySelector(".section__6__circle__btn__decrement");
  const incrementPaxButton = document.querySelector(".section__6__circle__btn__increment");
  const section6InputName = document.querySelector(".section__6__input__name");
  const section6InputEmail = document.querySelector(".section__6__input__email");
  const section6InputPhone = document.querySelector(".section__6__input__phone");
  const section6InputMessage = document.querySelector(".section__6__input__message");
  const section6InputPickUpDate = document.querySelector(".section__6__input__departure__date");
  const section6InputDroffDate = document.querySelector(".section__6__input__end__date");
  const confirmTableName = document.querySelector(".section__6__confirm__table__name");
  const confirmTableNoOfPax = document.querySelector(".section__6__confirm__table__noOfPax");
  const confirmTableEmail = document.querySelector(".section__6__confirm__table__email");
  const confirmTablePhone = document.querySelector(".section__6__confirm__table__phone");
  const confirmTablePickUpDate = document.querySelector(".section__6__confirm__table__pickUp__date");
  const confirmTableDroffDate = document.querySelector(".section__6__confirm__table__droff__date");
  const confirmTableMessage = document.querySelector(".section__6__confirm__table__message");
  const nameErrorMessage = document.querySelector(".section__6__error__message__name");
  const emailErrorMessage = document.querySelector(".section__6__error__message__email");
  const phoneErrorMessage = document.querySelector(".section__6__error__message__phone");
  const pickUpDateErrorMessage = document.querySelector(".section__6__error__message__pickUp__date");
  const droffDateErrorMessage = document.querySelector(".section__6__error__message__droff__date");

  // section 6 form submit
  const section6Form = document.querySelector(".section__6__form");
  section6Form.addEventListener("submit", (e) => {
    let valid = true;
    if (!nameReg.test(section6InputName.value)) {
      valid = false;
      nameErrorMessage.textContent = "Name is invalid";
      section6InputName.addEventListener("input", (e) => {
        nameErrorMessage.textContent = nameReg.test(e.target.value) ? "" : "Name is invalid";
      });
    }
    if (!emailReg.test(section6InputEmail.value)) {
      valid = false;
      emailErrorMessage.textContent = "Name is invalid";
      section6InputEmail.addEventListener("input", (e) => {
        emailErrorMessage.textContent = emailReg.test(e.target.value) ? "" : "Email is invalid";
      });
      emailErrorMessage.textContent = "Email is invalid";
    }
    if (!phoneReg.test(section6InputPhone.value)) {
      valid = false;
      phoneErrorMessage.textContent = "Name is invalid";
      section6InputPhone.addEventListener("input", (e) => {
        phoneErrorMessage.textContent = phoneReg.test(e.target.value) ? "" : "Phone is invalid";
      });
      document.querySelector(".section__6__error__message__phone").textContent = "Phone is invalid";
    }
    if (section6InputPickUpDate.value <= new Date()) {
      valid = false;
      pickUpDateErrorMessage.textContent = "Date is invalid";
      section6InputPickUpDate.addEventListener("input", (e) => {
        pickUpDateErrorMessage.textContent = new Date(e.target.value) > new Date() ? "" : "Date is invalid";
      });
      pickUpDateErrorMessage.textContent = "Date is invalid";
    }
    if (section6InputDroffDate.value <= new Date() || section6InputDroffDate.value <= section6InputPickUpDate.value) {
      valid = false;
      droffDateErrorMessage.textContent = "Date is invalid";
      section6InputDroffDate.addEventListener("input", (e) => {
        droffDateErrorMessage.textContent =
          new Date(e.target.value) > new Date() && new Date(e.target.value) > new Date(section6InputPickUpDate.value)
            ? ""
            : "Date is invalid";
      });
      droffDateErrorMessage.textContent = "Date is invalid";
    }
    e.preventDefault();
    if (valid) {
      const formData = new FormData(section6Form);
      var formObject = {};
      formData.forEach(function (value, key) {
        formObject[key] = value;
      });
      console.log(formObject);
    }
  });

  // set default pax value
  window.addEventListener(
    "load",
    () => {
      noOfPax.value = 1;
      pax.textContent = "01";
    },
    { once: true }
  );
  // set pax and calculate total pax money
  decrementPaxButton.addEventListener("click", () => {
    if (parseInt(noOfPax.value) > 1) {
      noOfPax.value = (parseInt(noOfPax.value === "" ? 0 : noOfPax.value) - 1).toString();
      pax.textContent = String(noOfPax.value).padStart(2, "0");
      totalPaxMoney.textContent = `$${noOfPax.value * moneyPerPax}`;
      confirmTableNoOfPax.textContent = noOfPax.value + " pax";
    }
  });
  incrementPaxButton.addEventListener("click", () => {
    noOfPax.value = (parseInt(noOfPax.value === "" ? 0 : noOfPax.value) + 1).toString();
    pax.textContent = String(noOfPax.value).padStart(2, "0");
    totalPaxMoney.textContent = `$${noOfPax.value * moneyPerPax}`;
    confirmTableNoOfPax.textContent = noOfPax.value + " pax";
  });

  // pick up select field
  dropdownSetup(
    ".section__6__selectField__pickUp",
    ".section__6__selectField__pickUp__text",
    ".section__6__dropdown__pickUp__item",
    ".section__6__selectFiled__pickUp__hidden",
    ".section__6__confirm__table__pickUp"
  );

  // pick up address field
  dropdownSetup(
    ".section__6__selectField__pickUpAddress",
    ".section__6__selectField__pickUpAddress__text",
    ".section__6__dropdown__pickUpAddress__item",
    ".section__6__selectFiled__pickUpAddress__hidden",
    ".section__6__confirm__table__pickUpAddress"
  );

  // droff field
  dropdownSetup(
    ".section__6__selectField__droff",
    ".section__6__selectField__droff__text",
    ".section__6__dropdown__droff__item",
    ".section__6__selectFiled__droff__hidden",
    ".section__6__confirm__table__droff"
  );

  // droff address field
  dropdownSetup(
    ".section__6__selectField__droffAddress",
    ".section__6__selectField__droffAddress__text",
    ".section__6__dropdown__droffAddress__item",
    ".section__6__selectFiled__droffAddress__hidden",
    ".section__6__confirm__table__droffAddress"
  );

  // confirm table name
  section6InputName.addEventListener("input", (e) => {
    confirmTableName.textContent = e.target.value;
  });
  // confirm table email
  section6InputEmail.addEventListener("input", (e) => {
    confirmTableEmail.textContent = e.target.value;
  });
  // confirm table phone
  section6InputPhone.addEventListener("input", (e) => {
    confirmTablePhone.textContent = e.target.value;
  });
  // confirm table phone
  section6InputPhone.addEventListener("input", (e) => {
    confirmTablePhone.textContent = e.target.value;
  });
  // confirm table pick up date
  section6InputPickUpDate.addEventListener("input", (e) => {
    confirmTablePickUpDate.textContent = formatDate(e.target.value);
  });
  // confirm table droff date
  section6InputDroffDate.addEventListener("input", (e) => {
    confirmTableDroffDate.textContent = formatDate(e.target.value);
  });
  // confirm table message
  section6InputMessage.addEventListener("input", (e) => {
    confirmTableMessage.textContent = e.target.value;
  });
}

window.addEventListener("DOMContentLoaded", init);
