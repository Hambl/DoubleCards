import { createBackButton } from "./craeteBackButton.js";
import { createGameMenu } from "./gameMenu.js";
import { createCards } from "./createCards.js";
import { newLevel } from "./newLevel.js";

let level;
let cardsNum;
let timerCount;
let colorHints;

let firstCard = null;
let secondCard = null;

let victory = false;
let countRight = null;
let countMistake = null;

export const newGame = () => {

    if (localStorage.length) {
        cardsNum = localStorage.getItem("cardsNum");
        timerCount = localStorage.getItem("timerCount");
        colorHints = JSON.parse(localStorage.getItem("colorHints"));
    } else {
        cardsNum = 12;
        timerCount = 2;
        colorHints = false;
    }

    let gameSection = document.querySelector(".container");
    gameSection.innerHTML = "";

    level = 1;
    let levelTitle = document.createElement("h2");
    levelTitle.textContent = `Уровень ${level}`;
    
    let buttonShow = document.createElement("button");
    buttonShow.classList.add("game__button-show");
    buttonShow.type = "button";
    buttonShow.textContent = "Показать карточки";

    let cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-wrapper");

    let cards = createCards(cardsNum, colorHints);
    cards.forEach(card => cardWrapper.append(card));

    gameSection.append(
        levelTitle,
        buttonShow,
        cardWrapper,
        createBackButton()
    );

    buttonShow.addEventListener("click", showCards);

    countRight= count();
    countMistake = count();
}

function showCards() {

    let cardInner = document.querySelectorAll(".card-inner");
    let buttonShow = document.querySelector(".game__button-show");

    cardInner.forEach(card => {
        card.style.pointerEvents = "initial";
        card.click();
        card.style.pointerEvents = "none";
    });
        
    // Копируем значение таймера
    let count = timerCount;
    buttonShow.textContent = count;
    let timer = setInterval(() => {
        count--;
        buttonShow.textContent = count; 
        if (count === 0) {
            clearInterval(timer);
            buttonShow.disabled = "true";
            buttonShow.classList.add("game__button-show_disable");

            cardInner.forEach(card => {

                card.style.pointerEvents = "initial";
                card.click();
                
                card.addEventListener("click", () => {
                    if (!JSON.parse(card.getAttribute("data-flip"))) return;
                    else checkChoise(card);
                });
            });
        };
    }, 1000);
}

let checkChoise = (card) => {
    if (firstCard === null) {
        firstCard = card;
        firstCard.style.pointerEvents = "none";
    } else {
        secondCard = card;
        secondCard.style.pointerEvents = "none";

        if (getComputedStyle(firstCard).backgroundColor === getComputedStyle(secondCard).backgroundColor) {
            setCardsRight(firstCard, secondCard);
        } else setCardsMistake(firstCard, secondCard);

        firstCard = null;
        secondCard = null;
    }
}

function setCardsRight(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.style.display = "none";
        secondCard.style.display = "none";
        if (countRight() === cardsNum / 2) {
            setTimeout(() => {
                victory = true;
                if (confirm("Уровень пройден! Продолжить?")) newLevel(++level, cardsNum, colorHints);
                else createGameMenu();
            }, 100);
        }
    }, 500);
}

function setCardsMistake(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.style.boxShadow = "0 0 10px red";
        secondCard.style.boxShadow = "0 0 10px red";
    }, 300);
    setTimeout(() => {
        firstCard.style.boxShadow = "none";
        secondCard.style.boxShadow = "none";
        firstCard.style.pointerEvents = "initial";
        secondCard.style.pointerEvents = "initial";
        firstCard.click();
        secondCard.click();
        if (countMistake() === cardsNum / 2) {
            setTimeout(() => {
                alert("Вы не прошли этот уровень");
                createGameMenu();
            }, 100);
        }
    }, 500);
}

// Реализация счетчика через замыкание
function count() {
    let count = 0;

    function increment() {
        
        if (victory === true){
            victory = false;
            count = 0;
        } 

        count++;

        if (count === cardsNum / 2) {
            count = 0;
            return cardsNum / 2;
        } else return count;
    }
    return increment;
}
