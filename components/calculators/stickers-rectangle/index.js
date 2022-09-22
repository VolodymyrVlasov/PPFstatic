import { customRange } from "../../../src/app.js";
import { RectStickerCalculator } from "../../../src/calculators/impl/RectStickerCalculator.js";
import { DetailedSummaryCard } from "../../DetailedSummaryCard/DetailedSummaryCard.js";
import { SummaryCard } from "../../SummaryCard/SummaryCard.js";

const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 24);
const { changeRangeUI: renderCornerRadiusRangeUI, inputNode: cornerRadiusInput } = customRange("input_corner_radius", 32, 0);
const { changeRangeUI: renderWidthRangeUI, inputNode: widthInput } = customRange("input_width", 32, 50);
const { changeRangeUI: renderHeightUI, inputNode: heightInput } = customRange("input_height", 32, 50);

let isParameterChanged = false;
let isShowDetails = false;

const cuttingTypeSelect = document.getElementById("cut");
const summaryCard = document.getElementById("summary");
const priceLabel = document.getElementById("price");
const timeLabel = document.getElementById("prod-time");
const detailedPriceBtn = document.getElementById("detailed_price_btn")

let product = {
    productType: "RECT_STICKER",
    cornerRadius: 0,
    width: 90,
    height: 50,
    targetAmount: 2,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
};

const calculator = new RectStickerCalculator(product);

const setConditions = () => {
    if (isParameterChanged) {
        amountInput.min = product.amountAtSheet;
        amountInput.value = product.amountAtSheet;
        amountInput.step = product.amountAtSheet;
        amountInput.max = product.amountAtSheet * 50;
        product.targetStickerAmount = product.amountAtSheet;
        product.sheetsAtPrintingRun = 1;
        isParameterChanged = false;
    }
    if (product.width < 50 || product.height < 50 && cuttingTypeSelect.children.length == 3) {
        cuttingTypeSelect.children[2].disabled = true;
    } else if (product.width >= 50 || product.height >= 50) {
        cuttingTypeSelect.children[2].disabled = false;
    }
    if (product.cutType === "KISS_CUT_A4") {
        widthInput.min = 5;
        widthInput.max = 297;
        heightInput.min = 5;
        heightInput.max = 297;
        if (widthInput.value > 210) {
            heightInput.max = 210;
            widthInput.max = 297;
        }
        if (heightInput.value > 210) {
            widthInput.max = 210;
            heightInput.max = 297;
        }
    }
    if (product.cutType === "DIE_CUT") {
        cornerRadiusInput.max = 250;
        cornerRadiusInput.min = 50;
    }
    if (product.cutType === "KISS_CUT_A3" && cornerRadiusInput.max !== 300) {
        widthInput.min = 5;
        widthInput.max = 420;
        heightInput.min = 5;
        heightInput.max = 420;
        if (widthInput.value > 297) {
            heightInput.max = 297;
            widthInput.max = 420;
        }
        if (heightInput.value > 297) {
            widthInput.max = 297;
            heightInput.max = 420;
        }
    }
    if (Number(widthInput.value) < Number(heightInput.value)) {
        cornerRadiusInput.max = Math.floor(widthInput.value / 2);
    } else {
        cornerRadiusInput.max = Math.floor(heightInput.value / 2);
    }

    if (product.material === "TRANSPARENT_WHITE" || product.material === "TRANSPARENT_FOIL") {
        cuttingTypeSelect.children[0].disabled = true;
        cuttingTypeSelect.children[1].selected = true;
        cuttingTypeSelect.children[2].disabled = true;
        widthInput.max = 210;
        heightInput.max = 297;
    } else {
        cuttingTypeSelect.children[0].disabled = false;
        cuttingTypeSelect.children[2].disabled = false;
    }
}

const render = ({ product }) => {
    setConditions();

    if (isShowDetails) {
        detailedPriceBtn.innerText = "+"
        summaryCard.parentElement.classList.remove("flex_1");
        summaryCard.parentElement.classList.add("flex_3");
        detailedPriceBtn.classList.add("rotate_45");
        summaryCard.innerHTML = DetailedSummaryCard({ product });
    }
    if (!isShowDetails) {
        summaryCard.parentElement.classList.remove("flex_3");
        detailedPriceBtn.classList.remove("rotate_45");
        detailedPriceBtn.innerText = "i"
        summaryCard.parentElement.classList.add("flex_1");
        summaryCard.innerHTML = SummaryCard({ product });
        priceLabel.title = `
        Наліпок на аркуші${product.cutType == "KISS_CUT_A4" ? ` А4:\t${product.amountAtSheet / 2}` : ` А3:\t${product.amountAtSheet}`}\t\tшт.
        Аркушів у накладі:\t\t${product.sheetsAtPrintingRun}\t\tшт.
        Метрів порізки:\t\t\t${product.cutAtPrintingRun}\t\tм.п.
        Вартість друку:\t\t\t${product.printingPrice}\t\tгрн.
        Вартість порізки:\t\t${product.cutingPrice}\t\tгрн.
        Вартість 1 наліпки.:\t\t${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)}\t\tгрн.
        Загальна вартість:\t\t${product.totalPrice}\t\tгрн.`;
    }

    renderCornerRadiusRangeUI();
    renderAmountUI();
    renderWidthRangeUI();
    renderHeightUI();

    setTimeout(() => {
        renderCornerRadiusRangeUI();
        renderAmountUI();
        renderWidthRangeUI();
        renderHeightUI();
    }, 150);
};

document.getElementById("calculator").addEventListener("input", (e) => {
    const target = e.target;
    switch (target.id) {
        case "input_range_width":
            product.width = Number(target.value);
            break;
        case "input_range_height":
            product.height = Number(target.value);
            break;
        case "input_range_diameter":
            product.cornerRadius = Number(target.value);
            break;
        case "input_range_amount":
            product.targetAmount = Number(target.value);
            break;
        case "material":
            product.material = target.value;
            break;
        case "cut":
            product.cutType = target.value;
            break;
    }
    isParameterChanged = true;
    product = calculator.calculate(product)
    console.table(product);
    render({ product });
});

detailedPriceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isShowDetails = !isShowDetails;
    render({ product });
});

render({ product });

