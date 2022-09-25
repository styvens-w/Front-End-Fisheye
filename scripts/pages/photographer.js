//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let idPhotographer = params.get('id');

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

async function displayData(tab1, tab2) {
    const photographersHeader = document.querySelector(".photograph-header");
    const photographersHeaderBefore = document.querySelector(".photograph-header .contact_button");
    const listMedia = document.querySelector(".list-media");
    let photographerName;

    tab1.forEach((photographer) => {

        if (photographer.id.toString() === idPhotographer) {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographerName = photographerModel.name;
            photographersHeader.appendChild(userCardDOM.img);
            photographersHeaderBefore.parentNode.insertBefore(userCardDOM.article, photographersHeaderBefore);
        }

    });

    tab2.forEach((media) => {
        if (media.photographerId.toString() === idPhotographer) {
            const photographerMedia = mediaFactory(media, photographerName);
            const userMediaDOM = photographerMedia.getUserMediaDOM();
            listMedia.appendChild(userMediaDOM);
        }

    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    await displayData(photographers, media);
}

init().then(r => r);


const arrow = document.querySelector(".mediaSorting label span");
const select = document.getElementById("mediaSorting");

select.addEventListener("click", function () {
    if(arrow.style.transform === "rotate(270deg)") {

        arrow.style.transform = "rotate(90deg)";

    } else {
        arrow.style.transform = "rotate(270deg)";
    }

})