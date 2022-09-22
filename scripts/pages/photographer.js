//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getPhotographers() {

    let getJson = fetch("./data/photographers.json");
    getJson = getJson.then(response => {
        return  response.json();
    })


    const photographers = await getJson.then(json => json.photographers);

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function getMedia() {

    let getJson = fetch("./data/photographers.json");
    getJson = getJson.then(response => {
        return  response.json();
    })


    const media = await getJson.then(json => json.media);

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayData(photographers) {
    const photographersHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersHeader.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    await displayData(photographers);
}

init().then(r => r);