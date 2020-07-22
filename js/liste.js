// Variables document HTML

var listElt = document.getElementById('list-products');

// Fonction créant la structure de la page liste
function pickUpList(response) {
    var products = JSON.parse(response);
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        // Création de la carte produit
        var card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-5');
        card.classList.add('shadow');
        listElt.appendChild(card);

        // Création du lien vers la page produit
        var linkImage = document.createElement('a');
        linkImage.href =  "produit.html#" + product._id;
        linkImage.id = product._id;            // !!!!!!! ID ou HREF pour les liens produits ??
        card.appendChild(linkImage);

        // Création de la photo
        var photo = document.createElement('img');
        photo.src = product.imageUrl;
        photo.classList.add('card-img-top');
        photo.classList.add('rounded');
        linkImage.appendChild(photo);

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

ajaxGet("http://localhost:3000/api/teddies", pickUpList); 
