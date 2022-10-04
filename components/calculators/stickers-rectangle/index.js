import { customRange } from "../../../src/app.js";
import { RectStickerCalculator } from "../../../src/calculators/impl/RectStickerCalculator.js";
import { DetailedSummaryCard } from "../../DetailedSummaryCard/DetailedSummaryCard.js";
import { SummaryCard } from "../../SummaryCard/SummaryCard.js";

const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 24);
const { changeRangeUI: renderCornerRadiusRangeUI, inputNode: cornerRadiusInput } = customRange("input_corner_radius", 32, 0);
const { changeRangeUI: renderWidthRangeUI, inputNode: widthInput } = customRange("input_width", 32, 50);
const { changeRangeUI: renderHeightUI, inputNode: heightInput } = customRange("input_height", 32, 50);

let isShowDetails = false;

const cuttingTypeSelect = document.getElementById("cut");
const summaryCard = document.getElementById("summary");
const priceLabel = document.getElementById("price");
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
calculator.appendInputElements({ amountInput, cornerRadiusInput, widthInput, heightInput, cuttingTypeSelect });

const render = ({ product, isShowDetails }) => {
    if (isShowDetails) {
        detailedPriceBtn.innerText = "+"
        // summaryCard.parentElement.classList.remove("flex_1");
        summaryCard.parentElement.classList.add("flex_3");
        detailedPriceBtn.classList.add("rotate_45");
        summaryCard.innerHTML = DetailedSummaryCard({ product });
    }
    if (!isShowDetails) {
        // summaryCard.parentElement.classList.remove("flex_3");
        detailedPriceBtn.classList.remove("rotate_45");
        detailedPriceBtn.innerText = "i"
        summaryCard.parentElement.classList.replace("flex_1", "flex_2");
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
    renderWidthRangeUI();
    renderHeightUI();
    renderAmountUI();

    setTimeout(() => {
        renderCornerRadiusRangeUI();
        renderWidthRangeUI();
        renderHeightUI();
        renderAmountUI();
    }, 150);
};

const updateCalculator = (e) => {
    e?.preventDefault();
    let isSizeChanged = false;
    let isCuttingTypeChanged = false;

    if (e?.type === "change") {
        switch (e?.target?.id) {
            case "input_range_width":
                product.width = Number(e.target.value);
                isSizeChanged = true;
                break;
            case "input_range_height":
                product.height = Number(e.target.value);
                isSizeChanged = true;
                break;
            case "input_range_corner_radius":
                product.cornerRadius = Number(e.target.value);
                isSizeChanged = true;
                break;
            case "input_range_amount":
                product.targetAmount = Number(e.target.value);
                break;
            case "material":
                product.material = e.target.value;
                break;
            case "cut":
                product.cutType = e.target.value;
                isCuttingTypeChanged = true;
                break;
        }
    }
    if (e?.type === "click") {
        if (e?.target?.id === "detailed_price_btn") {
            isShowDetails = !isShowDetails;
        }
    }

    calculator.calculate(product);
    calculator.applyConditions({ isSizeChanged, isCuttingTypeChanged });
    calculator.renderCalculatorForm({
        UIComponents: [renderAmountUI, renderCornerRadiusRangeUI, renderWidthRangeUI, renderHeightUI],
        isShowDetails: isShowDetails
    });
}

document.getElementById("calculator").addEventListener("change", (e) => updateCalculator(e));
document.getElementById("calculator").addEventListener("click", (e) => updateCalculator(e));


updateCalculator();

