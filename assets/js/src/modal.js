const NewsErstellen_BTN = document.getElementById("NewsErstellen_BTN");
const NewsErstellen_Modal = document.getElementById("NEM");
const NewsErstellen_Close_Btn_Modal = document.getElementById("NewsErstellen_Close_Btn_Modal");
const NewsErstellen_Close_Icon_Modal = document.getElementById("NewsErstellen_Close_Icon_Modal");

NewsErstellen_BTN.addEventListener("click", (function () {
  NewsErstellen_Modal.style.display = "block";
  NewsErstellen_BTN.innerText = "Hey ich mag dich!";
}));


NewsErstellen_Close_Btn_Modal.addEventListener("click", (function () {
    NewsErstellen_Modal.style.display = "none";
    NewsErstellen_BTN.innerText = "News erstellen";
    }));


NewsErstellen_Close_Icon_Modal.addEventListener("click", (function () {
        NewsErstellen_Modal.style.display = "none";
        NewsErstellen_BTN.innerText = "News erstellen";
        }));