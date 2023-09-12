//new
const burgermenu = document.querySelector(".burger-menu");
const nav = document.querySelector(".navigation");
const nav_bottom = document.querySelector(".nav-bottom");

// burger
burgermenu.addEventListener("click", () => {
  nav.classList.toggle("active-nav");
  nav.classList.toggle("navigation");
  nav_bottom.classList.toggle("nav-bottom-active");
});
