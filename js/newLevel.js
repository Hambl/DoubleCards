import { createCards } from "./createCards.js";

export function newLevel(level, cardNum, colorHints) {

    let levelTitle = document.querySelector("h2") 
    levelTitle.textContent = `Уровень ${level}`;

    let buttonShow = document.querySelector(".game__button-show");
    buttonShow.classList.remove("game__button-show_disable");
    buttonShow.textContent = "Показать карточки";
    buttonShow.disabled = false;

    let cardWrapper = document.querySelector(".card-wrapper")
    cardWrapper.innerHTML = "";
    let cards = createCards(cardNum, colorHints);
    cards.forEach(card => cardWrapper.append(card));
}