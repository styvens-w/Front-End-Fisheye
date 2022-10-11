//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let idPhotographer = params.get('id');
const listMedia = document.querySelector(".list-media");
const selectSorting = document.getElementById('mediaSorting');
let photographerName;
let photographerPrix;
let totalLikes = 0;


// Fonction qui affichera le nombre total de likes et le prix d'un photographe
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

    photographerPrix = photographers[0].price;

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function getMedia() {

    const json = await getJson.then(json => json.media);
    const media = json.filter((item) => item.photographerId.toString() === idPhotographer);

    for (let i = 0; i < media.length; i++) {
        totalLikes += media[i].likes;
    }

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayData(tab1, tab2) {
    const photographersHeader = document.querySelector(".photograph-header");
    const buttonContact = document.querySelector(".photograph-header .contact_button");

    tab1.forEach((photographer) => {

        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerName = photographerModel.name;
        photographersHeader.appendChild(userCardDOM.img);
        buttonContact.parentNode.insertBefore(userCardDOM.article, buttonContact);

    });


    function displayMediaSorting() {
        if (selectSorting.value === 'popularity') {

            tab2.sort(function(a, b) {
                return b.likes - a.likes;
            });

        } else if (selectSorting.value === 'title') {

            tab2.sort(function compare(a, b) {
                if (a.title < b.title)
                    return -1;
                if (a.title > b.title )
                    return 1;
                return 0;
            });

        } else if (selectSorting.value === 'date') {

            tab2.sort(function compare(a, b) {
                if (a.date < b.date)
                    return 1;
                if (a.date > b.date )
                    return -1;
                return 0;
            });

        }

        listMedia.innerHTML = '';

        tab2.forEach((media) => {

            // eslint-disable-next-line no-undef
            const photographerMedia = mediaFactory(media, photographerName);
            const userMediaDOM = photographerMedia.getUserMediaDOM();
            listMedia.appendChild(userMediaDOM);

        });

        likePrix();


        const logoLikes = document.querySelectorAll('.like i');

        logoLikes.forEach(e => {
            e.addEventListener('click', function () {
                const deleted = document.querySelector('.like-prix');

                if (this.classList.contains('liked') ) {

                    totalLikes++;

                } else {

                    totalLikes--;

                }

                deleted.remove();

                likePrix();

            });
        });

    }

    displayMediaSorting();

    selectSorting.addEventListener('change', displayMediaSorting, false);

}


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();

    await displayData(photographers, media);
}

init().then(r => r);

