import { newGame } from "./newGame.js";
import { createSettings } from "./gameSettings.js";

export const createGameMenu = () => {
    
    let menuSection = document.querySelector(".container");
    menuSection.innerHTML = "";
    let buttonWrapper = document.createElement("div")
    buttonWrapper.classList.add("menu__button-wrapper");
    
    menuSection.append(buttonWrapper);
    buttonWrapper.append(
        createMenuButton("Новая игра", newGame),
        createMenuButton("Настройки", createSettings),
        createMenuButton("Выход", window.close)
    )
}

const createMenuButton = (name, action) => {
    let button = document.createElement("button");

    button.classList.add("menu__button");
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => action());

    return button;
}