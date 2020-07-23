// Variables document HTML
var ordersElt = document.getElementById("ordersTable");
var totalOrdersElt = document.getElementById("totalOrders");
var sumOrders = document.getElementById("sumOrders");

// Initialisation de la variable pour le montant global
var totalPrice = 0;

// Fonction créant la structure du panier
function pickUpOrders(response) {
  var products = JSON.parse(response);
  for (let i = 0; i < products.length; i++) {
    var product = products[i];
    for (let j = 0; j < sessionStorage.length; j++) {
      var orderId = sessionStorage.key(j);
      var orderQuantity = sessionStorage.getItem(orderId);
      if (orderId === product._id) {
        if (orderQuantity != 0 && orderQuantity !== "false") {
          // Création de la ligne de tableau du panier
          var tr = document.createElement("tr");
          ordersElt.insertBefore(tr, totalOrdersElt);

          // Création de la case photo
          var casePhoto = document.createElement("td");
          tr.appendChild(casePhoto);
          var photo = document.createElement("img");
          photo.setAttribute("src", product.imageUrl);
          photo.setAttribute("width", "100");
          casePhoto.appendChild(photo);

          // Création de la case avec le nom du produit
          var title = document.createElement("td");
          title.textContent = product.name;
          tr.appendChild(title);

          // Création de la case de quantité
          var qty = document.createElement("td");
          qty.textContent = orderQuantity;
          tr.appendChild(qty);

          // Création de la case de sous-total
          var oneProductTotal = document.createElement("td");
          oneProductTotal.classList.add("price");
          oneProductTotal.textContent =
            (orderQuantity * product.price) / 100 + " €";
          tr.appendChild(oneProductTotal);
        }
      }
    }
  }
  var priceElts = document.getElementsByClassName("price");
  for (let k = 0; k < priceElts.length; k++) {
    var priceElt = priceElts[k];
    var price = parseInt(priceElt.innerHTML, 10);
    totalPrice = totalPrice += price;
  }
  sumOrders.textContent = totalPrice + " €";
}

ajaxGet("http://localhost:3000/api/teddies", pickUpOrders);

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
  for (let i = 0; i < sessionStorage.length; i++) {
    var id = sessionStorage.key(i);
    if (
      sessionStorage.getItem(id) != 0 &&
      sessionStorage.getItem(id) !== "false"
    ) {
      products.push(id);
    }
  }
  data = JSON.stringify({ contact, products });
  ajaxPost('http://localhost:3000/api/teddies/order', data, commandToSend);
});

function commandToSend(response) {
   console.log(JSON.parse(response));
}