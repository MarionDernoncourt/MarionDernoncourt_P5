// Modification de la quantité quand on clique sur le bouton quantité
function quantityEvent() {
  document.querySelectorAll(".itemQuantity").forEach((element, index) => {
    element.addEventListener("change", function (e) {
      let productSavedInLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );

      productSavedInLocalStorage[index].quantity = e.target.value;
      localStorage.setItem(
        "product",
        JSON.stringify(productSavedInLocalStorage)
      );

      quantitéDuPanier();
      prixTotalDuPanier();
    });
  });
}

// Suppression d'un produit du panier quand on clique sur le bouton supprimer
function deleteEvent() {
  document.querySelectorAll(".deleteItem").forEach((element, index) => {
    element.addEventListener("click", function (e) {
      let productSavedInLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );

      productSavedInLocalStorage.splice(index, 1); // supprime l'element du tableau

      localStorage.setItem(
        "product",
        JSON.stringify(productSavedInLocalStorage)
      );

      document.getElementById("cart__items").innerHTML = "";
      generateCardProduct();
      deleteEvent();
      quantityEvent();
      quantitéDuPanier();
      prixTotalDuPanier();
    });
  });
}

// création carte produit //
function generateCardProduct() {
  // Récuperation des données sur le LocalStorage
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  // création template carte du produit
  for (let product of productSavedInLocalStorage) {
    let template = `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                  <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.imageTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${product.color}</p>
                      <p>${product.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
                        `;
    document.getElementById("cart__items").innerHTML += template; // ajout du template au dom
  }
}

//////////// Fonction quantité total d'article dans le panier /////
function quantitéDuPanier() {
  productSavedInLocalStorage = JSON.parse(localStorage.getItem("product")); // récupération du LS
  let sousQttPanier = []; // quantité de produit différents
  for (let product in productSavedInLocalStorage) {
    sousQttPanier.push(productSavedInLocalStorage[product].quantity);
  }

  let qttPanier = 0; // quantité de produit total
  for (let qtt in sousQttPanier) {
    qttPanier += parseInt(sousQttPanier[qtt]);
  }
  document.getElementById("totalQuantity").innerHTML = qttPanier;
  console.log(qttPanier);
}

/////////////// Fonction prix total du panier ////////////////

function prixTotalDuPanier() {
  productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  let sousTotalPanier = []; // prix pour un produit selon sa quantité
  for (let product in productSavedInLocalStorage) {
    let prixTotalParProduit =
      productSavedInLocalStorage[product].price *
      productSavedInLocalStorage[product].quantity;
    sousTotalPanier.push(prixTotalParProduit);
  }

  let totalPanier = 0; // prix total de tous les produits
  for (let sousTotal in sousTotalPanier) {
    totalPanier += sousTotalPanier[sousTotal];
  }
  document.getElementById("totalPrice").innerHTML = totalPanier;
}

generateCardProduct();
deleteEvent();
quantityEvent();
quantitéDuPanier();
prixTotalDuPanier();
