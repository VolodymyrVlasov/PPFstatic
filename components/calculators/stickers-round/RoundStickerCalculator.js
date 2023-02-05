import { customRange } from "../../../src/app.js";
import { KISS_CUT_A4, KISS_CUT_A3, DIE_CUT } from "../../../src/CuttingTypes.js";
import { MAX_PRINT_X_SKYCUT, MAX_PRINT_Y_SKYCUT, MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT } from "../../../src/Sizes.js";
import { PRINTRUN_INDEXES, SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE } from "../../../src/Prices.js";
import { RAFLATAC_MATTE, RAFLATAC_GLOSS, RITRAMA_MATTE, RITRAMA_GLOSS, RITRAMA_COATED } from "../../../src/MaterialTypes.js";

const { changeRangeUI: renderDiameterRange, inputNode: diameterInput } = customRange("input_diameter", 32, 40);
const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 60);

const log = (...messages) => console.log(...messages);

let isSizeChanged = false;
let isCuttingTypeChanged = false;
let isShowDetails = false;

const cuttingTypeSelect = document.getElementById("cut");
const summaryCard = document.getElementById("summary");
const priceLabel = document.getElementById("price");
const timeLabel = document.getElementById("prod-time");
const detailedPriceBtn = document.getElementById("detailed_price_btn")

const product = {
  productType: "ROUND_STICKER",
  diameter: 50,
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

const getDetailedSummaryCard = () => {
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

const getSummaryCard = () => {
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

const renderCalculation = () => {
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
  if (product.diameter < 50 && cuttingTypeSelect.children.length == 3) {
    cuttingTypeSelect.children[2].disabled = true;
  } else if (product.diameter >= 50) {
    cuttingTypeSelect.children[2].disabled = false;
  }
  if (product.cutType === "KISS_CUT_A4") {
    diameterInput.min = 5;
    diameterInput.max = 200;
  }
  if (product.cutType === "DIE_CUT") {
    diameterInput.max = 250;
    diameterInput.min = 50;
  }
  if (product.cutType === "KISS_CUT_A3" && diameterInput.max !== 300) {
    diameterInput.max = 300;
    diameterInput.min = 5;
  }
  if (product.material === "TRANSPARENT_WHITE") {
    cuttingTypeSelect.children[0].disabled = true;
    cuttingTypeSelect.children[1].selected = true;
    diameterInput.max = 200;
    diameterInput.min = 5;
  } else {
    cuttingTypeSelect.children[0].disabled = false;
  }

  if (isShowDetails) {
    detailedPriceBtn.innerText = "+"
    summaryCard.parentElement.classList.remove("flex_1");
    summaryCard.parentElement.classList.add("flex_3");
    detailedPriceBtn.classList.add("rotate_45");
    summaryCard.innerHTML = getDetailedSummaryCard();
  }
  if (!isShowDetails) {
    summaryCard.parentElement.classList.remove("flex_3");
    detailedPriceBtn.classList.remove("rotate_45");
    detailedPriceBtn.innerText = "i"
    summaryCard.parentElement.classList.add("flex_1");
    summaryCard.innerHTML = getSummaryCard();
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
  setTimeout(() => {
    renderDiameterRange();
    renderAmountUI();
  }, 150);
};

const calculateProduct = () => {
  const getPriceIndex = (printRunAmount) => {
    for (let index = 0; index < PRINTRUN_INDEXES.length; index++) {
      if (index + 1 >= PRINTRUN_INDEXES.length) return PRINTRUN_INDEXES.length - 1;
      if (printRunAmount < PRINTRUN_INDEXES[0]) return 0;
      if (printRunAmount >= PRINTRUN_INDEXES[index] && printRunAmount < PRINTRUN_INDEXES[index + 1]) return index;
    }
  };

  const getAmountAtSheet = () => {
    let xAxisCount;
    let yAxisCount;

    switch (product.cutType) {
      case KISS_CUT_A3:
        xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (product.diameter + BLEED_KISS_CUT));
        yAxisCount = Math.floor(MAX_PRINT_Y_SKYCUT / (product.diameter + BLEED_KISS_CUT));
        break;
      case KISS_CUT_A4:
        xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (product.diameter + BLEED_KISS_CUT));
        yAxisCount = Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (product.diameter + BLEED_KISS_CUT)) * 2;
        break;
      case DIE_CUT:
        xAxisCount = Math.floor(MAX_PRINT_X_SUMMA / (product.diameter + BLEED_DIE_CUT));
        yAxisCount = Math.floor(((MAX_PRINT_Y_SUMMA / 2 - 8) / (product.diameter + BLEED_DIE_CUT)) * 2);
        break;
    }
    return xAxisCount * yAxisCount;
  };

  const getCutAtSheet = () => Math.ceil(0.00314 * product.diameter * product.amountAtSheet);

  const getSheetsAtPrintingRun = () => Math.ceil(product.targetStickerAmount / product.amountAtSheet);

  const getCutAtPrintingRun = () => Math.ceil(product.cutAtSheet * product.sheetsAtPrintingRun);

  const getPrintingPrice = () => {
    return product.sheetsAtPrintingRun * SELFADHESIVE_PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)];
  };

  const getCutingPrice = () => {
    return Math.ceil(product.cutAtPrintingRun * SELFADHESIVE_CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]);
  };

  const getTotalPrice = () => {
    return Math.ceil(product.cutingPrice + product.printingPrice);
  };

  const getSummaryStickerAmount = () => product.amountAtSheet * product.sheetsAtPrintingRun;

  const calculateTime = () => {
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

  product.diameter = product.diameter;
  product.targetStickerAmount = product.targetStickerAmount;
  product.material = product.material;
  product.cutType = product.cutType;
  product.amountAtSheet = getAmountAtSheet();
  product.cutAtSheet = getCutAtSheet();
  product.sheetsAtPrintingRun = getSheetsAtPrintingRun();
  product.cutAtPrintingRun = getCutAtPrintingRun();
  product.printingPrice = getPrintingPrice();
  product.cutingPrice = getCutingPrice();
  product.summaryStickerAmout = getSummaryStickerAmount();
  product.totalPrice = getTotalPrice();
  product.finishTime = calculateTime();

  renderCalculation();
};

document.getElementById("calculator").addEventListener("input", (e) => {
  const target = e.target;
  switch (target.id) {
    case "input_range_diameter":
      product.diameter = Number(target.value);
      isSizeChanged = true;
      break;
    case "input_range_amount":
      product.targetStickerAmount = Number(target.value);
      break;
    case "material":
      product.material = target.value;
      break;
    case "cut":
      product.cutType = target.value;
      isCuttingTypeChanged = true;
      break;
  }
  calculateProduct();
});

detailedPriceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isShowDetails = !isShowDetails;
  log(isShowDetails);
  renderCalculation();
});

calculateProduct();
