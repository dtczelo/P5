// Récupérationde la reponse du serveur

var serverResponse = JSON.parse(localStorage.getItem('serverResponse'));

// Affichage de la response du serveur ainsi que le montant global

document.getElementById('orderId').textContent = serverResponse.orderId;
document.getElementById('totalOrder').textContent = (localStorage.getItem('totalPrice') / 100) + " €";