export const pdTypes = {
    IMAGE: "image",
    TEXT: "text",
    CLIPART: "clipart"
}

export class AbstractPDObject {
    constructor(...args) {
        this.args = args;
    }

    appendTools(element) {
        this.onMoveObject(element);
        this.onScaleObject(element);
    }

    onMoveObject({ elmnt }) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const elementDrag = (w) => {
            w = w || window.event;
            w.preventDefault();
            pos1 = pos3 - w.clientX;
            pos2 = pos4 - w.clientY;
            pos3 = w.clientX;
            pos4 = w.clientY;
            //Check if a right offset exists (will only be true
            //during the first time you drag it)
            if (elmnt.style.right != null && elmnt.style.right != "auto") {
                //calculate right offset
                var offsetright = window.innerWidth - elmnt.offsetLeft - elmnt.offsetWidth;
                //add the offset to the right of the element
                elmnt.style.right = (offsetright + pos1) + "px";
            }
            //end of change
            this.positionY = elmnt.offsetTop - pos2;
            this.positionX = elmnt.offsetLeft - pos1;

            elmnt.style.top = this.positionY + "px";
            elmnt.style.left = this.positionX + "px";
        }

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
            elmnt.style.right = "auto";
        }

        const dragMouseDown = (w) => {
            if (w.target.classList.contains("resizer")) return;
            w = w || window.event;
            w.preventDefault();

            pos3 = w.clientX;
            pos4 = w.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        elmnt.onmousedown = dragMouseDown;

    }

    onRemoveObject() {
    }

    onRotateObject() {
        console.log("onRotateObject")
    }

    onScaleObject({ element }) {
        // const element = document.querySelector(div);
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;


        const currentResizer = element.querySelector(".resizer");
        currentResizer.addEventListener('mousedown', (e) => {
            console.log("mousedown");
            e.preventDefault();
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        })

        function resize(e) {

            const width = Math.round(original_width + (e.pageX - original_mouse_x));
            const height = Math.round(original_height + (e.pageY - original_mouse_y));


            if (width > minimum_size) {
                element.style.zindex = "1000000";
                element.style.background = "red";
                element.style.width = `${width} + px !important`;
            }
            if (height > minimum_size) {
                element.style.height = height + 'px !important';
            }
            console.log(width, height, element);
            return;
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    }

    createPDImage(content) {
        const result = {
            data: {
                type: "image",
                positionX: 0,
                positionY: 0,
                width: 0,
                height: 50,
                aspectRatio: 0,
                rotate: 0,
                content: content,
            }
        }

        const imageData = new Image();
        const PDImage = document.createElement("div");
        const contentWrapper = document.createElement("div");
        const resizer = document.createElement("div");

        imageData.src = content;
        imageData.onload = () => {
            result.data.width = Number(imageData.naturalWidth);
            result.data.height = Number(imageData.naturalHeight);
            result.data.aspectRatio = Number(imageData.naturalHeight) / Number(imageData.naturalWidth);

            PDImage.style.height = `${re}`;
            PDImage.style.width = 200 * imageAttr.aspectRatio + "px";
        }


        // add styles
        PDImage.classList.add("resizable");
        contentWrapper.classList.add("resizers");
        contentWrapper.tabIndex = -1;
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-right");
        imageData.classList.add("pd_image");

        // append childs
        contentWrapper.appendChild(resizer);
        // contentWrapper.appendChild(imageData);
        PDImage.appendChild(contentWrapper);

        this.appendTools(PDImage);
        return PDImage;
    }

    createPDText(content) {
        const PDText = document.createElement("div");
        PDText.classList.add("resizable");
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("resizers");
        contentWrapper.tabIndex = -1;
        const resizer = document.createElement("div");
        resizer.classList.add("resizer");
        resizer.classList.add("bottom-right");
        const text = document.createElement("p");
        text.innerText = content;
        text.classList.add("pd_text");
        contentWrapper.appendChild(resizer);
        contentWrapper.appendChild(text);
        PDText.appendChild(contentWrapper);
        this.appendTools(PDText);
        return PDText;

    }

    createPDClipart(content) {

    }
}

export class PDObject extends AbstractPDObject {

    constructor(type, content) {
        super();
        this.type = type;
        this.createContent(content);
    }

    createContent(content) {
        switch (this.type) {
            case pdTypes.IMAGE:
                this.pdObject = super.createPDImage(content);
                break;
            case pdTypes.TEXT:
                this.pdObject = super.createPDText(content);
                break;
            case pdTypes.CLIPART:
                this.pdObject = super.createPDClipart(content);
                break;
            default:
                new Error(`Content type error -> ${this.type}, content -> ${content}`);
        }
    }
}
