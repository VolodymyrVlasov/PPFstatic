import { customRange } from "./app.js";
import { KISS_CUT_A4, KISS_CUT_A3, DIE_CUT } from "../src/CuttingTypes.js";
import { MAX_PRINT_X_SKYCUT, MAX_PRINT_Y_SKYCUT, MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT } from "../src/Sizes.js";
import { PRINTRUN_INDEXES, SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE } from "../src/Prices.js";
import {
  RAFLATAC,
  RAFLATAC_MATTE,
  RAFLATAC_GLOSS,
  RAFLATAC_FOIL,
  RITRAMA_MATTE,
  RITRAMA_GLOSS,
  RITRAMA_COATED,
  TRANSPARENT,
  TRANSPARENT_MATTE,
  TRANSPARENT_WHITE,
  TRANSPARENT_FOIL,
  VINE,
  PET,
} from "../src/MaterialTypes.js";

const { changeRangeUI: renderDiameterRange, inputNode: diameterInput } = customRange("input_diameter", 32, 40);
const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 60);

const priceLabel = document.getElementById("price");
const timeLabel = document.getElementById("prod-time");
const cuttingTypeSelect = document.getElementById("cut");

let isSizeChanged = false;
let isMaterialChanged = false;
let isCuttingTypeChanged = false;


const product = {
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

const renderCalculation = () => {
  if (isSizeChanged || isCuttingTypeChanged) {
    amountInput.min = product.amountAtSheet;
    amountInput.step = product.amountAtSheet;
    amountInput.max = product.amountAtSheet * 50;
    amountInput.value = product.amountAtSheet;
    renderAmountUI();
    isSizeChanged = false;
    isCuttingTypeChanged = false;
  }

  if (product.diameter < 50 && cuttingTypeSelect.children.length == 3) {
    cuttingTypeSelect.children[2].disabled = true
  } else if (product.diameter >= 50) {
    cuttingTypeSelect.children[2].disabled = false;
  }

  if (product.cutType === "KISS_CUT_A4") {
    diameterInput.min = 5;
    diameterInput.max = 200;
    renderDiameterRange();
    renderAmountUI();
  } 
  if (product.cutType === "DIE_CUT") {
    diameterInput.max = 250;
    diameterInput.min = 50;
    renderDiameterRange();
    renderAmountUI();
  } 
  if (product.cutType === "KISS_CUT_A3" && diameterInput.max !== 300) {
    diameterInput.max = 300;
    diameterInput.min = 5;
    renderDiameterRange();
    renderAmountUI();
  }

  if (product.material === "TRANSPARENT_WHITE") {
    cuttingTypeSelect.children[0].disabled = true;
    cuttingTypeSelect.children[1].selected = true;
    diameterInput.max = 200;
    diameterInput.min = 5;
    renderDiameterRange();
    renderAmountUI();
  } else {
    cuttingTypeSelect.children[0].disabled = false;
  }

  priceLabel.innerText = `${product.totalPrice} грн`;
  timeLabel.innerText = product.finishTime;

  priceLabel.dataset.title = `
        Наліпок на аркуші${product.cutType == "KISS_CUT_A4" ? ` А4:\t${product.amountAtSheet / 2}`:  ` А3:\t${product.amountAtSheet}`}\t\tшт.
        Аркушів у накладі:\t\t${product.sheetsAtPrintingRun}\t\tшт.
        Метрів порізки:\t\t\t${product.cutAtPrintingRun}\t\tм.п.
        Вартість друку:\t\t\t${product.printingPrice}\t\tгрн.
        Вартість порізки:\t\t${product.cutingPrice}\t\tгрн.
        Вартість 1 наліпки.:\t\t${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)}\t\tгрн.
        Загальна вартість:\t\t${product.totalPrice}\t\tгрн.`;
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
        yAxisCount = Math.floor(((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (product.diameter + BLEED_KISS_CUT))) * 2;
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
    return product.cutAtPrintingRun * SELFADHESIVE_CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)];
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
      isMaterialChanged = true;
      break;
    case "cut":
      product.cutType = target.value;
      isCuttingTypeChanged = true;
      break;
  }
  calculateProduct();
});

calculateProduct();
