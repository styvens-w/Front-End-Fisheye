// eslint-disable-next-line no-unused-vars
function mediaFactory(data, photographer) {

    let {id, photographerId, title, image, video, likes, date, price} = data;
    const photographerName = photographer;
    const name = photographerName.substring(0, photographerName.indexOf(' '));
    let media;


    function getUserMediaDOM() {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const vid = document.createElement('video');
        const titl = document.createElement('p');
        const like = document.createElement('p');
        const logoLike = document.createElement('i');
        let liked = false;


        function addMedia(type, element) {
            const link = document.createElement('a');

            media = `assets/photographers/${name}/${type}`;

            if (image) {type = 'photo'} else if (video) {type = 'vidéo'}

            logoLike.setAttribute('aria-label', 'Aimer la ' + type);

            element.setAttribute("src", media);
            element.setAttribute('alt', title);
            element.setAttribute('onclick', 'openLightbox(this)');
            element.classList.add('media');
            link.setAttribute('aria-label', 'Agrandir la ' + type);
            link.setAttribute('href', '#');
            link.setAttribute('onclick', 'openLightbox(this.firstElementChild)');
            link.appendChild(element);

            article.appendChild(link);
        }


        function addLike() {
            let type;
            if (image) {type = 'photo'} else if (video) {type = 'vidéo'}


            if (!liked) {
                liked = true;
                likes++;
                logoLike.classList.add('liked');
                logoLike.ariaLabel = 'Ne plus aimer la ' + type;
                like.textContent = likes;
                like.appendChild(logoLike);
            } else {
                liked = false;
                likes--;
                logoLike.classList.remove('liked')
                logoLike.ariaLabel = 'Aimer la ' + type;
                like.textContent = likes;
                like.appendChild(logoLike);
            }
        }


        if (image) {

            addMedia(image, img);

        } else if (video) {

            const extension = video.split('.').pop();
            const div = document.createElement('div');

            vid.setAttribute("type", `video/${extension}`);
            vid.setAttribute("preload", "metadata");



            article.style.position = "relative"
            div.classList.add('play-button');
            article.appendChild(div);
            addMedia(video, vid);

        }

        titl.classList.add('title');
        titl.textContent = title;

        logoLike.className = 'logoLike fa-solid fa-heart';
        logoLike.setAttribute('role', 'button');
        like.classList.add('like');
        like.textContent = likes;
        like.setAttribute('aria-label', 'Nombres de like');
        like.appendChild(logoLike);
        article.appendChild(titl);
        article.appendChild(like);

        logoLike.addEventListener('click', addLike);

        return (article);
    }



    return {id, photographerId, title, image, video, likes, date, price, getUserMediaDOM}
}

