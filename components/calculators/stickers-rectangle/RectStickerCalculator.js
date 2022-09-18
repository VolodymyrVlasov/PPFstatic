import { customRange } from "../../../src/app.js";
import { KISS_CUT_A4, KISS_CUT_A3, DIE_CUT } from "../../../src/CuttingTypes.js";
import { MAX_PRINT_X_SKYCUT, MAX_PRINT_Y_SKYCUT, MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT } from "../../../src/Sizes.js";
import { PRINTRUN_INDEXES, SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE } from "../../../src/Prices.js";
import { RAFLATAC_MATTE, RAFLATAC_GLOSS, RITRAMA_MATTE, RITRAMA_GLOSS, RITRAMA_COATED } from "../../../src/MaterialTypes.js";

const { changeRangeUI: renderDiameterRange, inputNode: diameterInput } = customRange("input_diameter", 32, 0);
const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 24);
const { changeRangeUI: renderWidthRange, inputNode: widthInput } = customRange("input_width", 32, 50);
const { changeRangeUI: renderHeightUI, inputNode: heightInput } = customRange("input_height", 32, 50);

const log = (...messages) => console.log(...messages);

let isSizeChanged = false;
let isCuttingTypeChanged = false;
let isShowDetails = false;

const cuttingTypeSelect = document.getElementById("cut");
const summaryCard = document.getElementById("summary");
const priceLabel = document.getElementById("price");
const timeLabel = document.getElementById("prod-time");
const detailedPriceBtn = document.getElementById("detailed_price_btn")

const editableProduct = {
    productType: "RECT_STICKER",
    cornerRadius: 0,
    width: 50,
    height: 50,
    targetStickerAmount: 2,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
    amountAtSheet: 40,
    cutAtSheet: 1,
    sheetsAtPrintingRun: 1,
    cutAtPrintingRun: 2,
    printingPrice: 1,
    cutingPrice: 1,
    summaryStickerAmout: 80,
    totalPrice: 1,
    finishTime: `${(new Date().getDate() + 1).toLocaleString("uk-UA", { day: "numeric", month: "long" })} 18:00`,
};

const getDetailedSummaryCard = (product) => {
    return `
        <div class="col big_gap width_100">     
            <div class="row big_gap width_100">
                <div class="col gap flex_1">
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Наліпок на аркуші ${product.cutType == "KISS_CUT_A4" ? "А4:" : "А3:"}</span>
                        <strong class="text_12__gray">${product.cutType == "KISS_CUT_A4" ? product.amountAtSheet / 2 : product.amountAtSheet} шт</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Аркушів у накладі:</span>
                        <strong class="text_12__gray">${product.sheetsAtPrintingRun} шт</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Метрів порізки у накладі:</span>
                        <strong class="text_12__gray">${product.cutAtPrintingRun} мп</strong>
                    </div>
                </div>
                <div class="col gap flex_1">
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Вартість друку:</span>
                        <strong class="text_12__gray">${product.printingPrice} грн</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Вартість порізки:</span>
                        <strong class="text_12__gray">${product.cutingPrice} грн</strong>
                    </div>
                    <div class="row_sp_btw  width_100 border_bottom">
                        <span class="text_12__gray">Вартість 1 наліпки:</span>
                        <strong class="text_12__gray">${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)} грн</strong>
                    </div>
                </div>
            </div> 
            <div class="row big_gap width_100">
                <div class="col gap flex_1">
                    <label for="prod-time">Готовність:</label>
                    <strong id="prod-time" class="link" title="Орієнтовні дата та час готовності, в залежності від особливостей макету, дати замовлення чи завантаженості виробництва можуть бути змінені">${product.finishTime}</strong>
                </div>

                <div class="col gap flex_1">
                    <label for="price">Варстіть:</label>
                    <strong id="price" class="price">${product.totalPrice} грн</strong>
                </div>
            </div>
        </div>`;
};

const getSummaryCard = (product) => {
    const getTitle = () => {
        return `
        Наліпок на аркуші${product.cutType == "KISS_CUT_A4" ? ` А4:\t${product.amountAtSheet / 2}` : ` А3:\t${product.amountAtSheet}`}\t\tшт.
        Аркушів у накладі:\t\t${product.sheetsAtPrintingRun}\t\tшт.
        Метрів порізки:\t\t\t${product.cutAtPrintingRun}\t\tм.п.
        Вартість друку:\t\t\t${product.printingPrice}\t\tгрн.
        Вартість порізки:\t\t${product.cutingPrice}\t\tгрн.
        Вартість 1 наліпки.:\t\t${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)}\t\tгрн.
        Загальна вартість:\t\t${product.totalPrice}\t\tгрн.`;
    };

    return `
            <div class="col gap flex_1">
                <label for="prod-time">Готовність:</label>
                <strong id="prod-time"  class="link"
                title="Орієнтовні дата та час готовності, в залежності від особливостей макету, дати замовлення чи завантаженості виробництва можуть бути змінені">${product.finishTime}</strong>
            </div>
            <div class="col gap flex_1">
                <label for="price">Варстіть:</label>
                <strong id="price" class="price" title="${getTitle()}">${product.totalPrice} грн</strong>
            </div>
        `;
};

const renderCalculation = (product) => {
    if (isSizeChanged || isCuttingTypeChanged) {
        amountInput.min = product.amountAtSheet;
        amountInput.value = product.amountAtSheet;
        amountInput.step = product.amountAtSheet;
        amountInput.max = product.amountAtSheet * 50;
        product.targetStickerAmount = product.amountAtSheet;
        product.sheetsAtPrintingRun = 1;
        isSizeChanged = false;
        isCuttingTypeChanged = false;
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
        diameterInput.max = 250;
        diameterInput.min = 50;
    }
    if (product.cutType === "KISS_CUT_A3" && diameterInput.max !== 300) {
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
        diameterInput.max = Math.floor(widthInput.value / 2);
    } else {
        diameterInput.max = Math.floor(heightInput.value / 2);
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

    if (isShowDetails) {
        detailedPriceBtn.innerText = "+"
        summaryCard.parentElement.classList.remove("flex_1");
        summaryCard.parentElement.classList.add("flex_3");
        detailedPriceBtn.classList.add("rotate_45");
        summaryCard.innerHTML = getDetailedSummaryCard(product);
    }
    if (!isShowDetails) {
        summaryCard.parentElement.classList.remove("flex_3");
        detailedPriceBtn.classList.remove("rotate_45");
        detailedPriceBtn.innerText = "i"
        summaryCard.parentElement.classList.add("flex_1");
        summaryCard.innerHTML = getSummaryCard(product);
        priceLabel.title = `
        Наліпок на аркуші${product.cutType == "KISS_CUT_A4" ? ` А4:\t${product.amountAtSheet / 2}` : ` А3:\t${product.amountAtSheet}`}\t\tшт.
        Аркушів у накладі:\t\t${product.sheetsAtPrintingRun}\t\tшт.
        Метрів порізки:\t\t\t${product.cutAtPrintingRun}\t\tм.п.
        Вартість друку:\t\t\t${product.printingPrice}\t\tгрн.
        Вартість порізки:\t\t${product.cutingPrice}\t\tгрн.
        Вартість 1 наліпки.:\t\t${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)}\t\tгрн.
        Загальна вартість:\t\t${product.totalPrice}\t\tгрн.`;
    }

    renderDiameterRange();
    renderAmountUI();
    renderWidthRange();
    renderHeightUI();
    setTimeout(() => {
        renderDiameterRange();
        renderAmountUI();
        renderWidthRange();
        renderHeightUI();
    }, 150);
};

const calculateProduct = (product) => {
    
    const getPriceIndex = (printRunAmount) => {
        for (let index = 0; index < PRINTRUN_INDEXES.length; index++) {
            if (index + 1 >= PRINTRUN_INDEXES.length) return PRINTRUN_INDEXES.length - 1;
            if (printRunAmount < PRINTRUN_INDEXES[0]) return 0;
            if (printRunAmount >= PRINTRUN_INDEXES[index] && printRunAmount < PRINTRUN_INDEXES[index + 1]) return index;
        }
    };

    const getAmountAtSheet = (product) => {
        let xAxisCount;
        let yAxisCount;

        switch (product.cutType) {
            case KISS_CUT_A3: {
                if (product.cornerRadius === 0) {
                    xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / product.width) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / product.height);
                    yAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / product.height) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / product.width);
                } else {
                    xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (product.width + BLEED_KISS_CUT)) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / (product.height + BLEED_KISS_CUT));
                    yAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (product.height + BLEED_KISS_CUT)) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / (product.width + BLEED_KISS_CUT));
                }
                break;
            }
            case KISS_CUT_A4: {
                if (product.cornerRadius === 0) {
                    xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / product.width) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / product.height);
                    yAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / product.height) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / product.width);
                } else {
                    xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (product.width + BLEED_KISS_CUT)) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (product.height + BLEED_KISS_CUT));
                    yAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (product.height + BLEED_KISS_CUT)) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (product.width + BLEED_KISS_CUT));
                }
                break;
            }
            case DIE_CUT:
                xAxisCount = Math.floor((MAX_PRINT_X_SUMMA - 8) / (product.width + BLEED_DIE_CUT)) *
                    Math.floor((MAX_PRINT_Y_SUMMA * 0.5 - 8) / (product.height + BLEED_DIE_CUT) * 2);
                yAxisCount = Math.floor((MAX_PRINT_X_SUMMA - 8) / (product.height + BLEED_DIE_CUT)) *
                    Math.floor((MAX_PRINT_Y_SUMMA * 0.5 - 8) / (product.width + BLEED_DIE_CUT) * 2);
                break;
        }
        return Math.max(xAxisCount, yAxisCount);
    };

    const getCutAtSheet = (product) => {
        if ((product.cutType === KISS_CUT_A3 || product.cutType === KISS_CUT_A4) && product.cornerRadius === 0) {
            return Number(((((product.width * 2 + product.height * 2) * product.amountAtSheet) * 0.6) / 1000).toFixed(1));
        }

        if (product.cutType === DIE_CUT && product.cornerRadius === 0) {
            return Number(((((product.width * 2 + product.height * 2) * product.amountAtSheet) * 2) / 1000).toFixed(1));
        }

        if ((product.cutType === KISS_CUT_A3 || product.cutType === KISS_CUT_A4) && product.cornerRadius > 0) {
            let widthSum = (product.width - product.cornerRadius * 2) * 2;
            let heightSum = (product.height - product.cornerRadius * 2) * 2;
            let cornerRadius = 2 * Math.PI * product.cornerRadius;

            return Number(((widthSum + heightSum + cornerRadius) / 1000 * product.amountAtSheet).toFixed(1));
        }
    };

    const getSheetsAtPrintingRun = (product) => Math.ceil(product.targetStickerAmount / product.amountAtSheet);

    const getCutAtPrintingRun = (product) => Math.ceil(product.cutAtSheet * product.sheetsAtPrintingRun);

    const getPrintingPrice = (product) => {
        return product.sheetsAtPrintingRun * SELFADHESIVE_PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)];
    };

    const getCutingPrice = (product) => {
        return Math.ceil(product.cutAtPrintingRun * SELFADHESIVE_CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]);
    };

    const getTotalPrice = (product) => {
        return Math.ceil(product.cutingPrice + product.printingPrice);
    };

    const getSummaryStickerAmount = (product) => product.amountAtSheet * product.sheetsAtPrintingRun;

    const calculateTime = (product) => {
        const date = new Date();
        const material = product.material;
        const printRun = product.sheetsAtPrintingRun;
        const cutType = product.cutType;
        let days = 1;
        if (
            ((material == RITRAMA_MATTE || material == RITRAMA_GLOSS) && printRun > 99) ||
            (material == RITRAMA_COATED && printRun > 20) ||
            ((material == RAFLATAC_MATTE || material == RAFLATAC_GLOSS) && printRun > 99)
        ) {
            days = 3;
        } else if (
            ((material == RITRAMA_MATTE || material == RITRAMA_GLOSS) && printRun > 50) ||
            (material == RITRAMA_COATED && printRun > 5) ||
            ((material == RAFLATAC_MATTE || material == RAFLATAC_GLOSS) && printRun > 50)
        ) {
            days = 2;
        } else if (cutType == DIE_CUT && printRun > 40) {
            days = 3;
        } else if (cutType == DIE_CUT && printRun > 10) {
            days = 2;
        }
        date.setDate(date.getDate() + days);
        const finishDate = date.toLocaleString("uk-UA", { day: "numeric", month: "long" });
        return `${finishDate} 18:00`;
    };

    product.cornerRadius = product.cornerRadius;
    product.targetStickerAmount = product.targetStickerAmount;
    product.material = product.material;
    product.cutType = product.cutType;
    product.amountAtSheet = getAmountAtSheet(product);
    product.cutAtSheet = getCutAtSheet(product);
    product.sheetsAtPrintingRun = getSheetsAtPrintingRun(product);
    product.cutAtPrintingRun = getCutAtPrintingRun(product);
    product.printingPrice = getPrintingPrice(product);
    product.cutingPrice = getCutingPrice(product);
    product.summaryStickerAmout = getSummaryStickerAmount(product);
    product.totalPrice = getTotalPrice(product);
    product.finishTime = calculateTime(product);

    renderCalculation(product);
    console.clear();
    console.table(product);
    return product;
};

document.getElementById("calculator").addEventListener("input", (e) => {
    const target = e.target;
    switch (target.id) {
        case "input_range_width":
            editableProduct.width = Number(target.value);
            isSizeChanged = true;
            break;
        case "input_range_height":
            editableProduct.height = Number(target.value);
            isSizeChanged = true;
            break;
        case "input_range_diameter":
            editableProduct.cornerRadius = Number(target.value);
            isSizeChanged = true;
            break;
        case "input_range_amount":
            editableProduct.targetStickerAmount = Number(target.value);
            break;
        case "material":
            editableProduct.material = target.value;
            break;
        case "cut":
            editableProduct.cutType = target.value;
            isCuttingTypeChanged = true;
            break;
    }
    calculateProduct(editableProduct);
});

detailedPriceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isShowDetails = !isShowDetails;
    renderCalculation(editableProduct);
});

calculateProduct(editableProduct);
