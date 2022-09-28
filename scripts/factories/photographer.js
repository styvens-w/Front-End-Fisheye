function photographerFactory(data) {
    const pageActuel = location.href.split("/").pop().split("?")[0];

    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const article = document.createElement( 'article' );

    function getUserCardDOM() {

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p = document.createElement('p');
        p.textContent = city + ', ' + country;
        p.classList.add('location')

        const p2 = document.createElement('p');
        p2.textContent = tagline;
        p2.classList.add('tagline')

        const p3 = document.createElement('p');
        p3.textContent = price + '€/jour';
        p3.classList.add('price')


        if (pageActuel === "index.html") {

            /* Accueil */
            const link = document.createElement('a');
            link.setAttribute("href", "photographer.html?id=" + id);

            link.setAttribute("aria-label", "Allez vers le profil de " + name);

            link.appendChild(img);
            link.appendChild(h2)
            article.appendChild(link);
            article.appendChild(p);
            article.appendChild(p2);
            article.appendChild(p3);

            return (article);

        } else if (pageActuel === "photographer.html") {

            img.setAttribute("alt", "Photo de profil de " + name);

            article.appendChild(h2);
            article.appendChild(p);
            article.appendChild(p2);

            return {img, article};

        }

    }


    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}