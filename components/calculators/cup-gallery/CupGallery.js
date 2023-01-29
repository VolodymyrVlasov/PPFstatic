import { CapacityPicker } from "./CapacityPicker.js";
import { ColorPicker } from "./ColorPicker.js";
import { ImageSlider } from "./ImageSlider.js";

const calculator = document.getElementById("mug_calculator");
const productCapacityListContainer = document.getElementById("mug_calculator__product_capacity");
const productColorListContainer = document.getElementById("mug_calculator__color_set");
const orderLinkBtn = document.getElementById("order_link_btn");
const slider = new ImageSlider({ containerSelector: "#mug_slider" })


const products = {};
let selectedProduct = {
    capacity: 330,
    colorValue: "white",
    color: "Білий", 
    name: "Чашка білa",
    images: [
        "/static/mugs/330/mug_330_ml_white_1.png",
        "/static/mugs/330/mug_330_ml_white_2.png",
        "/static/mugs/330/mug_330_ml_white_3.png"
    ],
    price: [
        140
    ],
    URL: "mug-white",
    articul: "",
    productType: "MUG"
}

const loadProductData = async () => {
    fetch("/data/mug_180.json")
        .then(data => data.json())
        .then(json => products._180 = json)
        .catch(error => console.log(error));

    fetch("/data/mug_330.json")
        .then(data => data.json())
        .then(json => products._330 = json)
        .catch(error => console.log(error));

    fetch("/data/mug_425.json")
        .then(data => data.json())
        .then(json => products._425 = json)
        .catch(error => console.log(error));
}

const ProductLink = () => {
    const url = products[`_${selectedProduct.capacity}`]
        .find(item => item.colorValue === selectedProduct.color).URL;
    return `https://www.paperfox.com.ua/product/${url}`;
}

setTimeout(() => {
    productCapacityListContainer.innerHTML = CapacityPicker(products, selectedProduct);
    productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
}, 200);

await loadProductData(); 
slider.updateSlider(selectedProduct);

calculator.addEventListener("click", (e) => {
    const currentType = e.target.name;
    const currentValue = e.target.value
    const id = e.target.id;
    let isSliderChange = false;

    switch (currentType) {
        case "color":
            selectedProduct.color = currentValue;
            orderLinkBtn.href = ProductLink();
            isSliderChange = !isSliderChange;
            break;
        case "capacity":
            selectedProduct.capacity = Number(currentValue);
            productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
            orderLinkBtn.href = ProductLink();
            isSliderChange = !isSliderChange;
            break;
    }

    if (isSliderChange) {
        const o = products[`_${selectedProduct.capacity}`]
            .find(item => item.colorValue === selectedProduct.color);

        slider.updateSlider(o);
        isSliderChange = !isSliderChange;
    }
})