const KEY = "eXIHrJAkubsw7jiCMS7F1br99x5N9Rfs";

const lista = document.querySelector(".lista");
const form = document.querySelector(".form");

const search = document.querySelector(".search");

form.firstElementChild.value = "";

const llamarAPI = (searchKey, limit) => {
    let fetchURL = `https://api.giphy.com/v1/gifs/trending?api_key=${KEY}&limit=${limit}`;
    lista.innerHTML = "";
    search.innerHTML = "";

    if (searchKey.length > 1) {
        fetchURL = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&limit=${limit}&q="${searchKey}"`;
        search.innerHTML = `<span class="color">${limit}</span> first results for <span class="color">${searchKey}</span>`
    }

    console.log(`fetch url:`, fetchURL);
    fetch(fetchURL)
        .then(response => response.json())
        .then(response => {
            let gifs = response.data;
            console.log("gifs fetched:", gifs);

            gifs.forEach(gif => {
                lista.innerHTML += `
                <li class="card">
                    <img class="responsive" src=${gif.images.downsized_medium.url} alt="" >
                </li>
            `;
            });
        })
        .catch(error => console.log("error: ", error));
};

let limit = 5;
let checkboxes = document.querySelectorAll(".radio");
checkboxes.forEach(el => {
    el.addEventListener("click", e => {
        limit = e.target.value;
        console.log("limit is now:", limit);
    });
});

llamarAPI("", limit);

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("input value:", e.target.firstElementChild.value);
    let searchKey = e.target.firstElementChild.value;
    e.target.firstElementChild.value = "";

    llamarAPI(searchKey, limit);
});
