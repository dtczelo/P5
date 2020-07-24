// Variables document HTML
var ordersElt = document.getElementById("ordersTable");
var totalOrdersElt = document.getElementById("totalOrders");
var sumOrders = document.getElementById("sumOrders");

// Initialisation de la variable pour le montant global
var totalPrice = 0;

function getBasket() {
  var basket = JSON.parse(sessionStorage.getItem("basket"));
  // Si panier vide
  if (basket == null) {
    var tr = document.createElement("tr");
    tr.textContent = 'Votre panier est vide';
    ordersElt.insertBefore(tr, totalOrdersElt);
  } else {
    // Sinon récupère les données des produits présents dans le panier
    for (var product of basket) {
      ajaxGet("http://localhost:3000/api/teddies" + "/" + product.id, function (response) {
        var product = JSON.parse(response);
        var basketProduct = basket.find((p) => p.id == product._id);
        totalPrice += product.price * basketProduct.qty;
        sumOrders.textContent = totalPrice / 100 + " €";
        sessionStorage.setItem('totalPrice', totalPrice);
        pickUpOrders(product, basketProduct.qty);
      });
    }
  }
}

// Fonction créant la structure du panier
function pickUpOrders(product, qty) {
  // Création de la ligne de tableau du panier
  var tr = document.createElement("tr");
  ordersElt.insertBefore(tr, totalOrdersElt);

  // Création de la case photo
  var casePhoto = document.createElement("td");
  tr.appendChild(casePhoto);
  var photo = document.createElement("img");
  photo.setAttribute("src", product.imageUrl);
  photo.setAttribute("width", "70");
  casePhoto.appendChild(photo);

  // Création de la case avec le nom du produit
  var title = document.createElement("td");
  title.textContent = product.name;
  tr.appendChild(title);

  // Création de la case de quantité
  var quantity = document.createElement("td");
  quantity.textContent = qty;
  tr.appendChild(quantity);

  // Création de la case de sous-total
  var oneProductTotal = document.createElement("td");
  oneProductTotal.classList.add("price");
  oneProductTotal.textContent = (qty * product.price) / 100 + " €";
  tr.appendChild(oneProductTotal);
}

getBasket();

// Requête d'envoi des données du formulaire au serveur

var form = document.getElementById("contactForm");

document.getElementById("button").addEventListener("click", function (e) {
  e.preventDefault;
  var data;
  var contact = {};
  var products = [];
  contact = {
    firstName: form.elements[1].value,
    lastName: form.elements[0].value,
    address: form.elements[2].value,
    city: form.elements[3].value,
    email: form.elements[4].value,
  };
  var basket = JSON.parse(sessionStorage.getItem("basket"));
  for (var product of basket) {
    products.push(product.id);
  }
  data = JSON.stringify({ contact, products });
  ajaxPost("http://localhost:3000/api/teddies/order", data, commandToSend);
});

function commandToSend(response) {
  sessionStorage.setItem('serverResponse', response)
}