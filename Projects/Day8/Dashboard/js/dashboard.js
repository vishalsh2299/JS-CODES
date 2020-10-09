const btn = document.getElementById("hamburger");
const sideBar = document.getElementById("side-bar");
const container = document.getElementById("container-div");
const logo = document.getElementById("geekylogo");
const a = document.querySelectorAll(".side-nav__link");
const span = document.querySelectorAll(".span");
const icon = document.querySelectorAll(".icon");
console.log(icon);

var temp = false;

btn.addEventListener("click", () => {
  if (temp === false) {
    sideBar.style.width = "5rem";
    container.style.left = "5rem";
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
    sideBar.style.width = "16rem";
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
    container.style.left = "16rem";
    temp = false;
  }
});
