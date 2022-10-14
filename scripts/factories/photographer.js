// Fonction qui vas afficher les données de chaque photographe
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {

    // On stocke dans une variable le nom de la page sur laquelle on est
    const pageActuel = location.href.split("/").pop().split("?")[0];

    // On stocke dans un tableau les données reçues
    const { name, id, city, country, tagline, price, portrait } = data;

    // On stocke dans une variable le chemin d'accès à la photo de profil d'un photographe
    const picture = `assets/photographers/${portrait}`;

    // On crée un élément article qui contiendra les données d'un photographe
    const article = document.createElement( 'article' );

    // On crée la fonction qui contiendra les éléments HTML d'un photographe
    function getUserCardDOM() {

        // Élément pour la photo de profil
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de profile de " + name);

        // Élément pour le nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // Élément pour sa localisation
        const p = document.createElement('p');
        p.textContent = city + ', ' + country;
        p.classList.add('location');

        // Élément pour son slogan
        const p2 = document.createElement('p');
        p2.textContent = tagline;
        p2.classList.add('tagline');

        // Élément pour son tarif
        const p3 = document.createElement('p');
        p3.textContent = price + '€/jour';
        p3.classList.add('price');


        // Si la page actuel et la page d'accueil
        if (pageActuel === "index.html") {

            // Élément (lien) pour aller vers son profil
            const link = document.createElement('a');
            link.setAttribute("href", "photographer.html?id=" + id);

            link.setAttribute("aria-label", "Allez vers le profil de " + name);

            // On ajoute au lien sa photo de profil
            link.appendChild(img);
            // Et son nom
            link.appendChild(h2);

            // Puis on ajoute a l'article le lien, sa localisation, son slogan et son tarif
            article.appendChild(link);
            article.appendChild(p);
            article.appendChild(p2);
            article.appendChild(p3);

            // Et enfin on retourne l'article
            return (article);


            // Si la page actuel et la page d'un photographe
        } else if (pageActuel === "photographer.html") {

            img.setAttribute("alt", "Photo de profil de " + name);

            // On ajoute son nom au formulaire de contact
            const nameModal = document.querySelector('.modal .name');
            nameModal.innerHTML += '<br>' + name;


            // Cette fois on ajoute à article le nom, sa localisation et son slogan
            article.appendChild(h2);
            article.appendChild(p);
            article.appendChild(p2);

            // puis on retourne la photo de profil (qui sera utilisé dans un autre script) et l'article
            return {img, article};
        }

    }

    // On retourne les données et la fonction qui contient les éléments HTML d'un photographe
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}