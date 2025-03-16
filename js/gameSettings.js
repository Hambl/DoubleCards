import { createBackButton } from "./craeteBackButton.js";

let cardsNum;
let timerCount;
let colorHints;

export function createSettings() {
    const settingsSection = document.querySelector(".container");
    settingsSection.innerHTML = "";

    if (document.createElement('template').content) {
        /* Код выполнится, если браузер поддерживает <template> */
        let settingsTemplate = document.querySelector("#settings");
        let settingsPage = settingsTemplate.content.cloneNode(true);
    
        settingsSection.append(
            settingsPage,
            createBackButton()
        );
    } 
    else {
        settingsSection.append(
            createSettingsElements(),
            createBackButton()
        );
    }

    localStorage.length ? setSavedSettings() : setDefaultSettings();

    let saveButton = document.querySelector("#save");
    let defaultButton = document.querySelector("#default");

    saveButton.addEventListener("click", saveSettings);
    defaultButton.addEventListener("click", () => {
        localStorage.clear();
        setDefaultSettings();
    })
}

let saveSettings = () => {
    let selectedCardsNum = document.querySelector('input[name="cardsNum"]:checked');
    localStorage.setItem("cardsNum", selectedCardsNum.value);

    let selectedTimerCount = document.querySelector('input[name="timerCount"]:checked');
    localStorage.setItem("timerCount", selectedTimerCount.value);

    let checkHints = document.querySelector("#colorHints");
    localStorage.setItem("colorHints", checkHints.checked);
}

let setSavedSettings = () => {
    cardsNum = Number(localStorage.getItem("cardsNum"));
    timerCount = Number(localStorage.getItem("timerCount"));
    colorHints = JSON.parse(localStorage.getItem("colorHints"));

    let saveCardsNumRadio = document.querySelector(`input[value="${cardsNum}"]`);
    let saveTimerCountRadio = document.querySelector(`input[value="${timerCount}"]`);
    let saveCheckHints = document.querySelector("#colorHints");

    saveCardsNumRadio.checked = true;
    saveTimerCountRadio.checked = true;
    saveCheckHints.checked = colorHints;
}

let setDefaultSettings = () => {
    let defaultCardsNumRadio = document.querySelector('input[value="12"]');
    let defaultTimerCountRadio = document.querySelector('input[value="2"]');
    let defaultCheckHints = document.querySelector("#colorHints");

    defaultCardsNumRadio.checked = true;
    defaultTimerCountRadio.checked = true;
    defaultCheckHints.checked = false;
}

function createSettingsElements() {
    let wrapper = document.createElement("div");
    let form = document.createElement("form");
    form.classList.add("settings__form");
    let saveButton = craeteButton("save", "Сохранить");
    let defaultButton = craeteButton("default", "Сбросить");

    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("settings__button-wrapper");
    buttonWrapper.append(
        saveButton,
        defaultButton
    )

    form.append(
        createRadioGroup("cardsNum", "Количество карточек", 8, 12, 16), 
        createRadioGroup("timerCount", "Таймер в секундах", 1, 2, 3), 
        createCheckbox("colorHints", "Подсказки цветов"),
        buttonWrapper
    );
    wrapper.append(form);
    return wrapper
    // settingsSection.append(wrapper, createBackButton());
}

function createRadioGroup(name, title, firstRadioValue, secondRadioValue, thirdRadioValue) {
    let fieldset = document.createElement("fieldset");
    fieldset.classList.add("settings__fieldset");
    let legend = document.createElement("legend");
    legend.textContent = title;

    let firstItem = document.createElement("div");
    let secondItem = document.createElement("div");
    let thirdItem = document.createElement("div");

    firstItem.classList.add("settings__radio-wrapper");
    secondItem.classList.add("settings__radio-wrapper");
    thirdItem.classList.add("settings__radio-wrapper");

    firstItem.append(createRadio(name, firstRadioValue), createLable(firstRadioValue))
    secondItem.append(createRadio(name, secondRadioValue), createLable(secondRadioValue))
    thirdItem.append(createRadio(name, thirdRadioValue), createLable(thirdRadioValue))

    fieldset.append(
        legend,
        firstItem,
        secondItem,
        thirdItem
    )

    return fieldset
}

function craeteButton(id, title) {
    let button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.textContent = title;
    button.classList.add("settings__button");
    return button;
}

function createCheckbox(id, title) {
    let checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("settings__checkbox-wrapper");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = id; //colorHints
    createLable(title);
    checkboxWrapper.append(
        input,
        createLable(title)
    )
    return checkboxWrapper;
}

function createRadio(name, value) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    return input;
}

function createLable(value) {
    let lable = document.createElement("label");
    lable.textContent = value;
    lable.style.marginLeft = "10px";
    return lable;
}