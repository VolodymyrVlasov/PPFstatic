
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

customRange("input-height", 32, 40)
customRange("input-width", 32, 60)


