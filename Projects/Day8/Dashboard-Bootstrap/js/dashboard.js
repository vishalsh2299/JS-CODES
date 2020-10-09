// $(document).ready(function () {
//   $("#menu-toggle").on("click", function (e) {
//     e.preventDefault();
//     $("#wrapper").toggleClass("menuDisplayed");
//   });
// });

const btn = document.getElementById("hamburger");
const sideBar = document.getElementById("sidebar-wrapper");
const container = document.getElementById("page-content-wrapper");
const logo = document.getElementById("geekylogo");
const a = document.querySelectorAll(".side-nav__link");
const span = document.querySelectorAll(".span");
const icon = document.querySelectorAll(".icon");
console.log(icon);

var temp = false;

btn.addEventListener("click", () => {
  if (temp === false) {
    sideBar.style.width = "75px";
    container.style.paddingLeft = "75px";
    logo.src = "./img/logo.png";
    document.getElementById("side-logo").style.height = "6rem";

    a.forEach((a) => (a.style.display = "none"));
    span.forEach((a) => {
      a.style.display = "none";
    });
    icon.forEach((a) => {
      a.style.fontSize = "1.5rem";
    });
    temp = true;
  } else {
    logo.src = "./img/geekyants-logo.png";
    document.getElementById("side-logo").style.height = "4rem";

    a.forEach((a) => (a.style.display = ""));
    span.forEach((a) => {
      a.style.display = "";
    });

    icon.forEach((a) => {
      sideBar.setAttribute("style", "display: block;");
      a.style.fontSize = "";
    });
    container.style.paddingLeft = "250px";
    temp = false;
  }
});
