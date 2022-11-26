const xRange = document.getElementById("range-x");
const yRange = document.getElementById("range-y");
const content = document.getElementById("content");
const wrapper = document.getElementById("wrapper");

const resizer = document.getElementById("resizer");
const rotator = document.getElementById("rotator");

let initialWidth = Number(content.offsetWidth);
let initialHeight = Number(content.offsetHeight);
const aspectRatio = +(initialWidth / initialHeight).toFixed(4);

let isMouseDown = false;
let initialRotation;

const Type = { WIDTH: "width", HEIGHT: "height" }

const PDO = {
    width: Number(content.offsetWidth),
    height: Number(content.offsetHeight),
    aspectRatio: aspectRatio,
}


xRange.addEventListener("input", (e) => changeSize({ type: Type.WIDTH, value: Number(e.target.value) }));
yRange.addEventListener("input", (e) => changeSize({ type: Type.HEIGHT, value: Number(e.target.value) }));
rotator.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    initialRotation = calcDeg(e) * -1;
    window.addEventListener("mousemove", rotate, true);
})

window.addEventListener("mouseup", () => {
    console.log("mouseup", window);
    window.removeEventListener("mousemove", rotate, true);
    isMouseDown = false;
})

function rotate(e) {
    wrapper.style.transform = 'rotate(' + (initialRotation + calcDeg(e)) + 'deg)';
}

function changeSize({ type, value }) {
    if (type === Type.WIDTH) {
        PDO.width = initialWidth + Number(value);
        PDO.height = PDO.width / PDO.aspectRatio;
    }
    if (type === Type.HEIGHT) {
        PDO.height = initialHeight + Number(value);
        PDO.width = PDO.height * PDO.aspectRatio;
    }
    content.style.height = PDO.height + "px";
    content.style.width = PDO.width + "px";
}

function calcDeg(mouse) {
    if (isMouseDown) {
        const centerPointX = +(window.getComputedStyle(content).transformOrigin).split(" ")[0].replace("px", "");
        const centerPointY = +(window.getComputedStyle(content).transformOrigin).split(" ")[1].replace("px", "");

        let radians = Math.atan2(mouse.x - centerPointX, mouse.y - centerPointY);
        let degrees = (radians * (180 / Math.PI) * -1) + 180;

        console.log({ y: mouse.y, x: mouse.x, centerPointY, centerPointX, deg: degrees });
     
        return degrees;
        // content.style.transform = 'rotate(' + degrees + 'deg)';
    }
}
