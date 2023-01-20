let currentCapacity = document.querySelector("#current-capacity") // новий обраний об'єм для вставки innerText
let currentColor = document.querySelector("#current-color") // новий обраний колір
let productPrice = document.querySelector('#product-price') // нова вартість
let productsCapacity = document.querySelector("#product-capacity") 
let capacityValue = 330; // стартовий об'єм
let colorValue = "white"; // стартовий колір
let colorSet = document.querySelector("#color-set") // all existing colors
let webp = document.querySelector("#webp");
let jpeg = document.querySelector("#jpeg");
let orderButton = document.querySelector("#order-button")

productsCapacity.addEventListener("click", function (e) {
    if (e.target.value) {

        for (let li of productsCapacity.children) { // remove selection from other capacity button
            li.classList.remove("selected");
        }
        e.target.classList.add("selected");

        capacityValue = e.target.value;
        nonListedColors(getCapacity())
        render(getCapacity(), colorValue);
    }

})

colorSet.addEventListener("click", function (e) {
    let elem = e.target.getAttribute("data-color")
    if (elem) {
        colorValue = elem;
        render(getCapacity(), colorValue);
    }
})


function nonListedColors(selectedCapacity) {
    let allColors = []; // all colors from colorSet
    let colorList = []; // colors from selected Capacity
    let noneColorSet = []; // colors out of colorSet range

    for (let item of selectedCapacity) {
        colorList.push(item.color)
    }
   
    for (let item of colorSet.children) {
        allColors.push(item.getAttribute('data-color'))
    }

    allColors.forEach(el => {
        if (!colorList.includes(el)) noneColorSet.push(el);
        
    })

    
    for (let li of colorSet.children) {
        if (noneColorSet.includes(li.getAttribute('data-color'))) {
            li.classList.add('hidden-color');
        } else {
            li.classList.remove('hidden-color')
        }
    }


    if(!colorList.includes(colorValue)) colorValue = "white"
}


function getCapacity() {
    if (capacityValue == 180) return capacity180;
    if (capacityValue == 330) return capacity330;
    if (capacityValue == 425) return capacity425;
}


function render(val, color) {

    val.forEach(element => {
        if (element.color == color) {
            currentCapacity.innerText = element.value + " мл";
            currentColor.innerText = element.name;
            productPrice.innerText = element.price + " грн";
            webp.srcset = `https://www.paperfox.com.ua/wp-content/uploads/${element.img}.webp`;
            jpeg.src = `https://www.paperfox.com.ua/wp-content/uploads/${element.img}.jpeg`;
            orderButton.href = `https://www.paperfox.com.ua/product/${element.link}`;
        }
    });


}



const capacity180 = [
    {
        value: 180,
        color: "white",
        name: "Білий",
        img: "2017/02/mug-print-180-white",
        price: 140,
        link: "mug-white-180"
    },
    {
        value: 180,
        color: "orange",
        name: "Помаранчевий",
        img: "2017/05/mug-print-mini-orange",
        price: 140,
        link: "mug-orange-mini"
    },
    {
        value: 180,
        color: "yellow",
        name: "Жовтий",
        img: "2017/05/mug-print-mini-yellow",
        price: 140,
        link: "mug-yellow-mini"
    },
    {
        value: 180,
        color: "red",
        name: "Червоний",
        img: "2017/05/mug-print-mini-red",
        price: 140,
        link: "mug-red-mini"
    },
    {
        value: 180,
        color: "pink",
        name: "Рожевий",
        img: "2017/05/mug-print-mini-pink",
        price: 140,
        link: "mug-pink-mini"
    },
    {
        value: 180,
        color: "blue",
        name: "Фіолетовий",
        img: "2017/05/mug-print-mini-blue",
        price: 140,
        link: "mug-blue-mini"
    },
    {
        value: 180,
        color: "light-blue",
        name: "Блакитний",
        img: "2017/05/mug-print-mini-light-blue",
        price: 140,
        link: "mug-light-blue-mini"
    },
    {
        value: 180,
        color: "light-green",
        name: "Салатовий",
        img: "2017/05/mug-print-mini-light-green",
        price: 140,
        link: "mug-light-green-mini"
    },
    {
        value: 180,
        color: "green",
        name: "Зелений",
        img: "2017/05/mug-print-mini-green",
        price: 140,
        link: "mug-green-mini"
    },
    {
        value: 180,
        color: "black",
        name: "Чорний",
        img: "2017/05/mug-print-mini-black",
        price: 140,
        link: "mug-black-mini"
    },
    // {
    //     value: 180,
    //     color: "maroon",
    //     name: "Білий",
    //     img: "2017/02/mug-print-180-white",
    //     price: 140,
    //     link: "mug-white-180"
    // }
]

const capacity330 = [
    {
        value: 330,
        color: "white",
        name: "Білий",
        img: "2015/06/mug-print-310-white",
        price: 140,
        link: "mug-white"
    },
    {
        value: 330,
        color: "orange",
        name: "Помаранчевий",
        img: "2015/06/mug-print-310-inner-orange",
        price: 150,
        link: "mug-orange-"


    },
    {
        value: 330,
        color: "yellow",
        name: "Жовтий",
        img: "2015/06/mug-print-310-inner-yellow",
        price: 150,
        link: "mug-yellow-"

    },
    {
        value: 330,
        color: "red",
        name: "Червоний",
        img: "2015/06/mug-print-310-inner-red",
        price: 150,
        link: "mug-red-"

    },
    {
        value: 330,
        color: "pink",
        name: "Рожевий",
        img: "2015/06/mug-print-310-inner-pink",
        price: 150,
        link: "mug-pink-"

    },
    {
        value: 330,
        color: "light-blue",
        name: "Блакитний",
        img: "2015/06/mug-print-310-inner-light-blue",
        price: 150,
        link: "mug-light-blue-"

    },
    {
        value: 330,
        color: "blue",
        name: "Фіолетовий",
        img: "2015/06/mug-print-310-inner-blue",
        price: 150,
        link: "mug-blue-"

    },
    {
        value: 330,
        color: "green",
        name: "Зелений",
        img: "2015/06/mug-print-310-inner-green",
        price: 150,
        link: "mug-green-"

    },
    {
        value: 330,
        color: "light-green",
        name: "Салатовий",
        img: "2015/06/mug-print-310-inner-light-green",
        price: 150,
        link: "mug-llight-green-"

    },
    {
        value: 330,
        color: "black",
        name: "Чорний",
        img: "2015/06/mug-print-310-inner-black",
        price: 150,
        link: "mug-black-"
    },
    {
        value: 330,
        color: "maroon",
        name: "Бордовий",
        img: "2015/06/mug-print-310-inner-maroon",
        price: 150,
        link: "mug-maroon-"
    },
    {
        value: 330,
        color: "chameleon-black",
        name: "Чорний хамелеон",
        img: "2015/06/mug-print-310-hameleon-black",
        price: 300,
        link: "mug-hameleon-black-310"
    },
    {
        value: 330,
        color: "chameleon-blue",
        name: "Синій хамелеон",
        img: "2015/06/mug-print-310-hameleon-blue",
        price: 300,
        link: "mug-hameleon-blue"
    },
    {
        value: 330,
        color: "chameleon-red",
        name: "Червоний хамелеон",
        img: "2015/06/mug-print-310-hameleon-red",
        price: 300,
        link: "mug-hameleon-red"
    }
]

const capacity425 = [
    {
        value: 425,
        color: "white",
        name: "Білий",
        img: "2015/06/mug-print-425-white",
        price: 200,
        link: "mug-white-xl"
    },
    {
        value: 425,
        color: "yellow",
        name: "Жовтий",
        img: "2017/02/mug-print-yellow-425",
        price: 200,
        link: "mug-yellow-xl"
    },
    {
        value: 425,
        color: "orange",
        name: "Помаранчевий",
        img: "2017/02/mug-print-orange-425",
        price: 200,
        link: "mug-orange-xl"

    },

    {
        value: 425,
        color: "red",
        name: "Червоний",
        img: "2017/02/mug-print-red-425",
        price: 200,
        link: "mug-red-xl"
    },
    {
        value: 425,
        color: "pink",
        name: "Рожевий",
        img: "2017/02/mug-print-pink-425",
        price: 200,
        link: "mug-pink-xl"
    },
    {
        value: 425,
        color: "light-blue",
        name: "Блактиний",
        img: "2017/02/mug-print-light-blue-425",
        price: 200,
        link: "mug-light-blue-xl"
    },
    {
        value: 425,
        color: "blue",
        name: "Фіолетовий",
        img: "2017/02/mug-print-blue-425",
        price: 200,
        link: "mug-blue-xl"
    },
    {
        value: 425,
        color: "green",
        name: "Зелений",
        img: "2017/02/mug-print-green-425",
        price: 200,
        link: "mug-green-xl"
    },
    {
        value: 425,
        color: "light-green",
        name: "Салатовий",
        img: "2017/02/mug-print-light-green-425",
        price: 200,
        link: "mug-light-green-xl"
    },
    {
        value: 425,
        color: "black",
        name: "Чорний",
        img: "2017/02/mug-print-black-425",
        price: 200,
        link: "mug-blaCK-xl"
    },
    {
        value: 425,
        color: "maroon",
        name: "Бордовий",
        img: "2017/02/mug-print-maroon-425",
        price: 200,
        link: "mug-maroon-xl"
    }

]