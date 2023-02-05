export const SummaryCard = ({ product }) => {
    const getTitle = () => {
        return `
        Наліпок на аркуші${product.cutType == "KISS_CUT_A4" ? ` А4:\t${product.amountAtSheet / 2}` : ` А3:\t${product.amountAtSheet}`}\t\tшт.
        Аркушів у накладі:\t\t${product.sheetsAtPrintingRun}\t\tшт.
        Метрів порізки:\t\t\t${product.cutAtPrintingRun}\t\tм.п.
        Вартість друку:\t\t\t${product.printingPrice}\t\tгрн.
        Вартість порізки:\t\t${product.cutingPrice}\t\tгрн.
        Вартість 1 наліпки.:\t\t${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)}\t\tгрн.
        Загальна вартість:\t\t${product.totalPrice}\t\tгрн.`;
    };

    return `
        <div  class="col big_gap calculator_summary_cards">     
            <button type="button" id="detailed_price_btn" class="summary_details_btn"
                aria-label="Більше інформації про розрахунок"
                title="Більше інформації про розрахунок">i</button> 
            <div class="col gap flex_1">
                <label for="prod-time">Готовність:</label>
                <strong id="prod-time"  class="link"
                title="Орієнтовні дата та час готовності, в залежності від особливостей макету, дати замовлення чи завантаженості виробництва можуть бути змінені">${product.finishTime}</strong>
            </div>
            <div class="col gap flex_1">
                <label for="price">Варстіть:</label>
                <strong id="price" class="price" title="${getTitle()}">${product.totalPrice} грн</strong>
            </div>
        </div>
        `;
};