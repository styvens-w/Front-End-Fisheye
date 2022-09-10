function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de profil de "+ portrait.replace(".jpg", "").replace(/([a-z])([A-Z])/g, '$1 $2'));

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

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(p2);
        article.appendChild(p3);

        return (article);
    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}