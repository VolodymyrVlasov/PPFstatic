import { RectStickerCalculator } from "./RectStickerCalculator.js";
import { RoundStickerCalculator } from "./RoundStickerCalculator.js";


const resultDiv = document.getElementById("result");
const calc = document.getElementById("calc");

// const editableProduct = {
//     productType: "RECT_STICKER",
//     cornerRadius: 0,
//     width: 90,
//     height: 50,
//     targetAmount: 24,
//     material: "RAFLATAC",
//     cutType: "KISS_CUT_A3",
//     amountAtSheet: 40,
//     cutAtSheet: 1,
//     sheetsAtPrintingRun: 1,
//     cutAtPrintingRun: 2,
//     printingPrice: 1,
//     cutingPrice: 1,
//     totalAmount: 80,
//     totalPrice: 1,
//     finishTime: `${(new Date().getDate() + 1).toLocaleString("uk-UA", { day: "numeric", month: "long" })} 18:00`,
// };

const round = {
    productType: "ROUND_STICKER",
    diameter: 50,
    targetAmount: 3,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
};



document.getElementById("width").addEventListener("input", (e) => editableProduct.width = Number(e.target.value));
document.getElementById("height").addEventListener("input", (e) => editableProduct.height = Number(e.target.value));
document.getElementById("corner").addEventListener("input", (e) => editableProduct.cornerRadius = Number(e.target.value));
document.getElementById("amount").addEventListener("input", (e) => editableProduct.amount = Number(e.target.value));

const rectStickerCalculator = new RectStickerCalculator(editableProduct);
const roundStickerCalculator = new RoundStickerCalculator(round)

calc.addEventListener("click", () => {
    // const result = rectStickerCalculator.calculate(editableProduct);
    const result = roundStickerCalculator.calculate(round);
    console.table(result);
    resultDiv.innerHTML = JSON.stringify(result).replaceAll(",", "<br>");

})


