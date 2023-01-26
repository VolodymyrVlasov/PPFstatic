
export class ImageSlider {
    constructor({ containerSelector, product }) {
        if (!containerSelector) {
            throw Error("Selector is not defined.");
        }
        this.counter = 0;
        this.slider = document.querySelector(containerSelector);
    }

    Slide(product) {
        return (product?.images?.map(slide => {
            if (slide.includes(".mp4")) {
                return (`
                    <div class="slider__slide_cnt">
                        <video src="${slide}" itemprop="video" id="mp4"
                            loading="lazy" decoding="async" width="484" heigt="484"
                            alt="Чашка біла 330 мл" description="замовити друк на чашках в Києві"
                            class="slider__slide_video">
                    </div>`
                );
            }

            return (`
                <div class="slider__slide_cnt">
                    <img src="${slide}" itemprop="image" id="jpeg"
                       
                        alt="Чашка біла 330 мл" description="замовити друк на чашках в Києві"
                        class="slider__slide_image">
                </div>`
            )
        }).join(""));
    }

    SlideArray(product) {
        return (product?.images?.map((slide, index) => {
            if (slide.includes(".mp4")) {
                return (`
                    <div class="slider__picture_array_cnt">
                        <input type="radio" name="picture_array" id="slider_slide_${index}">
                        <label for="slider_slide_${index}">
                            <video src="${slide}" width="65" heigt="65">
                        </label>
                    </div>`
                );
            }

            return (`
                <div class="slider__picture_array_cnt">
                    <input type="radio" name="picture_array" id="slider_slide_${index}">
                    <label for="slider_slide_${index}"> 
                        <img src="${slide}" alt="${slide}"  width="65" heigt="65">
                    </label>
                </div>`
            )
        }).join(""));
    }

    PrevButton() {
        return (`
            <button type="button" class="slider__button_next" id="mug_slider_prev_btn">
                <svg class="" width="16" height="40" aria-hidden="true">
                    <path class="slider__arrow"
                        d="M13.18,39.64a1,1,0,0,0,.57-.17A1.05,1.05,0,0,0,14.07,38L2.52,19.86,14.07,1.63A1.06,1.06,0,0,0,12.28.49L0,19.86,12.28,39.15A1.06,1.06,0,0,0,13.18,39.64Z" />
                </svg>
            </button>`
        )
    }

    NextButton(onclick, counter) {
        const button = document.createElement("button");
        button.className = "slider__button_next";
        button.type = "button";
        button.id = "mug_slider_next_btn";
        button.innerHTML = `
            <svg width="16" height="40" aria-hidden="true">
                <path class="slider__arrow"
                    d="M1.06,39.64a1,1,0,0,1-.57-.17A1.05,1.05,0,0,1,.17,38L11.72,19.86.17,1.63A1.05,1.05,0,0,1,.49.17,1.06,1.06,0,0,1,2,.49L14.24,19.86,2,39.15A1.06,1.06,0,0,1,1.06,39.64Z" />
            </svg>`;
        button.addEventListener("click", onclick(counter));
        return button;
    }

    handlePrevButton() {
        this.counter--;
        console.log(this.counter);
    }

    handleNextButton(counter) {
        console.log("next", this.counter, counter);
    }

    updateSlider(product) {
        this.slider.innerHTML = `
                <div class="slider__display">
                        ${this.PrevButton(this.handlePrevButton)}
                        <div class="slider__slides_cnt">
                            <div class="slider__slides">
                                ${this.Slide(product)}
                            </div>
                        </div>
                        ${this.NextButton(this.handleNextButton,  counter).outerHTML}
                    </div>
                    <div class="slider__picture_array">
                    ${this.SlideArray(product)}
                </div>`
    }
}
