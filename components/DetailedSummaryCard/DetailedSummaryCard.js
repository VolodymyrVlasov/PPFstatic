export const DetailedSummaryCard = ({ product }) => {

    return `
        <div class="col big_gap calculator_summary_cards">     
            <button type="button" id="detailed_price_btn" class="summary_details_btn"
                aria-label="Більше інформації про розрахунок"
                title="Більше інформації про розрахунок">+</button>
            <div class="row big_gap width_100">
                <div class="col gap flex_1">
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Наліпок на аркуші ${product.cutType == "KISS_CUT_A4" ? "А4:" : "А3:"}</span>
                        <strong class="text_12__gray">${product.cutType == "KISS_CUT_A4" ? product.amountAtSheet / 2 : product.amountAtSheet} шт</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Аркушів у накладі:</span>
                        <strong class="text_12__gray">${product.sheetsAtPrintingRun} шт</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Метрів порізки у накладі:</span>
                        <strong class="text_12__gray">${product.cutAtPrintingRun} мп</strong>
                    </div>
                </div>
                <div class="col gap flex_1">
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Вартість друку:</span>
                        <strong class="text_12__gray">${product.printingPrice} грн</strong>
                    </div>
                    <div class="row_sp_btw width_100 border_bottom">
                        <span class="text_12__gray">Вартість порізки:</span>
                        <strong class="text_12__gray">${product.cutingPrice} грн</strong>
                    </div>
                    <div class="row_sp_btw  width_100 border_bottom">
                        <span class="text_12__gray">Вартість 1 наліпки:</span>
                        <strong class="text_12__gray">${(product.totalPrice / (product.sheetsAtPrintingRun * product.amountAtSheet)).toFixed(2)} грн</strong>
                    </div>
                </div>
            </div> 
            <div class="row big_gap width_100">
                <div class="col gap flex_1">
                    <label for="prod-time">Готовність:</label>
                    <strong id="prod-time" class="link" title="Орієнтовні дата та час готовності, в залежності від особливостей макету, дати замовлення чи завантаженості виробництва можуть бути змінені">${product.finishTime}</strong>
                </div>

                <div class="col gap flex_1">
                    <label for="price">Варстіть:</label>
                    <strong id="price" class="price">${product.totalPrice} грн</strong>
                </div>
            </div>
        </div>`;
};