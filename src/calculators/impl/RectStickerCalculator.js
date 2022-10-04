import { AbstractCalculator } from "../AbstractCalculator.js";
import { KISS_CUT_A4, KISS_CUT_A3, DIE_CUT } from "../../CuttingTypes.js";
import { MAX_PRINT_X_SKYCUT, MAX_PRINT_Y_SKYCUT, MAX_PRINT_X_SUMMA, MAX_PRINT_Y_SUMMA, BLEED_KISS_CUT, BLEED_DIE_CUT } from "../../Sizes.js";
import { SELFADHESIVE_CUT_PRICE, SELFADHESIVE_PRINT_PRICE } from "../../Prices.js";
import { RAFLATAC_MATTE, RAFLATAC_GLOSS, RITRAMA_MATTE, RITRAMA_GLOSS, RITRAMA_COATED } from "../../MaterialTypes.js";

export class RectStickerCalculator extends AbstractCalculator {
    constructor(product) {
        super(product);
        super.printPrice(SELFADHESIVE_PRINT_PRICE);
        super.cutPrice(SELFADHESIVE_CUT_PRICE);
    }

    getAmountAtSheet() {
        let xAxisCount;
        let yAxisCount;

        switch (this.product.cutType) {
            case KISS_CUT_A3: {
                if (this.product.cornerRadius === 0) {
                    xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / this.product.width) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / this.product.height);
                    yAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / this.product.height) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / this.product.width);
                } else {
                    xAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (this.product.width + BLEED_KISS_CUT)) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / (this.product.height + BLEED_KISS_CUT));
                    yAxisCount = Math.floor(MAX_PRINT_X_SKYCUT / (this.product.height + BLEED_KISS_CUT)) *
                        Math.floor(MAX_PRINT_Y_SKYCUT / (this.product.width + BLEED_KISS_CUT));
                }
                break;
            }
            case KISS_CUT_A4: {
                if (this.product.cornerRadius === 0) {
                    xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / this.product.width) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / this.product.height);
                    yAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / this.product.height) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / this.product.width);
                } else {
                    xAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (this.product.width + BLEED_KISS_CUT)) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (this.product.height + BLEED_KISS_CUT));
                    yAxisCount = Math.floor((MAX_PRINT_X_SKYCUT - 8) / (this.product.height + BLEED_KISS_CUT)) *
                        Math.floor((MAX_PRINT_Y_SKYCUT * 0.5 - 8) / (this.product.width + BLEED_KISS_CUT));
                }
                break;
            }
            case DIE_CUT:
                xAxisCount = Math.floor((MAX_PRINT_X_SUMMA - 8) / (this.product.width + BLEED_DIE_CUT)) *
                    Math.floor((MAX_PRINT_Y_SUMMA * 0.5 - 8) / (this.product.height + BLEED_DIE_CUT) * 2);
                yAxisCount = Math.floor((MAX_PRINT_X_SUMMA - 8) / (this.product.height + BLEED_DIE_CUT)) *
                    Math.floor((MAX_PRINT_Y_SUMMA * 0.5 - 8) / (this.product.width + BLEED_DIE_CUT) * 2);
                break;
        }
        this.product.amountAtSheet = Math.max(xAxisCount, yAxisCount);
        return this.product.amountAtSheet;
    };

    getCutAtSheet() {
        if ((this.product.cutType === KISS_CUT_A3 || this.product.cutType === KISS_CUT_A4) && this.product.cornerRadius === 0) {
            this.product.cutAtSheet = Number(((((this.product.width * 2 + this.product.height * 2) * this.product.amountAtSheet) * 0.6) / 1000).toFixed(2));
        }
        if (this.product.cutType === DIE_CUT && this.product.cornerRadius === 0) {
            this.product.cutAtSheet = Number(((((this.product.width * 2 + this.product.height * 2) * this.product.amountAtSheet) * 2) / 1000).toFixed(2));
        }
        if ((this.product.cutType === KISS_CUT_A3 || this.product.cutType === KISS_CUT_A4) && this.product.cornerRadius > 0) {
            let widthSum = (this.product.width - this.product.cornerRadius * 2) * 2;
            let heightSum = (this.product.height - this.product.cornerRadius * 2) * 2;
            let cornerRadius = Number((2 * Math.PI * this.product.cornerRadius).toFixed(0));
            console.log("widthSum: ", widthSum, "heightSum: ", heightSum, "cornerRadius: ", cornerRadius);
            this.product.cutAtSheet = Number(((widthSum + heightSum + cornerRadius) / 1000 * this.product.amountAtSheet).toFixed(2));
        }
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

    applyConditions({ isSizeChanged, isCuttingTypeChanged }) {

        if (isSizeChanged || isCuttingTypeChanged) {
            this.amountInput.min = this.product.amountAtSheet;
            this.amountInput.value = this.product.amountAtSheet;
            this.amountInput.step = this.product.amountAtSheet;
            this.amountInput.max = this.product.amountAtSheet * 50;
            this.product.targetStickerAmount = this.product.amountAtSheet;
            this.product.sheetsAtPrintingRun = 1;
        }
        if (this.product.width < 50 || this.product.height < 50 && this.cuttingTypeSelect.children.length == 3) {
            this.cuttingTypeSelect.children[2].disabled = true;
        } else if (this.product.width >= 50 || product.height >= 50) {
            this.cuttingTypeSelect.children[2].disabled = false;
        }
        if (this.product.cutType === "KISS_CUT_A4") {
            this.widthInput.min = 5;
            this.widthInput.max = 297;
            this.heightInput.min = 5;
            this.heightInput.max = 297;
            if (this.widthInput.value > 210) {
                this.heightInput.max = 210;
                this.widthInput.max = 297;
            }
            if (this.heightInput.value > 210) {
                this.widthInput.max = 210;
                this.heightInput.max = 297;
            }
        }
        if (this.product.cutType === "DIE_CUT") {
            this.cornerRadiusInput.max = 250;
            this.cornerRadiusInput.min = 50;
        }
        if (this.product.cutType === "KISS_CUT_A3" && this.cornerRadiusInput.max !== 300) {
            this.widthInput.min = 5;
            this.widthInput.max = 420;
            this.heightInput.min = 5;
            this.heightInput.max = 420;
            if (this.widthInput.value > 297) {
                this.heightInput.max = 297;
                this.widthInput.max = 420;
            }
            if (this.heightInput.value > 297) {
                this.widthInput.max = 297;
                this.heightInput.max = 420;
            }
        }
        if (Number(this.widthInput.value) < Number(this.heightInput.value)) {
            this.cornerRadiusInput.max = Math.floor(this.widthInput.value / 2);
        } else {
            this.cornerRadiusInput.max = Math.floor(this.heightInput.value / 2);
        }

        if (this.product.material === "TRANSPARENT_WHITE" || this.product.material === "TRANSPARENT_FOIL") {
            this.cuttingTypeSelect.children[0].disabled = true;
            this.cuttingTypeSelect.children[1].selected = true;
            this.cuttingTypeSelect.children[2].disabled = true;
            this.widthInput.max = 210;
            this.heightInput.max = 297;
        } else {
            this.cuttingTypeSelect.children[0].disabled = false;
            this.cuttingTypeSelect.children[2].disabled = false;
        }
        // isSizeChanged = false;
        // isCuttingTypeChanged = false;
    }

    calculate(product) {
        this.product = product;
        this.product.amountAtSheet = this.getAmountAtSheet();
        this.product.cutAtSheet = this.getCutAtSheet();
        this.product.finishTime = this.calculateTime();
        super.calculateProduct(product);
        return this.product;
    }
}