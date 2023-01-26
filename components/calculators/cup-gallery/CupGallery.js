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
    productType: "MUG",
    capacity: 330,
    color: "white",
    price: 140,
    // URL: "mug-white"
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

await loadProductData()

calculator.addEventListener("click", (e) => {
    const currentType = e.target.name;
    const currentValue = e.target.value

    switch (currentType) {
        case "color":
            selectedProduct.color = currentValue;
            orderLinkBtn.href = ProductLink();
            break;
        case "capacity":
            selectedProduct.capacity = Number(currentValue);
            productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
            orderLinkBtn.href = ProductLink();
            break;
    }

    const o = products[`_${selectedProduct.capacity}`]
        .find(item => item.colorValue === selectedProduct.color);

    slider.updateSlider(o);
    // ImageSlider({ containerSelector: "#mug_slider", product: o })
})