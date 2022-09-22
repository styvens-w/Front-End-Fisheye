function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;



    function getUserMediaDOM() {

        const article = document.createElement( 'article' );

        return (article);
    }

    return { id, photographerId, title, image, likes, date, price, getUserMediaDOM }
}