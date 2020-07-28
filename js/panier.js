// Variables document HTML
var ordersElt = document.getElementById("ordersTable");
var totalOrdersElt = document.getElementById("totalOrders");
var sumOrders = document.getElementById("sumOrders");

// Initialisation de la variable pour le montant global
var totalPrice = 0;

function getBasket() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  // Si panier vide
  if (basket == null) {
    var tr = document.createElement("tr");
    tr.textContent = "Votre panier est vide";
    ordersElt.insertBefore(tr, totalOrdersElt);
  } else {
    // Sinon récupère les données des produits présents dans le panier
    for (var product of basket) {
      ajaxGet("http://localhost:3000/api/teddies" + "/" + product.id).then(function (response) {
        var product = JSON.parse(response);
        var basketProduct = basket.find((p) => p.id == product._id);
        totalPrice += product.price * basketProduct.qty;
        sumOrders.textContent = totalPrice / 100 + " €";
        localStorage.setItem("totalPrice", totalPrice);
        pickUpOrders(product, basketProduct.qty);
      }).catch(function (error) {
        console.error('Erreur lors de la récupération des données produit pour constituer le panier, ' + error);
      })
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

var form = document.getElementById("contactForm");
var emailValid = false;
//var validationError = false;

// Alerte saisie des données email
form.elements[2].addEventListener("blur", function (e) {
  if (!/.+@.+\..+/.test(form.elements[2].value)) {
    if (!form.elements[2].classList.contains("bg-danger")) {
      form.elements[2].classList.add("bg-danger");
      document.getElementById('errorEmail').textContent = 'Veuillez entrer une adresse e-mail valide';
      emailValid = false;
    }
  } else {
    form.elements[2].classList.remove("bg-danger");
    form.elements[2].classList.add("bg-success");
    document.getElementById('errorEmail').textContent = '';
    emailValid = true;
  }
});

// Clic sur le bouton de confirmation de commande
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var data;
  var contact = {};
  var products = [];
  // Validation des données avant envoi au serveur
  if (emailValid) {
    contact = {
      firstName: form.elements[1].value,
      lastName: form.elements[0].value,
      address: form.elements[3].value,
      city: form.elements[4].value,
      email: form.elements[2].value,
    };
    var basket = JSON.parse(localStorage.getItem("basket"));
    for (var product of basket) {
      products.push(product.id);
    }
    data = JSON.stringify({ contact, products });
    ajaxPost("http://localhost:3000/api/teddies/order", data).then(function (response) {
      localStorage.removeItem('basket');
      localStorage.setItem("serverResponse", response);
      window.location.href = '/confirmation.html';
    }).catch(function (error) {
      console.error('Erreur lors de la requête POST d\'envoi des données au serveur, ' + error);
    });
  } /*else {
    // Création d'espace pour message d'erreur
    if (!validationError) {
      var error = document.createElement("p");
      error.classList.add("text-danger");
      error.classList.add("p-2");
      error.textContent = "Tous les champs ne sont pas corrects";
      form.insertBefore(error, document.getElementById("button"));
    }
    validationError = true; 
  } */
});