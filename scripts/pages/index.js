    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        let getJson = fetch('./Front-End-Fisheye/data/photographers.json');
        getJson = getJson.then(response => {
            return  response.json();
        })


        const photographers = await getJson.then(json => json.photographers);

        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]
        })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        await displayData(photographers);
    }
    
    init().then(r => r);
    