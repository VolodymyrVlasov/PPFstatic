import { AbstractCalculator } from "../AbstractCalculator.js";
import { KISS_CUT_A4, KISS_CUT_A3, DIE_CUT } from "../../CuttingTypes.js";
import { MAX_PRINT_X_SKYCUT, MAX_PRINT_Y_SKYCUT, MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT } from "../../Sizes.js";
import { SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE } from "../../Prices.js";
import { RAFLATAC_MATTE, RAFLATAC_GLOSS, RITRAMA_MATTE, RITRAMA_GLOSS, RITRAMA_COATED } from "../../MaterialTypes.js";

export class RoundStickerCalculator extends AbstractCalculator {
    constructor(product) {
        super(product);
        super.printPrice(SELFADHESIVE_PRINT_PRICE);
        super.cutPrice(SELFADHESIVE_CUT_PRICE);
    }

    getAmountAtSheet() {
        let xAxisCount;
        let yAxisCount;
    
        switch (this.product.cutType) {
          case KISS_CUT_A3:
            xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (this.product.diameter + BLEED_KISS_CUT));
            yAxisCount = Math.floor(MAX_PRINT_Y_SKYCUT / (this.product.diameter + BLEED_KISS_CUT));
            break;
          case KISS_CUT_A4:
            xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (this.product.diameter + BLEED_KISS_CUT));
            yAxisCount = Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (this.product.diameter + BLEED_KISS_CUT)) * 2;
            break;
          case DIE_CUT:
            xAxisCount = Math.floor(MAX_PRINT_X_SUMMA / (this.product.diameter + BLEED_DIE_CUT));
            yAxisCount = Math.floor(((MAX_PRINT_Y_SUMMA / 2 - 8) / (this.product.diameter + BLEED_DIE_CUT)) * 2);
            break;
        }
        this.product.amountAtSheet = xAxisCount * yAxisCount;
        return this.product.amountAtSheet;
    };

    getCutAtSheet() {
        this.product.cutAtSheet =  Math.ceil(0.00314 * this.product.diameter * this.product.amountAtSheet);
        return this.product.cutAtSheet;
    }

    calculateTime() {
        const date = new Date();
        const material = this.product.material;
        const printRun = this.product.sheetsAtPrintingRun;
        const cutType = this.product.cutType;
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

    calculate(product) {
        this.product = product;
        this.product.amountAtSheet = this.getAmountAtSheet();
        this.product.cutAtSheet = this.getCutAtSheet();
        this.product.finishTime = this.calculateTime();
        super.calculateProduct(product);
        return this.product;
    }
}