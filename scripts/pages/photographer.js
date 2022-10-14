
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
    like.setAttribute('aria-label', "Nombre total de likes");
    like.classList.add('total-like');
    like.textContent = totalLikes;
    like.appendChild(logoLike);

    const prix = document.createElement('span');
    prix.setAttribute('aria-label', "Prix");
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

    // On récupère uniquement les données du photographe qui à comme ID celui qui est en paramètre de lien
    const photographers = json.filter((item) => item.id.toString() === idPhotographer);

    // On récupère le tarif du photographe
    photographerPrix = photographers[0].price;

    return ({
        photographers: [...photographers]
    })
}

// Fonction qui récupère les médias des photographes
async function getMedia() {

    const json = await getJson.then(json => json.media);

    // On récupère uniquement les média du photographe qui à comme ID celui qui est en paramètre de lien
    const media = json.filter((item) => item.photographerId.toString() === idPhotographer);

    // On boucle sur les médias
    for (let i = 0; i < media.length; i++) {
        // Pour récupérer le nombre total de like
        totalLikes += media[i].likes;
    }

    // Cette fois on retourne les médias
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

        // On insère avant le bouton de contact l'article
        buttonContact.parentNode.insertBefore(userCardDOM.article, buttonContact);

    });


    // On crée une fonction qui affichera les médias triés d'un photographe
    function displayMediaSorting() {

        if (selectSorting.value === 'popularity') {

            tab2.sort(function(a, b) {
                return b.likes - a.likes;
            });

        } else if (selectSorting.value === 'title') {

            tab2.sort(function compare(a, b) {
                if (a.title < b.title) {
                    return -1;
                }

                if (a.title > b.title ) {
                    return 1;
                }

                return 0;
            });

        } else if (selectSorting.value === 'date') {

            tab2.sort(function compare(a, b) {
                if (a.date < b.date) {
                    return 1;
                }

                if (a.date > b.date ) {
                    return -1;
                }

                return 0;
            });

        }

        // On efface tous les médias pour afficher les médias triés
        listMedia.innerHTML = '';

        tab2.forEach((media) => {

            // eslint-disable-next-line no-undef
            const photographerMedia = mediaFactory(media, photographerName);
            const userMediaDOM = photographerMedia.getUserMediaDOM();
            listMedia.appendChild(userMediaDOM);

        });

        // On appel la fonction qui affichera le nombre total de like et le prix
        likePrix();


        const logoLikes = document.querySelectorAll('.like i');

        // On boucle sur tous les boutons j'aime
        logoLikes.forEach(e => {

            // Pour ajouter un évènement au clique de la souris
            e.addEventListener('click', function () {
                const deleted = document.querySelector('.like-prix');

                // Si on aime la photo
                if (this.classList.contains('liked') ) {

                    // On ajoute un j'aime au nombre total de like
                    totalLikes++;

                // Si on aime plus la photo
                } else {

                    // On retire un j'aime au nombre total de like
                    totalLikes--;

                }

                // On supprime l'affichage du nombre total de like et du prix
                deleted.remove();

                // Puis on rappelle sa fonction pour le ré-afficher avec le nouveau nombre total de like
                likePrix();

            });
        });

    }

    // On appel la fonction qui affiche les médias triés d'un photographe
    displayMediaSorting();

    // On ajoute un évènement qui si le menu select du tri des médias change, on rappel la fonction displayMediaSorting
    selectSorting.addEventListener('change', displayMediaSorting);

}


async function init() {
    const { photographers } = await getPhotographers();
    const { media } = await getMedia();

    await displayData(photographers, media);
}

init().then(r => r);

