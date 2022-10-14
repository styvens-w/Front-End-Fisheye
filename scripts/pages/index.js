    async function getPhotographers() {

        // On récupère le json avec fetch
        let getJson = fetch("./data/photographers.json");
        getJson = getJson.then(response => {
            return  response.json();
        })

        // On stock les données des photographes dans une variable (tableau d'objet)
        const photographers = await getJson.then(json => json.photographers);

        // On retourne le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]
        })
    }

    // Fonction pour afficher les données qui prend en paramètre le tableau d'objet à afficher
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        // On boucle sur le paramètre (tableau d'objet)
        photographers.forEach((photographer) => {

            // On appel la fonction photographerFactory qui prend en paramètre chaque photographe pour la stocker dans une variable
            // eslint-disable-next-line no-undef
            const photographerModel = photographerFactory(photographer);

            // On récupère la carte d'un photographe qui correspond à ses éléments HTML
            const userCardDOM = photographerModel.getUserCardDOM();

            // Puis on l'ajoute à la section des photographes
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // On stocke dans un tableau les données récupérer dans le json
        const { photographers } = await getPhotographers();

        // Puis on appel la fonction qui affiche les données avec en paramètre le tableau
        await displayData(photographers);
    }


    init().then(r => r);