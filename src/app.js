export const accordion = (elem) => {
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.matches(elem + ' .a_btn')) return;
        else {
            if (!target.parentElement.classList.contains('active')) {
                let elementList = document.querySelectorAll(elem + ' .a_container');
                elementList.forEach((e) => {
                    e.classList.remove('active');
                });
                target.parentElement.classList.add('active');
            } else {
                target.parentElement.classList.remove('active');
            }
        }
    }, {passive: true});
}

accordion('.accordion')

export const map = (x, inMin, inMax, outMin, outMax) => {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const customRange = (id, thumbSize, initValue) => {
    const inputCnt = document.getElementById(id);
    const inputNode = inputCnt.lastElementChild;
    const labelNode = inputCnt.firstElementChild;
    const thumbHalfSize = thumbSize * 0.5;

    const changeRangeUI = () => {
        const inputMin = Number(inputNode.min);
        const inputMax = Number(inputNode.max);
        const inputWidth = Math.floor(inputNode.offsetWidth);
        const inputValue = Number(inputCnt.lastElementChild.value) || initValue;
        labelNode.innerHTML = String(inputValue);
        const labelCenterX = labelNode.offsetWidth / 2;
        let gradientPosition = map(inputValue, inputMin, inputMax, 0, 100);
        let labelPosition = map(inputValue, inputMin, inputMax, thumbHalfSize - labelCenterX, inputWidth - thumbHalfSize - labelCenterX);
        inputNode.style.background = `linear-gradient(90deg, var(--color-theme) ${gradientPosition}%, var(--color-light-gray) ${gradientPosition}%)`;
        labelNode.style.transform = `translateX(${labelPosition}px)`;
    }

    changeRangeUI();
    inputCnt.addEventListener("input", () => changeRangeUI());
    return {changeRangeUI, labelNode, inputNode, inputCnt};
}




