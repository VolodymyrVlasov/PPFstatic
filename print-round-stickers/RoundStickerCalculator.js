const amountInput = document.getElementById("input_range_amount");
const priceLabel = document.getElementById("price");

const RAFLATAC = "RAFLATAC";
const RAFLATAC_MATTE = "RAFLATAC_MATTE";
const RAFLATAC_GLOSS = "RAFLATAC_GLOSS";
const RAFLATAC_FOIL = "RAFLATAC_FOIL";
const RITRAMA_MATTE = "RITRAMA_MATTE";
const RITRAMA_GLOSS = "RITRAMA_GLOSS";
const RITRAMA_COATED = "RITRAMA_COATED";
const TRANSPARED = "TRANSPARED";
const TRANSPARED_MATTE = "TRANSPARED_MATTE";
const TRANSPARED_WHITE = "TRANSPARED_WHITE";
const TRANSPARED_FOIL = "TRANSPARED_FOIL";
const VINE = "VINE";
const PET = "PET";

const KISS_CUT_A4 = "KISS_CUT_A4";
const KISS_CUT_A3 = "KISS_CUT_A3";
const DIE_CUT = "DIE_CUT";

const MAX_PRINT_X_SKYCUT = 300;
const MAX_PRINT_Y_SKYCUT = 430;

const MAX_PRINT_X_SUMMA = 280;
const MAX_PRINT_Y_SUMMA = 380;

const BLEED_KISS_CUT = 3;
const BLEED_DIE_CUT = 6;

const indexes = [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000];

const CUT_PRICE = {
  KISS_CUT_A3: [6, 6, 4, 4, 4, 3, 2.5, 2.5, 1.5, 1],
  KISS_CUT_A4: [6, 6, 4, 4, 4, 3, 2.5, 2.5, 1.5, 1],
  DIE_CUT: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
};
const PRINT_PRICE = {
  RAFLATAC: [28, 28, 24, 19, 17, 14, 14, 14, 14, 14],
  RAFLATAC_MATTE: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  RAFLATAC_GLOSS: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  RAFLATAC_FOIL: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  RITRAMA_MATTE: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  RITRAMA_GLOSS: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  RITRAMA_COATED: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  TRANSPARED: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  TRANSPARED_MATTE: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  TRANSPARED_WHITE: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  TRANSPARED_FOIL: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  VINE: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
  PET: [5, 10, 20, 40, 50, 100, 200, 400, 500, 1000],
};

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
  console.clear();

  const getPriceIndex = (printRunAmount) => {
    for (let index = 0; index < indexes.length; index++) {
      if (index + 1 >= indexes.length) return indexes.length - 1;
      if (printRunAmount < indexes[0]) return 0;
      if (printRunAmount >= indexes[index] && printRunAmount < indexes[index + 1]) return index;
    }
  };

  const getAmountAtSheet = () => {
    let xAxisCount;
    let yAxisCount;
    let amountAtSheet;

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
    amountAtSheet = xAxisCount * yAxisCount;
    amountInput.step = amountInput.min = amountAtSheet;
    // amountInput.max = amountAtSheet * 200;
    return amountAtSheet;
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
    const o = {};
    o.sheetsAtPrintingRun = product.sheetsAtPrintingRun;
    // o.selectedPriceList = PRINT_PRICE[product.material];
    o.priceIndex = getPriceIndex(product.sheetsAtPrintingRun);
    o.pricePerSheet = PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)]
    console.table(o);

    return (
      product.sheetsAtPrintingRun *
      PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)]
    );
  };

  const getCutingPrice = () => {
    return (
      product.cutAtPrintingRun *
      CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]
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
  console.table(product);

  priceLabel.innerText = `${product.totalPrice} грн`;
  priceLabel.title = `
  Наліпок на аркуші: ${product.amountAtSheet} шт.
  Аркушів на друк: ${product.sheetsAtPrintingRun}  шт.
  Метрів порізки: ${product.cutAtPrintingRun} м.п.
  Вартість друку: ${product.printingPrice} грн.
  Вартість порізки: ${product.cutingPrice} грн.
  Вартість 1 арк.: ${PRINT_PRICE[product.material][getPriceIndex(product.sheetsAtPrintingRun)]} грн.
  Вартість 1 м. порізки: ${CUT_PRICE[product.cutType][getPriceIndex(product.cutAtPrintingRun)]} грн.
  Загальна вартість: ${product.totalPrice} грн.
  `
};

const calculateTime = () => console.log("time calculate");

document.getElementById("calculator").addEventListener("change", (e) => {
  const target = e.target;

  switch (target.id) {
    case "input_range_diameter":
      product.diameter = Number(target.value);
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
