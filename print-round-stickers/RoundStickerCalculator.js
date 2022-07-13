import {customRange, addTitle} from "./app.js";
import {KISS_CUT_A4, KISS_CUT_A3, DIE_CUT} from "../src/CuttingTypes.js"
import {MAX_PRINT_X_SKYCUT,MAX_PRINT_Y_SKYCUT,MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT} from "../src/Sizes.js";
import {PRINTRUN_INDEXES, SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE} from "../src/Prices.js";


const renderDiameterRange = customRange("input_diameter", 32, 40);
const renderAmountRange = customRange("input_amount", 32, 60);

const amountInput = document.getElementById("input_range_amount");
const priceLabel = document.getElementById("price");

let isSizeChanged = false;

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
};

const calculatePrice = () => {
//   console.clear();

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
        xAxisCount = Math.floor(
          MAX_PRINT_X_SKYCUT / (product.diameter + BLEED_KISS_CUT)
        );
        yAxisCount = Math.floor(
          MAX_PRINT_Y_SKYCUT / (product.diameter + BLEED_KISS_CUT)
        );
        break;
      case KISS_CUT_A4:
        xAxisCount = Math.floor(
          (MAX_PRINT_X_SKYCUT - 8) / (product.diameter + BLEED_KISS_CUT)
        );
        yAxisCount = Math.floor(
          ((MAX_PRINT_Y_SKYCUT * 0.5 - 8) /
            (product.diameter + BLEED_KISS_CUT)) *
            2
        );
        break;
      case DIE_CUT:
        xAxisCount = Math.floor(
          MAX_PRINT_X_SUMMA / (product.diameter + BLEED_DIE_CUT)
        );
        yAxisCount = Math.floor(
          ((MAX_PRINT_Y_SUMMA / 2 - 8) / (product.diameter + BLEED_DIE_CUT)) * 2
        );
        break;
    }

    return  xAxisCount * yAxisCount;
  };

  const getCutAtSheet = () => {
    return Math.ceil(0.00314 * product.diameter * product.amountAtSheet);
  };

  const getSheetsAtPrintingRun = () => {
    return Math.ceil(product.targetStickerAmount / product.amountAtSheet);
  };

  const getCutAtPrintingRun = () => {
    return Math.ceil(product.cutAtSheet * product.sheetsAtPrintingRun);
  };

  const getPrintingPrice = () => {
    return (product.sheetsAtPrintingRun * SELFADHESIVE_PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)]);
  };

  const getCutingPrice = () => {
    return (
      product.cutAtPrintingRun *
      SELFADHESIVE_CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]
    );
  };

  const getTotalPrice = () => {
    return Math.ceil(product.cutingPrice + product.printingPrice);
  };

  const getSummaryStickerAmount = () => {
    return product.amountAtSheet * product.sheetsAtPrintingRun;
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

  priceLabel.innerText = `${product.totalPrice} грн`;

  if (isSizeChanged) {
    amountInput.step = amountAtSheet;
    amountInput.min = amountAtSheet;
    amountInput.value = amountAtSheet;
    renderAmountRange();
    isSizeChanged = !isSizeChanged;
}
  
  priceLabel.title = `
  Наліпок на аркуші: ${product.amountAtSheet} шт.
  Аркушів на друк: ${product.sheetsAtPrintingRun}  шт.
  Метрів порізки: ${product.cutAtPrintingRun} м.п.
  Вартість друку: ${product.printingPrice} грн.
  Вартість порізки: ${product.cutingPrice} грн.
  Вартість 1 арк.: ${SELFADHESIVE_PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)]} грн.
  Вартість 1 м. порізки: ${SELFADHESIVE_CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]} грн.
  Загальна вартість: ${product.totalPrice} грн.
  `
};

const calculateTime = () => console.log("time calculate");

document.getElementById("calculator").addEventListener("input", (e) => {
  const target = e.target;

  switch (target.id) {
    case "input_range_diameter":
      product.diameter = Number(target.value);
      isSizeChanged = !isSizeChanged;
      renderAmountRange();
      break;
    case "input_range_amount":
      product.targetStickerAmount = Number(target.value);
      break;
    case "material":
      product.material = target.value;
      break;
    case "cut":
      product.cutType = target.value;
      break;
  }

  console.table(product);

  calculatePrice();
  calculateTime();
});
