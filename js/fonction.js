// Fonction de récupération des données serveur
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

// Fonction de récupération des données serveur
function ajaxPost(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
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
  request.send(data);
}

// Boucle créant les différent objet de commande dans la mémoire de session
function pickUp(response) {
  var products = JSON.parse(response);
  if (sessionStorage.IsThisFirstTime_Log_From_LiveServer === "true") {
    for (let i = 0; i < products.length; i++) {
      var product = products[i];
      var key = product._id;
      sessionStorage.setItem(key, 0);
    }
    sessionStorage.IsThisFirstTime_Log_From_LiveServer = false;
    console.log('Nouvelle session');
  } else {
    console.log('Session en cours');
  }
}

ajaxGet("http://localhost:3000/api/teddies", pickUp);
