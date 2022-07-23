
const product = {
    width: 40,
    height: 60,
    amount: 1,
    material: "RitramaMatte",
    quality: "1440p",
    price: 210
}

const accordion = (elem) => {
    document.addEventListener('click', (e) => {
        const target = e.target
        if (!target.matches(elem + ' .a-btn')) return
        else {
            if (!target.parentElement.classList.contains('active')) {
                let elementList = document.querySelectorAll(elem + ' .a-container')
                elementList.forEach((e) => {
                    e.classList.remove('active')
                });
                target.parentElement.classList.add('active')
            } else {
                target.parentElement.classList.remove('active')
            }
        }
    }, {passive: true})
}

accordion('.accordion')

const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const customRange = (id, thumbSize, initValue) => {
    const inputCnt = document.getElementById(id)
    let inputNode = inputCnt.lastElementChild
    const labelNode = inputCnt.firstElementChild
    const thumbHalfSize = thumbSize * 0.5
    const from = Number(inputNode.min)
    const to = Number(inputNode.max)

    const changeRangeUI = () => {
        const inputWidth = Math.floor(inputNode.offsetWidth)
        const value = Number(inputCnt.lastElementChild.value) || initValue
        labelNode.innerHTML = String(value)
        const labelCenterX = labelNode.offsetWidth * 0.5
        let gradientPosition = map(value, from, to, 0, 100)
        let labelPosition = map(value, from, to, 0, inputWidth)
        labelPosition = (value > to * 0.5) ?
            labelPosition - map(value, to * 0.5, to, labelCenterX, thumbSize + 1)
            :
            labelPosition - map(value, from, to * 0.5, labelCenterX - thumbHalfSize, labelCenterX)
        inputNode.style.background = `linear-gradient(90deg, var(--color-theme) ${gradientPosition}%, var(--color-light-gray) ${gradientPosition}%)`
        labelNode.style.transform = `translateX(${labelPosition}px)`
    }

    changeRangeUI()
    inputCnt.addEventListener("input", () => changeRangeUI())
}

const price = {
    RitramaMatte: {
        "720p": [210, 160, 130],
        "1440p": [260, 210, 190]
    },
    RitramaGlossy: {
        "720p": [210, 160, 130],
        "1440p": [260, 210, 190]
    },
    RitramaBlackout: {
        "720p": [340, 300, 250],
        "1440p": [390, 350, 290]
    },
    RitramaTransparent: {
        "720p": [210, 160, 130],
        "1440p": [250, 200, 180]
    }
}

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
        case "quality":
            product.quality = target.value
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

const changeAmount = (operation) => {
    const amountInput = document.getElementById("amount")
    let value = Number(amountInput.value)
    if (operation === "minus" && value > 1) {
        value--
    } else if (operation === "plus" && value < 100) {
        value++
    }
    amountInput.value = product.amount = Number(value)
    calculatePrice()
}

document.getElementById("calculator").addEventListener("click", (e) => {
    const target = e.target
    switch (target.id) {
        case "amount-minus":
            changeAmount("minus")
            break
        case "amount-plus":
            changeAmount("plus")
            break
    }
})

customRange("input-height", 32, 40)
customRange("input-width", 32, 60)


