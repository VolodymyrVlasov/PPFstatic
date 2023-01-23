const calculator = document.getElementById("mug_calculator");
const productCapacityListContainer = document.getElementById("mug_calculator__product_capacity");
const productColorListContainer = document.getElementById("mug_calculator__color_set");
const orderLinkBtn = document.getElementById("order_link_btn");


const products = {};
const selectedProduct = {
    productType: "MUG",
    capacity: 330,
    color: "white",
    price: 140,
    URL: "mug-white"
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

const renderCapacity = () => {
    productCapacityListContainer.innerHTML = Object.values(products).map((value) => {
        return `
        <li class="radio_capacity_wrapper" title="чашка міні об'ємом ${value[0].capacity} мл">
            <input type="radio" name="capacity" 
                    value="${value[0].capacity}" 
                    id="capacity_${value[0].capacity}"
                    ${value[0].capacity == selectedProduct.capacity ? "checked" : ""}>
             <label for="capacity_${value[0].capacity}" 
             class="radio_capacity text_14__gray">${value[0].capacity} мл</label>
        </li>`
    }).join("")
}

const renderColors = () => {
    productColorListContainer.innerHTML = Object.values(products).map(array => {
        if (array[0].capacity === selectedProduct.capacity) {
            return array.map(mug => {
                return `
                    <li title="${mug.color}" itemprop="color" content="${mug.color}" class="color_picker_wrapper">
                        <input type="radio" name="color" value="${mug.colorValue}" id="color_${mug.colorValue}"
                        ${mug.colorValue === selectedProduct.color ? "checked" : ""}>
                        <label for="color_${mug.colorValue}" class="color_picker ${mug.colorValue}" aria-label="${mug.color}"></label>
                    </li>`
            }).join("");
        }
    }).join("");
}

const addActionLink = () => {
    orderLinkBtn.href = products[`_${selectedProduct.capacity}`]
        .find(item => item.colorValue === selectedProduct.color).URL;
}

await loadProductData()

// setTimeout(() => { renderCapacity(); renderColors(); }, 200);

calculator.addEventListener("click", (e) => {
    const currentType = e.target.name;
    const currentValue = e.target.value

    switch (currentType) {
        case "color":
            selectedProduct.color = currentValue;
            addActionLink();
            break;

        case "capacity":
            selectedProduct.capacity = Number(currentValue);
            renderColors();
            addActionLink();
            break;
    }

})