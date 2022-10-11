const modal = document.getElementById("contact_modal");
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const contactBTN = document.querySelector('.contact_button');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');
const form = document.querySelector('.modal form');


// Regex pour le champ nom et prénom.
const name_regex = /^[A-zÀ-ú]+$/;

// Regex pour le champ email.
const mail_regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


// eslint-disable-next-line no-unused-vars
function displayModal() {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false')
    header.style.opacity = '0.5';
    header.setAttribute('aria-hidden', 'true');
    main.style.opacity = '0.5';
    main.setAttribute('aria-hidden', 'true');
    firstName.focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    header.style.opacity = '1';
    header.setAttribute('aria-hidden', 'false');
    main.style.opacity = '1';
    main.setAttribute('aria-hidden', 'false');
    contactBTN.focus();
}


function addError(element, message) {
    element.parentNode.setAttribute('data-error', message);
    element.parentNode.setAttribute('data-error-visible', true);

    return false;
}

function removeError(element) {
    element.parentNode.removeAttribute('data-error');
    element.parentNode.removeAttribute('data-error-visible');

    if (element === message) {
        console.log(element.previousSibling.previousSibling.previousSibling.textContent + ' : ' + element.value);
    } else {
        console.log(element.previousSibling.previousSibling.textContent + ' : ' + element.value);
    }

    return true;
}


function checkError(element, nbCharacters, message, regex) {
    if (regex) {

        if (element.value.length < nbCharacters || !regex.test(element.value)) {

            return addError(element, message);

        } else {

           return removeError(element);

        }

    } else {

        if (element.value.length < nbCharacters) {

            return addError(element, message);

        } else {

            return removeError(element);

        }
    }
}



// eslint-disable-next-line no-unused-vars
function validate() {

    console.clear();

    if (checkError(firstName, 2, 'Le champ prénom doit contenir au minimum 2 caractères', name_regex)
    &&
    checkError(lastName, 2, 'Le champ nom doit contenir au minimum 2 caractères', name_regex)
    &&
    checkError(email, 8, 'Le champ email doit contenir une adresse email valide', mail_regex)
    &&
    checkError(message, 10, 'Le champ message doit contenir au minimum 10 caractères')) {


        if (submit.textContent === "Fermer") {

            location.reload();

            return false;

        } else {

            // On décale les champs du formulaire à gauche pour les cacher.
            document.querySelectorAll('.formData').forEach(e => e.style.transform = "translateX(-9999px)");


            const formValidate = document.createElement("p");
            formValidate.classList.add("formValide");
            formValidate.textContent = "Votre message a bien été envoyé.";
            form.parentNode.insertBefore(formValidate, form);

            // On change la valeur du bouton du formulaire pour afficher "Fermer".
            submit.textContent = "Fermer";

            return false;

        }

    } else {

        return false;

    }
}

document.addEventListener('keydown', e => {
    if (modal.getAttribute('aria-hidden') === 'false' && e.code === 'Escape') {
        closeModal();
    }
})