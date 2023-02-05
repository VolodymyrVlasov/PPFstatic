export const CapacityPicker = (products, selectedProduct) => {
    return (Object.values(products).map((value) => {
        return `
        <li class="radio_capacity_wrapper" title="чашка міні об'ємом ${value[0].capacity} мл">
            <input type="radio" name="capacity" 
                    value="${value[0].capacity}" 
                    id="capacity_${value[0].capacity}"
                    ${value[0].capacity == selectedProduct.capacity ? "checked" : ""}>
             <label for="capacity_${value[0].capacity}" 
             class="radio_capacity">${value[0].capacity} мл</label>
        </li>`
    }).join(""));
}