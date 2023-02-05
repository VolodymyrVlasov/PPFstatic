import { PRINTRUN_INDEXES } from "../Prices.js";

const Days = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 0,
    DAY_IN_DAY_HOUR: 13,
    FINISH_TIME: "18:00"
}

const TEST_PRODUCT = {
    type: "CUP",
    prodTime: [1, 1, 2, 2, 2, 3, 4, 6, 12, 16],
    amount: 2,
}

export class Time {
    applyConditions({ prodTimeArray, printrunAmount }) {
        if (prodTimeArray && printrunAmount) {
            for (let i = PRINTRUN_INDEXES.length; i != 0; i--) {
                if (printrunAmount >= PRINTRUN_INDEXES[i]) {
                    this.days += prodTimeArray[i];
                }
            }
        }
    }

    getTime(prodTimeArray, printrunAmount) {
        this.date = new Date();
        this.days = 0;
        if (prodTimeArray && printrunAmount) {
            this.applyConditions({ prodTimeArray, printrunAmount })
        }
        if (this.date.getDay() >= Days.MONDAY && this.date.getDay() <= Days.FRIDAY && this.date.getHours() < Days.DAY_IN_DAY_HOUR) {
            this.days = 0;
            console.log("case \"DAY DAY\"");
        }
        if (this.date.getDay() >= Days.MONDAY && this.date.getDay() < Days.FRIDAY
            && this.date.getHours() > Days.DAY_IN_DAY_HOUR || this.date.getDate() === Days.SUNDAY) {
            this.days += 1;
            console.log("case \"NEXT DAY\"");
        } else {
            if (this.date.getDay() === Days.FRIDAY && this.date.getHours() > Days.DAY_IN_DAY_HOUR) {
                this.days += 3;
                console.log("case \"FRI TO MON\"");
            }
            if (this.date.getDate() === Days.SATURDAY) {
                this.days += 2;
                console.log("case \"SAT TO MON\"");
            }
        }

        this.date.setDate(this.date.getDate() + this.days);
        const finishDate = this.date.toLocaleString("uk-UA", { day: "numeric", month: "long" });
        return `${finishDate} ${Days.FINISH_TIME}`;
    }
}