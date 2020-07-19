// Variables document HTML

var productElt = document.getElementById("product");

// Récupération de l'ancre

var path = window.location.hash.substr(1);

function pickUpProduct(response) {
  var product = JSON.parse(response);

  // Création de la carte produit
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("m-5");
  card.classList.add("shadow");
  productElt.appendChild(card);

  // Création de la photo
  var photo = document.createElement("img");
  photo.src = product.imageUrl;
  photo.classList.add("card-img-top");
  photo.classList.add("rounded");
  card.appendChild(photo);

  // Création corps de carte
  var body = document.createElement("div");
  body.classList.add("card-body");
  card.appendChild(body);

  // Création du titre
  var title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = product.name;
  body.appendChild(title);

  // Création du prix
  var price = document.createElement("p");
  price.textContent = "Prix : " + product.price / 100 + " €"; // !!!!!!! prix = Solution facile
  body.appendChild(price);

  // Création description
  var description = document.createElement("p");
  description.textContent = product.description;
  body.appendChild(description);

  // Création du formulaire (Choix de couleur)

  var form = document.createElement('form');
  body.appendChild(form);
  var p = document.createElement('p');
  form.appendChild(p);
  var label = document.createElement('label');
  label.setAttribute('for', 'color');
  label.textContent = 'Couleur disponible :';
  p.appendChild(label);
  var select = document.createElement('select');
  select.classList.add('form-control');
  select.setAttribute('name','color');
  select.id = 'color';
  p.appendChild(select);

  // Création de la première option par défaut

  var optionDefault = document.createElement('option');
  optionDefault.value = 'default';
  optionDefault.textContent = 'Choisir sa couleur';
  optionDefault.setAttribute('selected', 'selected');
  select.appendChild(optionDefault);

  // Boucle parcourant les couleurs disponibles

  for (let i = 0; i < product.colors.length; i++) {
      var color = product.colors[i];
      var option = document.createElement('option')
      option.textContent = color;
      option.value = color;
      select.appendChild(option);      
  }

  // Création du lien vers la page produit
  var linkBuy = document.createElement("a");
  linkBuy.href = "produit.html#" + product._id;
  linkBuy.id = product._id; // !!!!!!! ID ou HREF pour les liens produits ??
  linkBuy.classList.add('card-text');
  linkBuy.classList.add('float-right');
  linkBuy.textContent = 'Ajouter au panier';
  body.appendChild(linkBuy);

  // Création espace pour message d'erreur
  var error = document.createElement("div");
  error.id = "errorProduct";
  body.appendChild(error);
}

ajaxGet("http://localhost:3000/api/teddies" + "/" + path, pickUpProduct);
