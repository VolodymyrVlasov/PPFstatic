export const ColorPicker = (products, selectedProduct) => {
    return (Object.values(products).map(array => {
        if (array[0].capacity === selectedProduct.capacity) {
            return array.map(mug => {
                return `
                    <li title="${mug.color}" itemprop="color" content="${mug.color}" class="color_picker_wrapper">
                        <input type="radio" name="color" value="${mug.colorValue}" id="color_${mug.colorValue}"
                        ${mug.colorValue === selectedProduct.colorValue ? "checked" : ""}>
                        <label for="color_${mug.colorValue}" class="color_picker ${mug.colorValue}" aria-label="${mug.color}"></label>
                    </li>`
            }).join("");
        }
    }).join(""));
}