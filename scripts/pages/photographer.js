//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let idPhotographer = params.get('id');
const listMedia = document.querySelector(".list-media");
let photographerName;
let photographerPrix;
let totalLikes = 0;


function likePrix() {
    const logoLike = document.createElement('i');
    logoLike.className = 'logoLike fa-solid fa-heart';

    const like = document.createElement('span');
    like.classList.add('total-like');
    like.textContent = totalLikes;
    like.appendChild(logoLike);

    const prix = document.createElement('span');
    prix.classList.add('prix');
    prix.textContent = photographerPrix + '€ / jour'

    const likePrix = document.createElement('div');
    likePrix.classList.add('like-prix');
    likePrix.appendChild(like);
    likePrix.appendChild(prix);

    const main = document.querySelector('.main');
    main.appendChild(likePrix);

}


let getJson = fetch("./data/photographers.json");
getJson = getJson.then(response => {
    return  response.json();
})

async function getPhotographers() {

    const json = await getJson.then(json => json.photographers);
    const photographers = json.filter((item) => item.id.toString() === idPhotographer);

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function getMedia() {

    const json = await getJson.then(json => json.media);
    const media = json.filter((item) => item.photographerId.toString() === idPhotographer);

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}


async function displayData(tab1, tab2) {
    const photographersHeader = document.querySelector(".photograph-header");
    const buttonContact = document.querySelector(".photograph-header .contact_button");

    photographerPrix = tab1[0].price;

    for (let i = 0; i < tab2.length; i++) {
        totalLikes += tab2[i].likes;
    }

    tab1.forEach((photographer) => {

        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerName = photographerModel.name;
        photographersHeader.appendChild(userCardDOM.img);
        buttonContact.parentNode.insertBefore(userCardDOM.article, buttonContact);

    });

    tab2.forEach((media) => {

        const photographerMedia = mediaFactory(media, photographerName);
        const userMediaDOM = photographerMedia.getUserMediaDOM();
        listMedia.appendChild(userMediaDOM);

    });

    likePrix();

}





async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();
    await displayData(photographers, media);
}

init().then(r => r);