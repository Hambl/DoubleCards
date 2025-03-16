import { createGameMenu } from "./gameMenu.js";

export const createBackButton = () => {
    let backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.textContent = "←";

    backButton.addEventListener("click", () => createGameMenu());

    return backButton;
}