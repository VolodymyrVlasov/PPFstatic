import { Time } from "../../../src/utils/Time.js";
import { CapacityPicker } from "./CapacityPicker.js";
import { ColorPicker } from "./ColorPicker.js";
import { ImageSlider } from "./ImageSlider.js";

const calculator = document.getElementById("mug_calculator");
const productCapacityListContainer = document.getElementById("mug_calculator__product_capacity");
const productColorListContainer = document.getElementById("mug_calculator__color_set");
const nameLabel = document.getElementById("mug_calculator_details_name");
const capacityLabel = document.getElementById("mug_calculator_details_capacity");
const colorLabel = document.getElementById("mug_calculator_details_color");
const priceLabel = document.getElementById("mug_calculator_details_price");
const dateLabel = document.getElementById("mug_calculator_details_date");
const orderLinkBtn = document.getElementById("order_link_btn");

const slider = new ImageSlider({ containerSelector: "#mug_slider" })
const prodTimer = new Time();

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

await loadProductData();

const ProductLink = (product) => {
    const url = products[`_${product.capacity}`]
        .find(item => item.colorValue === product.colorValue).URL;
    return `https://www.paperfox.com.ua/product/${url}`;
}

const FindProduct = (product) => {
    const result = {
        ...products[`_${product.capacity}`]?.find(item => item.colorValue === product.colorValue)
    };
    return result.colorValue ? result : undefined;
}

const calculate = () => {
    selectedProduct = FindProduct(selectedProduct);
    if (!selectedProduct) {
        selectedProduct = {
            ...selectedProduct,
            colorValue: defaultProduct?.colorValue,
            capacity: defaultProduct?.capacity
        };
        selectedProduct = FindProduct(selectedProduct);
    }
    productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
    slider.updateSlider(selectedProduct);
    orderLinkBtn.href = ProductLink(selectedProduct);
    nameLabel.innerText = selectedProduct.name;
    colorLabel.innerText = selectedProduct.color;
    capacityLabel.innerText = selectedProduct.capacity + " мл."
    priceLabel.innerText = selectedProduct.price[0] + " грн."
    dateLabel.innerText = prodTimer.getTime();
}

setTimeout(() => {
    productCapacityListContainer.innerHTML = CapacityPicker(products, defaultProduct);
    productColorListContainer.innerHTML = ColorPicker(products, defaultProduct);
    calculate()
}, 200);

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
            defaultProduct.capacity = Number(currentValue);
            selectedProduct.capacity = Number(currentValue);
            productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
            isProductChanged = !isProductChanged;
            break;
    }

    if (isProductChanged) {
        calculate();
        isProductChanged = !isProductChanged;
    }
})