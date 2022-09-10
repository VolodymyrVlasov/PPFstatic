const input = document.getElementById("input")


const inputNumber = ({ node, min, max, step, dispatch }) => {
    let value = Number(node.value)
 
    const changeAmount = (operation) => {
        step = !step ? step : 1
        min = !min ? min : 1
        max = !max ? max : 1000
        node.min = min
        node.max = max
        node.step = step
        if (operation === "minus" && value > Number(node.min)) {
            value -= Number(node.step)
        } else if (operation === "plus" && value < Number(node.max)) {
            value += Number(node.step)
        }
        node.value = Number(value)
        if (dispatch != undefined) {
            dispatch()
        }
    }

    node.parentElement.addEventListener("click", (e) => {
        switch (e.target.id) {
            case "amount-minus":
                changeAmount("minus")
                break
            case "amount-plus":
                changeAmount("plus")
                break
        }
    })

    return { value, min, max, step, dispatch }
}

const exampleInput = inputNumber({ node: input, min: 1, max: 1000, step: 100 })