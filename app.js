const products = {};
const cnt = document.getElementById("aaa");

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

 loadProductData();

setTimeout(() => {
    const row = document.createElement("div");
    row.classList = "row big_gap";

    Object.values(products).map(cups => {
        let col = document.createElement("div");
        col.classList = "col small_gap";
        col.innerHTML = cups.map(cup => {
            return  `
                    <a href="https://www.paperfox.com.ua/product/${cup.URL}" target="_blank">${cup.name}</a>
                    `
        }).join("");
        row.innerHTML += col.outerHTML;
    }).join("");
    cnt.innerHTML += row.outerHTML;
}, 1000);

setTimeout(() => {
    const row = document.createElement("div");
    row.classList = "row big_gap";

    Object.values(products).map(cups => {
        let col = document.createElement("div");
        col.classList = "col small_gap";
        col.innerHTML = cups.map(cup => {
            let r = document.createElement("div");
            r.classList = "row small_gap";
            r.innerHTML = cup.images.map(image => {
                return  `
                    <img style="width: 40px; height:40px" src="${image}"/>
                    `
            }).join("");
            return r.outerHTML;
        }).join("");
        row.innerHTML += col.outerHTML;
    }).join("");
    cnt.innerHTML += row.outerHTML;
}, 1000);