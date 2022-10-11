const lightboxModal = document.getElementById('lightbox_modal');
const mediaLightbox = document.querySelector('.lightbox_center');
const allMedia = document.getElementsByClassName('media');
const closeBtn = document.querySelector('.lightbox_right .close');


function addMediaLightbox(elementClicked) {

    let newMedia = elementClicked.cloneNode(true);
    let newTitle = elementClicked.nextSibling.cloneNode(true);

    if (newMedia.tagName === 'VIDEO') {
        newMedia.setAttribute('controls', 'true');
        newTitle = elementClicked.nextSibling.nextSibling.cloneNode(true);
    }

    newMedia.alt = newTitle.textContent;
    newMedia.className = 'media_lightbox';
    newMedia.removeAttribute('onclick');
    newMedia.removeAttribute('lightbox');

    mediaLightbox.appendChild(newMedia);

    mediaLightbox.appendChild(newTitle);

}

// eslint-disable-next-line no-unused-vars
function openLightbox(element) {
    element.setAttribute('lightbox', 'true')
    mediaLightbox.innerHTML = "";

    // eslint-disable-next-line no-undef
    main.style.display = 'none';
    // eslint-disable-next-line no-undef
    main.setAttribute('aria-hidden', 'true');
    lightboxModal.style.display = 'block';
    lightboxModal.setAttribute('aria-hidden', 'false');

    addMediaLightbox(element);

}

function closeLightbox() {
    // eslint-disable-next-line no-undef
    main.style.display = 'block';
    // eslint-disable-next-line no-undef
    main.setAttribute('aria-hidden', 'false');
    lightboxModal.style.display = 'none';
    lightboxModal.setAttribute('aria-hidden', 'true');
}


function nextMedia() {

    for (let i = 0; i < allMedia.length; i++) {

        if (allMedia[i].getAttribute('lightbox') === 'true') {

            let nextMedia;
            let nextTitle;

            mediaLightbox.innerHTML = "";

            if (allMedia[i + 1]) {

                nextMedia = allMedia[i + 1].cloneNode(true);
                nextTitle = allMedia[i + 1].nextSibling.cloneNode(true);

                if (nextMedia.tagName === 'VIDEO') {
                    nextMedia.setAttribute('controls', 'true');
                    nextTitle = allMedia[i + 1].nextSibling.nextSibling.cloneNode(true);
                }

                allMedia[i + 1].setAttribute('lightbox', 'true');

            } else {

                nextMedia = allMedia[0].cloneNode(true);
                nextTitle = allMedia[0].nextSibling.cloneNode(true);

                if (nextMedia.tagName === 'VIDEO') {
                    nextMedia.setAttribute('controls', 'true');
                    nextTitle = allMedia[0].nextSibling.nextSibling.cloneNode(true);
                }

                allMedia[0].setAttribute('lightbox', 'true');

            }

            allMedia[i].removeAttribute('lightbox');

            nextMedia.alt = nextTitle.textContent;
            nextMedia.className = 'media_lightbox';
            nextMedia.removeAttribute('onclick');
            nextMedia.removeAttribute('lightbox');

            mediaLightbox.appendChild(nextMedia);
            mediaLightbox.appendChild(nextTitle);

            break;
        }
    }
}

function previousMedia() {

    for (let i = 0; i < allMedia.length; i++) {

        if (allMedia[i].getAttribute('lightbox') === 'true') {

            let previousMedia;
            let previousTitle;

            mediaLightbox.innerHTML = "";

            if (allMedia[i - 1]) {

                previousMedia = allMedia[i - 1].cloneNode(true);
                previousTitle = allMedia[i - 1].nextSibling.cloneNode(true);

                if (previousMedia.tagName === 'VIDEO') {
                    previousMedia.setAttribute('controls', 'true');
                    previousTitle = allMedia[i - 1].nextSibling.nextSibling.cloneNode(true);
                }

                allMedia[i - 1].setAttribute('lightbox', 'true');

            } else {

                previousMedia = allMedia[allMedia.length - 1].cloneNode(true);
                previousTitle = allMedia[allMedia.length - 1].nextSibling.cloneNode(true);

                if (previousMedia.tagName === 'VIDEO') {
                    previousMedia.setAttribute('controls', 'true');
                    previousTitle = allMedia[allMedia.length - 1].nextSibling.nextSibling.cloneNode(true);
                }

                allMedia[allMedia.length - 1].setAttribute('lightbox', 'true');

            }

            allMedia[i].removeAttribute('lightbox');

            previousMedia.alt = previousTitle.textContent;
            previousMedia.className = 'media_lightbox';
            previousMedia.removeAttribute('onclick');
            previousMedia.removeAttribute('lightbox');

            mediaLightbox.appendChild(previousMedia);
            mediaLightbox.appendChild(previousTitle);

            break;
        }
    }
}


closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
    const actualMedia = mediaLightbox.childNodes[0];

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Escape') {
        closeLightbox();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowLeft') {
        previousMedia();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'ArrowRight') {
        nextMedia();
    }

    if (lightboxModal.getAttribute('aria-hidden') === 'false' && e.code === 'Enter' && actualMedia.tagName === 'VIDEO') {

        if (actualMedia.currentTime < 0.01) {

            actualMedia.play();

        } else if (actualMedia.paused) {

            actualMedia.play();

        } else {
            actualMedia.pause();
        }
    }
})