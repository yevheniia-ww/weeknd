document.addEventListener("DOMContentLoaded", () => {
    initBurgerMenu();
    initSmoothScroll();
  });
  
  function initBurgerMenu() {
    const burgerButton = document.querySelector(".burgerButton");
    const headerMenu = document.querySelector(".headerMenu");
  
    if (!burgerButton || !headerMenu) {
      return;
    }
  
    burgerButton.addEventListener("click", () => {
      const isOpen = headerMenu.classList.toggle("isOpen");
  
      burgerButton.classList.toggle("isActive", isOpen);
      burgerButton.setAttribute("aria-expanded", String(isOpen));
    });
  
    headerMenu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
  
      if (!link) {
        return;
      }
  
      headerMenu.classList.remove("isOpen");
      burgerButton.classList.remove("isActive");
      burgerButton.setAttribute("aria-expanded", "false");
    });
  }
  
  function initSmoothScroll() {
    const links = document.querySelectorAll(".js-scroll-link");
  
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
  
        if (!targetId || targetId === "#") {
          return;
        }
  
        const targetElement = document.querySelector(targetId);
  
        if (!targetElement) {
          return;
        }
  
        event.preventDefault();
  
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }