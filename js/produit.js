// Variables document HTML
var productElt = document.getElementById("product");

// Récupération de l'id produit
var path = new URL(window.location);
var id = path.searchParams.get("id");

// Fonction créant la structure de la page produit

ajaxGet("http://localhost:3000/api/teddies" + "/" + id)
.then(function (response) {
  var product = JSON.parse(response);

  // Création de la carte produit
  var card = document.createElement("article");
  card.classList.add("card");
  card.classList.add("m-5");
  card.classList.add("shadow");
  productElt.appendChild(card);

  // Création de la photo
  var photo = document.createElement("img");
  photo.src = product.imageUrl;
  photo.classList.add("card-img-top");
  photo.classList.add("rounded");
  card.appendChild(photo);

  // Création corps de carte
  var body = document.createElement("div");
  body.classList.add("card-body");
  card.appendChild(body);

  // Création du titre
  var title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = product.name;
  body.appendChild(title);

  // Création du prix
  var price = document.createElement("p");
  price.textContent = "Prix : " + product.price / 100 + " €";
  body.appendChild(price);

  // Création description
  var description = document.createElement("p");
  description.textContent = product.description;
  body.appendChild(description);

  // Création du formulaire (Choix de couleur)

  var form = document.createElement("form");
  body.appendChild(form);
  var p = document.createElement("p");
  form.appendChild(p);
  var label = document.createElement("label");
  label.setAttribute("for", "color");
  label.textContent = "Couleur disponible :";
  p.appendChild(label);
  var select = document.createElement("select");
  select.classList.add("form-control");
  select.setAttribute("name", "color");
  select.id = "color";
  p.appendChild(select);

  // Création de la première option par défaut

  var optionDefault = document.createElement("option");
  optionDefault.value = "default";
  optionDefault.textContent = "Choisir sa couleur";
  select.appendChild(optionDefault);

  // Boucle parcourant les couleurs disponibles

  for (let i = 0; i < product.colors.length; i++) {
    var color = product.colors[i];
    var option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    select.appendChild(option);
  }

  // Création du lien d'ajout au panier
  var linkBuy = document.createElement("a");
  linkBuy.href = window.location.hash;
  linkBuy.id = product._id;
  linkBuy.classList.add("card-text");
  linkBuy.classList.add("float-right");
  linkBuy.textContent = "Ajouter au panier";
  body.appendChild(linkBuy);

  // Clic sur le bouton d'ajout au panier
  linkBuy.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.getElementById("color").value != "default") {
      if (localStorage.getItem("basket") === null) {
        localStorage.setItem("basket", JSON.stringify([]));
      }
      var basket = JSON.parse(localStorage.getItem("basket"));
      var product = basket.find((product) => product.id == id);
      if (product != undefined) {
        product.qty += 1;
      } else {
        basket.push({ id: id, qty: 1 });
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      window.alert("Article ajouté à votre panier !");
    } else window.alert("Veuilez choisir une couleur");
  });
}).catch(function (error) {
  console.error('Erreur lors de la récupération des données produit, ' + error);
})
