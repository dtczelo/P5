// Fonction de récupération des données serveur
const ajaxGet = function (url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject('Statut de la requete : ' + request.status + ", Url : " + url);
        }
      }
    };
    request.open("GET", url, true);
    request.send();
  });
};

const ajaxPost = function (url, data) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status = 201) {
          resolve(request.responseText);
        } else {
          reject('Statut de la requete : ' + request.status + ", Url : " + url);
        }
      }
    }
    request.open("POST", url, true);
    request.setRequestHeader("content-type", "application/json");
    request.send(data);
  })
}
