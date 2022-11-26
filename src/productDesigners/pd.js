import { PDObject, pdTypes } from "./AbstractPDObject.js";

const addDefObjBtn = document.getElementById("addDefObj");

const addImageBtn = document.getElementById("addImageBtn");
const addTextBtn = document.getElementById("addTextBtn");
const addClipartBtn = document.getElementById("addClipartBtn");


const artboard = document.getElementById("pd_artboard");
const workspace = document.getElementById("pd_workspace");

addImageBtn.addEventListener("click", addImage);
addTextBtn.addEventListener("click", addText);

function addImage() {
    const image = new PDObject(pdTypes.IMAGE, "../../static/stickers_diecut_header.png");
    artboard.appendChild(image.pdObject);
}

function addText() {
    // const text = new PDObject(pdTypes.TEXT, "sample");
    // artboard.appendChild(text.pdObject);
    console.log("test", artboard.querySelector(".test"));
}

function addClipart() {
    // open popup for pick clipart image
    // create ImagePDObject and add it to array
}

/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
                return;
            }
            if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
                return;
            }
            if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
                return;
            }

            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }

        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
}

// makeResizableDiv('.resizable')