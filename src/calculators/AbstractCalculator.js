import { PRINTRUN_INDEXES } from "../Prices.js";

export class AbstractCalculator {
    constructor(basicProduct) {
        if (this.constructor.name === 'AbstractCalculator') {
            throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
        }
        this.product = basicProduct;
    }

    printPrice(price) {
        this.printPrice = price;
    }

    cutPrice(price) {
        this.cutPrice = price;
    }

    getPriceIndex(printRunAmount) {
        for (let index = 0; index < PRINTRUN_INDEXES.length; index++) {
            if (index + 1 >= PRINTRUN_INDEXES.length) return PRINTRUN_INDEXES.length - 1;
            if (printRunAmount < PRINTRUN_INDEXES[0]) return 0;
            if (printRunAmount >= PRINTRUN_INDEXES[index] && printRunAmount < PRINTRUN_INDEXES[index + 1]) return index;
        }
    }

    getCutAtPrintingRun() {
        this.product.cutAtPrintingRun = Math.ceil(this.product.cutAtSheet * this.product.sheetsAtPrintingRun);
        return this.product.cutAtPrintingRun;
    }

    getSheetsAtPrintingRun() {
        this.product.sheetsAtPrintingRun = Math.ceil(this.product.targetAmount / this.product.amountAtSheet);
        return this.product.sheetsAtPrintingRun;
    }

    getPrintingPrice() {
        this.product.printingPrice = this.product.sheetsAtPrintingRun * this.printPrice[this.product.material][this.getPriceIndex(this.product.sheetsAtPrintingRun)];
        return this.product.printingPrice;
    }

    getCutingPrice() {
        this.product.cutingPrice = Math.ceil(this.product.cutAtPrintingRun * this.cutPrice[this.product.cutType][this.getPriceIndex(this.product.cutAtPrintingRun)]);
        return this.product.cutingPrice;
    }

    getTotalPrice() {
        this.product.totalPrice = Math.ceil(this.product.cutingPrice + this.product.printingPrice);;
        return this.product.totalPrice;
    }

    getSummaryAmount() {
        this.product.totalAmount = this.product.amountAtSheet * this.product.sheetsAtPrintingRun;
        return this.product.totalAmount
    }

    calculateProduct() {
        this.product.sheetsAtPrintingRun = this.getSheetsAtPrintingRun();
        this.product.cutAtPrintingRun = this.getCutAtPrintingRun();
        this.product.printingPrice = this.getPrintingPrice(this.product.printPriceList);
        this.product.cutingPrice = this.getCutingPrice(this.product.cutPriceList);
        this.product.summaryStickerAmout = this.getSummaryAmount();
        this.product.totalPrice = this.getTotalPrice();
        return this.product;
    }
}