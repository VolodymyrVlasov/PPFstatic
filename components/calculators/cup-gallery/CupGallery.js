import { CapacityPicker } from "./CapacityPicker.js";
import { ColorPicker } from "./ColorPicker.js";
import { ImageSlider } from "./ImageSlider.js";

const calculator = document.getElementById("mug_calculator");
const productCapacityListContainer = document.getElementById("mug_calculator__product_capacity");
const productColorListContainer = document.getElementById("mug_calculator__color_set");
const orderLinkBtn = document.getElementById("order_link_btn");
const slider = new ImageSlider({ containerSelector: "#mug_slider" })

const products = {};

const defaultProduct = {
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
};

let selectedProduct = { ...defaultProduct };


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

const ProductLink = (product) => {
    const url = products[`_${product.capacity}`]
        .find(item => item.colorValue === product.colorValue).URL;
    return `https://www.paperfox.com.ua/product/${url}`;
}

setTimeout(() => {
    productCapacityListContainer.innerHTML = CapacityPicker(products, defaultProduct);
    productColorListContainer.innerHTML = ColorPicker(products, defaultProduct);
}, 200);

await loadProductData();
slider.updateSlider(defaultProduct);

calculator.addEventListener("click", (e) => {
    const currentType = e.target.name;
    const currentValue = e.target.value
    let isProductChanged = false;

    switch (currentType) {
        case "color":
            selectedProduct.colorValue = currentValue;
            isProductChanged = !isProductChanged;
            break;
        case "capacity":
            selectedProduct = {};
            selectedProduct.capacity = Number(currentValue);
            productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
            isProductChanged = !isProductChanged;
            break;
    }

    if (isProductChanged) {
        console.log("selectedProduct", selectedProduct)
        if (!selectedProduct.colorValue) {
            selectedProduct = {
                ...selectedProduct,
                colorValue: defaultProduct.colorValue
            };
            productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
        }

        selectedProduct = {
            ...products[`_${selectedProduct.capacity}`].find(item => item.colorValue === selectedProduct.colorValue)
        };
        slider.updateSlider(selectedProduct);
        orderLinkBtn.href = ProductLink(selectedProduct);
        isProductChanged = !isProductChanged;
    }
})