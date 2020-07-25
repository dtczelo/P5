var serverResponse = JSON.parse(localStorage.getItem('serverResponse'));

//

document.getElementById('orderId').textContent = serverResponse.orderId;
document.getElementById('totalOrder').textContent = (localStorage.getItem('totalPrice') / 100) + " €";