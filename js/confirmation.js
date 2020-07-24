var serverResponse = JSON.parse(sessionStorage.getItem('serverResponse'));

//

document.getElementById('orderId').textContent = serverResponse.orderId;
document.getElementById('totalOrder').textContent = (sessionStorage.getItem('totalPrice') / 100) + " €";