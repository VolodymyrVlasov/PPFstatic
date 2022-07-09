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

const MAX_PRINT_X_SUMMA= 280;
const MAX_PRINT_Y_SUMMA = 380;

const BLEED_KISS_CUT = 3;
const BLEED_DIE_CUT = 6;

const price = {
    RAFLATAC: [210, 160, 130],
    RAFLATAC_MATTE: [210, 160, 130],
    RAFLATAC_GLOSS: [340, 300, 250],
    RAFLATAC_FOIL: [210, 160, 130],
    RITRAMA_MATTE: [210, 160, 130],
    RITRAMA_GLOSS: [210, 160, 130],
    RITRAMA_COATED: [210, 160, 130],
    TRANSPARED: [210, 160, 130],
    TRANSPARED_MATTE: [210, 160, 130],
    TRANSPARED_WHITE: [210, 160, 130],
    TRANSPARED_FOIL: [210, 160, 130],
    VINE: [210, 160, 130],
    PET: [210, 160, 130]
};

const product = {
  diameter: 50,
  targetAmount: 2,
  material: "RAFLATAC",
  cutType: "KISS_CUT_A3",
  amountAtSheet: 40,
  cutAtSheet: 1,
  sheetsAtPrintingRun: 1,
  cutAtPrintingRun: 2,
  printingPrice: 1,
  cutingPrice: 1,
  totalPrice: 1,
};

document.getElementById("calculator").addEventListener("change", (e) => {
  const target = e.target;

  switch (target.id) {
    case "input_range_diameter":
      product.diameter = Number(target.value);
      break;
    case "input_range_amount":
      product.amount = Number(target.value);
      break;
    case "material":
      product.material = target.value;
      break;
    case "cut":
      product.cutType = target.value;
      break;
    case "amount":
      product.amount = target.value;
      break;
  };

  calculatePrice();
  calculateTime();
});

const calculatePrice = () => {
  const getAmountAtSheet = () => {
    let xAxisCount;
    let yAxisCount;

    switch (product.cutType) {
        case KISS_CUT_A3:
             xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (product.diameter + BLEED_KISS_CUT));
             yAxisCount = Math.floor(MAX_PRINT_Y_SKYCUT / (product.diameter + BLEED_KISS_CUT));
            return xAxisCount * yAxisCount;
        case KISS_CUT_A4:
             xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (product.diameter + BLEED_KISS_CUT));
             yAxisCount = Math.floor(((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (product.diameter + BLEED_KISS_CUT)) * 2);
            return xAxisCount * yAxisCount;
        case DIE_CUT:
            xAxisCount = Math.floor(MAX_PRINT_X_SUMMA / (product.diameter + BLEED_DIE_CUT));
            yAxisCount = Math.floor(((MAX_PRINT_Y_SUMMA / 2 - 8) / (product.diameter + BLEED_DIE_CUT)) * 2);
            return xAxisCount * yAxisCount;
    }
  };

  const getCutAtSheet = () => {
    

  };

  const getSheetsAtPrintingRun = () => {};
  const getCutAtPrintingRun = () => {};
  const getPrintingPrice = () => {};
  const getCutingPrice = () => {};
  const getTotalPrice = () => {};
};

 

  document.getElementById("price").innerText = `${product.price.toFixed(
    0
  )} грн`;

  console.table(product);
};

const calculateTime = () => {};
