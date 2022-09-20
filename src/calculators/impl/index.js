import { RectStickerCalculator } from "./RectStickerCalculator.js";

const resultDiv = document.getElementById("result");
const calc = document.getElementById("calc");

const editableProduct = {
    productType: "RECT_STICKER",
    cornerRadius: 0,
    width: 90,
    height: 50,
    targetStickerAmount: 24,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
    amountAtSheet: 40,
    cutAtSheet: 1,
    sheetsAtPrintingRun: 1,
    cutAtPrintingRun: 2,
    printingPrice: 1,
    cutingPrice: 1,
    totalAmount: 80,
    totalPrice: 1,
    finishTime: `${(new Date().getDate() + 1).toLocaleString("uk-UA", { day: "numeric", month: "long" })} 18:00`,
};

document.getElementById("width").addEventListener("input", (e) => editableProduct.width = Number(e.target.value));
document.getElementById("height").addEventListener("input", (e) => editableProduct.height = Number(e.target.value));
document.getElementById("corner").addEventListener("input", (e) => editableProduct.cornerRadius = Number(e.target.value));
document.getElementById("amount").addEventListener("input", (e) => editableProduct.amount = Number(e.target.value));

const rectStickerCalculator = new RectStickerCalculator(editableProduct);

calc.addEventListener("click", () => {
    // console.table(editableProduct);
    const result = rectStickerCalculator.calculate(editableProduct);
    console.table(result);
    resultDiv.innerHTML = JSON.stringify(result);

})


