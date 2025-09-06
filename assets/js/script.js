'use strict';

document.addEventListener("DOMContentLoaded", function () {

  const elementToggleFunc = (elem) => { if(elem) elem.classList.toggle("active"); }

  // SIDEBAR
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
  }

  // TESTIMONIALS MODAL
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = () => {
    if(modalContainer) modalContainer.classList.toggle("active");
    if(overlay) overlay.classList.toggle("active");
  }

  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      if (!modalImg || !modalTitle || !modalText) return;
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");
      if(avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt; }
      if(title) modalTitle.innerHTML = title.innerHTML;
      if(text) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  });

  if(modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if(overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // CUSTOM SELECT
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if(select) {
    select.addEventListener("click", () => elementToggleFunc(select));
  }

  const filterFunc = (selectedValue) => {
    filterItems.forEach(item => {
      item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
    });
  }

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const val = this.innerText.toLowerCase();
      if(selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(val);
    });
  });

  let lastClickedBtn = filterBtn[0] || null;
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const val = this.innerText.toLowerCase();
      if(selectValue) selectValue.innerText = this.innerText;
      filterFunc(val);
      if(lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // CONTACT FORM
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if(form && formBtn) {
        formBtn.disabled = !form.checkValidity();
      }
    });
  });

  // PAGE NAVIGATION
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.innerText.toLowerCase();

      pages.forEach(page => page.classList.toggle("active", page.dataset.page === targetPage));
      navigationLinks.forEach(nav => nav.classList.toggle("active", nav === this));

      window.scrollTo(0, 0);
    });
  });

  // CAROUSEL
  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track?.children || []);
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let currentIndex = 0;

    if(!track || slides.length === 0) return;

    const updateSlide = () => { track.style.transform = `translateX(-${currentIndex * 100}%)`; }

    if(prevBtn) prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    });

    if(nextBtn) nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    });
  });

});
