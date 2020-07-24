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

// Fonction d'envoi des données serveur
function ajaxPost(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader('content-type', 'application/json');
  request.addEventListener("load", function () {
    if (request.status >= 200 && request.status < 400) {
      callback(request.responseText);
      document.location.href="/confirmation.html"
    } else {
      console.error(request.status + " " + request.statusText + " " + url);
    }
  });
  request.addEventListener("error", function () {
    console.error("erreur réseau avec l'url " + url);
  });
  request.send(data);
}