import { FigureStickerCalculator } from "./FigureStickerCalculator.js";
import { RectStickerCalculator } from "./RectStickerCalculator.js";
import { RoundStickerCalculator } from "./RoundStickerCalculator.js";


const resultDiv = document.getElementById("result");
const calc = document.getElementById("calc");

const rect = {
    productType: "RECT_STICKER",
    cornerRadius: 0,
    width: 90,
    height: 50,
    targetAmount: 24,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
};

const round = {
    productType: "ROUND_STICKER",
    diameter: 50,
    targetAmount: 3,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
};

const figure = {
    productType: "FIGURE_STICKER",
    width: 50,
    height: 50,
    targetAmount: 3,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
};

const ResultCard = (product) => {

    console.log(product)
    return (`
        <div class="col gap flex_1">
            <div class="row gap">
                <span class="text_24__bold">${String(product.productType).replaceAll("_", " ")}</span>
            </div>
            <div class="col">
                <div class="row gap">
                    <span>Material: </span>
                    <span>${product.material}</span>
                </div>
                <div class="row gap">
                    <span>Cut: </span>
                    <span>${product.cutType}</span>
                </div>
                <div class="row gap">
                    <span>Amount at sheet: </span>
                    <span>${product.amountAtSheet}</span>
                </div>            
                <div class="row gap">
                    <span>Cut at sheet: </span>
                    <span>${product.cutAtSheet}</span>
                </div>
                <div class="row gap">
                    <span>Print price: </span>
                    <span>${product.printingPrice}</span>
                </div>
                <div class="row gap">
                    <span>Cut price: </span>
                    <span>${product.cutingPrice}</span>
                </div>
                <div class="row gap">
                    <span>Total price: </span>
                    <span>${product.totalPrice}</span>
                </div>
            </div>
        </div>
    `);
}

const setWidth = (value) => {
    rect.width = Number(value);
    figure.width = Number(value);
    renderResult();
}

const setHeight = (value) => {
    rect.height = Number(value);
    figure.height = Number(value);
    renderResult();
}

const setDiameter = (value) => {
    round.diameter = Number(value);
    rect.cornerRadius = Number(value) < Math.min(rect.width, rect.height) ? Number(value) : console.error("invalid value");
    renderResult();
}

const setAmount = (value) => {
    rect.targetAmount = Number(value);
    round.targetAmount = Number(value);
    figure.targetAmount = Number(value);
    renderResult();
}

const rectStickerCalculator = new RectStickerCalculator(rect);
const roundStickerCalculator = new RoundStickerCalculator(round)
const figureStickerCalculator = new FigureStickerCalculator(figure)

function renderResult() {
    const rectCalc = rectStickerCalculator.calculate(rect);
    const roundCalc = roundStickerCalculator.calculate(round);
    const figureCalc = figureStickerCalculator.calculate(figure);
    console.table(figureCalc);
    resultDiv.innerHTML = [rectCalc, roundCalc, figureCalc].map(product => ResultCard(product)).join("");
}


document.getElementById("width").addEventListener("input", (e) => setWidth(e.target.value));
document.getElementById("height").addEventListener("input", (e) => setHeight(e.target.value));
document.getElementById("corner").addEventListener("input", (e) => setDiameter(e.target.value));
document.getElementById("amount").addEventListener("input", (e) => setAmount(e.target.value));

renderResult();



