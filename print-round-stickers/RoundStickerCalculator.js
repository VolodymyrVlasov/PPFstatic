const RAFLATAC = 'RAFLATAC'
const RAFLATAC_MATTE = 'RAFLATAC_MATTE'
const RAFLATAC_GLOSS = 'RAFLATAC_GLOSS'
const RAFLATAC_FOIL = 'RAFLATAC_FOIL'
const RITRAMA_MATTE = 'RITRAMA_MATTE'
const RITRAMA_GLOSS = 'RITRAMA_GLOSS'
const RITRAMA_COATED = 'RITRAMA_COATED'
const TRANSPARED = 'TRANSPARED'
const TRANSPARED_MATTE = 'TRANSPARED_MATTE'
const TRANSPARED_WHITE = 'TRANSPARED_WHITE'
const TRANSPARED_FOIL = 'TRANSPARED_FOIL'
const VINE = 'VINE'
const PET = 'PET'


const price = {
    RitramaMatte: [210, 160, 130],
    RitramaGlossy: [210, 160, 130],
    RitramaBlackout: [340, 300, 250],
    RitramaTransparent: [210, 160, 130]
}

const product = {
    diameter: 50,
    material: "",
    cutType: "",
    amountAtSheet: 40,
    cutAtSheet: 1,
    sheetsAtPrintingRun: 1,
    cutAtPrintingRun: 100,
    printingPrice: 1,
    cutingPrice: 1,
    totalPrice: 1
}

document.getElementById("calculator").addEventListener("change", (e) => {
    const target = e.target
    switch (target.id) {
        case "input_range-height":
            product.height = Number(target.value)
            break
        case "input_range-width":
            product.width = Number(target.value)
            break
        case "material":
            product.material = target.value
            break
        case "cut":
            product.cutType = target.value
            break
        case "amount":
            if (Number(target.value) > 100) {
                target.value = product.amount = 100
            } else if (Number(target.value) <= 0) {
                target.value = product.amount = 1
            } else {
                product.amount = Number(target.value)
            }
            break
    }
    calculatePrice()
    calculateTime()
})

const calculatePrice = () => {
    const getPriceIndex = () => {
        if (product.printingSquare < 3) {
            return 0
        } else if (product.printingSquare >= 3 && product.printingSquare < 10) {
            return 1
        } else {
            return 2
        }
    }

    const getPrintingSquare = () => {
        console.clear()
        const ROLL = product.printingWidth = 100
        product.printingHeight = product.height
        const MIN_SQUARE = 0.5
        if (product.height > ROLL && product.amount > 1) {
            let pcsPerRoll = Math.floor(ROLL / product.width)
            if (pcsPerRoll <= product.amount) {
                product.printingHeight = product.height * Math.ceil(product.amount / pcsPerRoll)
            } else {
                product.printingHeight = product.height
            }
            product.printingSquare = Number(((product.printingHeight * product.printingWidth) / 10000).toFixed(2))
        } else if (product.height <= ROLL && product.width < product.height) {
            product.printingHeight = product.width
            product.printingSquare = ((product.printingWidth * product.printingHeight) / 10000 * product.amount).toFixed(2)
        } else {
            product.printingSquare = ((product.printingWidth * product.height) / 10000 * product.amount).toFixed(2)
        }
        product.printingSquare = product.printingSquare < MIN_SQUARE ? MIN_SQUARE : product.printingSquare
        return product.printingSquare
    }

    product.price = getPrintingSquare() * price[product.material][product.quality][getPriceIndex()]
    document.getElementById("price").innerText = `${product.price.toFixed(0)} грн`

    console.table(product)
}

const calculateTime = () => {
}