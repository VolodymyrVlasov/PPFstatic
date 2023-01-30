
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
                    <li class="slider__picture_array_cnt">
                        <input type="radio" name="picture_array" id="slider_slide_${index}" ${index === 0 ? "checked" : ""}">
                        <label for="slider_slide_${index}">
                            <video src="${slide}" width="65" heigt="65" class="slider__picture_array_img">
                        </label>
                    </li>`
                );
            }
            return (`
                <li class="slider__picture_array_cnt">
                    <input type="radio" name="picture_array" id="slider_slide_${index}" ${index === 0 ? "checked" : ""}">
                    <label for="slider_slide_${index}"> 
                        <img src="${slide}" alt="${slide}" class="slider__picture_array_img">
                    </label>
                </li>`
            )
        }).join(""));
    }

    PrevButton(foo) {
        const button = document.createElement("button");
        button.className = "slider__button_next";
        button.type = "button";
        button.id = "mug_slider_prev_btn";
        button.ariaLabel = "Попередній слайд";
        button.innerHTML = `
                <svg class="" width="16" height="40" aria-hidden="true">
                    <path class="slider__arrow"
                        d="M13.18,39.64a1,1,0,0,0,.57-.17A1.05,1.05,0,0,0,14.07,38L2.52,19.86,14.07,1.63A1.06,1.06,0,0,0,12.28.49L0,19.86,12.28,39.15A1.06,1.06,0,0,0,13.18,39.64Z" />
                </svg>  `;
        return button.outerHTML;
    }

    NextButton(foo) {
        const button = document.createElement("button");
        button.className = "slider__button_next";
        button.type = "button";
        button.id = "mug_slider_next_btn";
        button.ariaLabel = "Наступний слайд";
        button.innerHTML = `
            <svg width="16" height="40" aria-hidden="true">
                <path class="slider__arrow"
                    d="M1.06,39.64a1,1,0,0,1-.57-.17A1.05,1.05,0,0,1,.17,38L11.72,19.86.17,1.63A1.05,1.05,0,0,1,.49.17,1.06,1.06,0,0,1,2,.49L14.24,19.86,2,39.15A1.06,1.06,0,0,1,1.06,39.64Z" />
            </svg>`;
        return button.outerHTML;
    }

    handlePrevButton() {
        const arr = document.getElementsByName("picture_array");
        const slides = document.querySelector(".slider__slides");

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].checked == true) {
                if (i > 0) {
                    arr[i - 1].checked = true;
                    break;
                }
                if (i === 0) {
                    slides.style.transition = null;
                    slides.style.transform = "translateX(-100%)";
                    setTimeout(() => {
                        slides.style.transform = null;
                        slides.style.transition = "all ease 1s";
                        arr[arr.length - 1].checked = true;
                    }, 1);
                    break;
                }
            }
        }
    }

    handleNextButton() {
        const arr = document.getElementsByName("picture_array");
        const slides = document.querySelector(".slider__slides");

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].checked == true) {
                if (i < arr.length - 1) {
                    slides.style.transition = "all ease 1s";
                    arr[i + 1].checked = true;
                    break;
                }
                if (i == arr.length - 1) {
                    slides.style.transition = null;
                    slides.style.transform = "translateX(33.3%)";
                    setTimeout(() => {
                        slides.style.transform = null;
                        slides.style.transition = "all ease 1s";
                        arr[0].checked = true;
                    }, 1);
                    break;
                }
            }
        }
    }

    updateSlider(product) {
        this.slider.innerHTML = `
                <div class="slider__display">
                        ${this.PrevButton()}
                        <div class="slider__slides_cnt">
                            <div class="slider__slides">
                                ${this.Slide(product)}
                            </div>
                        </div>
                        ${this.NextButton()}
                </div>
                <ul class="slider__picture_array">
                    ${this.SlideArray(product)}
                </ul>`;

        document.getElementById("mug_slider_prev_btn")?.addEventListener("click", this.handlePrevButton);
        document.getElementById("mug_slider_next_btn")?.addEventListener("click", this.handleNextButton);
        const firstElement = document.getElementsByName("picture_array")[0];
        if (firstElement) {
            firstElement.checked = true;
        }
    }
}
