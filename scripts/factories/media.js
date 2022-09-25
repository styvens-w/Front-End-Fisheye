function mediaFactory(data, photographer) {

    const {id, photographerId, title, image, video, likes, date, price} = data;
    const photographerName = photographer;
    const name = photographerName.substring(0, photographerName.indexOf(' '));
    let media;

    function getUserMediaDOM() {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const vid = document.createElement('video');
        const titl = document.createElement('p');
        const like = document.createElement('span');
        const logoLike = document.createElement('i');

        titl.classList.add('title');
        titl.textContent = title;

        like.textContent = likes;
        like.classList.add('like');
        logoLike.className = 'logoLike fa-solid fa-heart';

        like.appendChild(logoLike);
        titl.appendChild(like);

        if (image) {

            media = `assets/photographers/${name}/${image}`;
            img.setAttribute("src", media);
            img.classList.add('media');
            article.appendChild(img);

        } else if (video) {

            const extension = video.split('.').pop();
            const div = document.createElement('div');

            media = `assets/photographers/${name}/${video}`;

            div.classList.add('play-button');
            article.style.position = "relative"

            vid.setAttribute("src", media);
            vid.setAttribute("type", `video/${extension}`);
            vid.setAttribute("preload", "metadata");
            vid.classList.add('media');
            article.appendChild(vid);
            article.appendChild(div);

        }

        article.appendChild(titl);

        return (article);
    }

    return {id, photographerId, title, image, video, likes, date, price, getUserMediaDOM}
}