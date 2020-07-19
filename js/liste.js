// Variables document HTML

var list = document.getElementById('list-products');

// Fonction de récupération des données

function ajaxGet(url, callback) {

var request = new XMLHttpRequest();
request.open('GET', url);
    request.addEventListener('load', function () {

        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
        } else {
            console.error(request.status + " " + request.statusText + " " + url);
        }
    });
    request.addEventListener('error', function () {

        console.error("erreur réseau avec l'url " + url);
    });
    request.send();
};

// Fonction utilisation des données

function pickUp(response) {
    var products = JSON.parse(response);
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        // Création de la carte produit
        var card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-5');
        card.classList.add('shadow');
        list.appendChild(card);

        // Création du lien vers la page produit
        var lienImage = document.createElement('a');
        lienImage.href = product._id;
        lienImage.id = product._id;            // !!!!!!! ID ou HREF pour les liens produits ??
        card.appendChild(lienImage);

        // Création de la photo
        var photo = document.createElement('img');
        photo.src = product.imageUrl;
        photo.classList.add('card-img-top');
        photo.classList.add('rounded');
        lienImage.appendChild(photo);

        // Création corps de carte
        var body = document.createElement('div');
        body.classList.add('card-body');
        card.appendChild(body);

        // Création du titre
        var title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = product.name;
        body.appendChild(title);

        // Création du prix
        var price = document.createElement('p');
        price.textContent = 'Prix : ' + (product.price/100) + ' €';  // !!!!!!! prix = Solution facile 
        body.appendChild(price);

        // Création description
        var description = document.createElement('p');
        description.textContent = product.description;
        body.appendChild(description);
    }
}

ajaxGet("http://localhost:3000/api/teddies", pickUp); 
