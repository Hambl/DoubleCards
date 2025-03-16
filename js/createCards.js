export const createCards = (cardNum = 16, colorHints = false) => { 
    
    let cardArr = [];
    let cardInner = [];
    let frontSide = [];
    for (let i = 0; i < cardNum; i++) {
        cardArr[i] = document.createElement("div"); 
        cardArr[i].classList.add("card");

        cardInner[i] = document.createElement("div"); 
        cardInner[i].classList.add("card-inner");
        cardInner[i].setAttribute("data-flip", false);
        cardInner[i].style.pointerEvents = "none";
        cardArr[i].append(cardInner[i]);

        let backSide = document.createElement("div");
        backSide.classList.add("card-back");
        cardInner[i].append(backSide);

        frontSide[i] = document.createElement("div");
        frontSide[i].classList.add("card-front");
        cardInner[i].append(frontSide[i]);
    }

    let colorArr = [];
    for (let i = 0; i < cardNum / 2; i++) {
        colorArr[i] = getRandomColor();
    }

    let countCardArr = [];
    for (let i = 0; i < cardNum; i++) {
        countCardArr[i] = i; 
    }

    let colorNum = 0;
    while (countCardArr.length) {
        let firstRandomCard;
        let secondRandomCard;

        do {
            firstRandomCard = getRandomInt(0, cardNum - 1);
        } while (!(countCardArr.includes(firstRandomCard)));
        if (colorHints) frontSide[firstRandomCard].textContent = colorArr[colorNum];
        cardInner[firstRandomCard].style.backgroundColor = colorArr[colorNum];
        countCardArr.splice(countCardArr.indexOf(firstRandomCard), 1);

        do {
            secondRandomCard = getRandomInt(0, cardNum - 1);
        } while (!(countCardArr.includes(secondRandomCard)));
        if (colorHints) frontSide[secondRandomCard].textContent = colorArr[colorNum];
        cardInner[secondRandomCard].style.backgroundColor = colorArr[colorNum];
        countCardArr.splice(countCardArr.indexOf(secondRandomCard), 1);

        colorNum++;
    }

    cardInner.forEach((card) => card.addEventListener("click", function () {
        if (card.getAttribute("data-flip") == "true") {
            card.style.transform = "rotateY(0deg)";
            card.setAttribute("data-flip", false);
        } else {
            card.style.transform = "rotateY(180deg)";
            card.setAttribute("data-flip", true);
        }
    }));

    return cardArr;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    // let randomColor = `rgb(${getRandomInt(0, 255)} ${getRandomInt(0, 255)} ${getRandomInt(0, 255)})`;
    return `#${((getRandomInt(0, 255) << 16) + (getRandomInt(0, 255) << 8) + getRandomInt(0, 255))
                .toString(16)
                .padStart(6, '0')
                .toUpperCase()}`;
}