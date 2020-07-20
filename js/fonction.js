// Fonction de récupération des données

function ajaxGet(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function () {
      if (request.status >= 200 && request.status < 400) {
        callback(request.responseText);
      } else {
        console.error(request.status + " " + request.statusText + " " + url);
      }
    });
    request.addEventListener("error", function () {
      console.error("erreur réseau avec l'url " + url);
    });
    request.send();
  }

// Tableau des commandes
var orders = [];
// Boucle créant les différent objet de commande
function pickUp(response) {
    var products = JSON.parse(response);
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        var key = product._id;
        orders.push({id: key, quantity: 0})
    }
}

ajaxGet("http://localhost:3000/api/teddies", pickUp); 