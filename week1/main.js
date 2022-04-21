function convertToJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("bad response");
    }
}

function getData(url, callback) {
    fetch(url)
        .then(convertToJson)
        .then((data) => {
            console.log(data);
            if(callback) {
                callback(data);
            }
        });
}

// getData("https://pokeapi.co/api/v2/type");

window.addEventListener("load", function () {
    getData("https://pokeapi.co/api/v2/type", renderTypeList);
    document
        .getElementById("typeList")
        .addEventListener("click", typeClickedHandler);
});

function renderTypeList(list) {
    const element = document.getElementById("typeList");
    const cleanList = cleanTypeList(list.results);

    cleanList.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name}`;
        li.setAttribute("data-url", item.url);
        element.appendChild(li);
    });
}

function typeClickedHandler(event) {
    console.log(event.target);
    console.log("current:", event.currentTarget);
    const selectedType = event.target;

    const url = selectedType.dataset.url;

    setActive(url);

    getData(url, renderPokeList);
}

function renderPokeList(list) {
    const element = document.getElementById("pokeList");
    element.innerHTML = "";
    list.pokemon.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.pokemon.name}`;
        li.setAttribute("data-url", item.pokemon.url);
        element.appendChild(li);
    });
}

function setActive(type) {
    const allTypes = document.querySelectorAll(".types > li");
    allTypes.forEach((item) => {
        if (item.dataset.url === type) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    })
}

function cleanTypeList(list) {
    return list.filter((item) => item.name != "shadow" && item.name != "unknown");
}