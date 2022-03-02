generateCardProduct();
deleteEvent();
quantityEvent();

// Modification de la quantité
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
// Suppression d'un produit du panier

function deleteEvent() {
  document.querySelectorAll(".deleteItem").forEach((element, index) => {
    element.addEventListener("click", function (e) {
      let productSavedInLocalStorage = JSON.parse(
        localStorage.getItem("product")
      );

      productSavedInLocalStorage.splice(index, 1);

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
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productSavedInLocalStorage);
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
    document.getElementById("cart__items").innerHTML += template;
  }
}
//////////// Fonction quantité total d'article dans le panier /////

function quantitéDuPanier() {
  productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  let sousQttPanier = [];

  for (let product in productSavedInLocalStorage) {
    sousQttPanier.push(productSavedInLocalStorage[product].quantity);
  }

  let qttPanier = 0;

  for (let qtt in sousQttPanier) {
    qttPanier += parseInt(sousQttPanier[qtt]);

    document.getElementById("totalQuantity").innerHTML = qttPanier;
  }
}

/////////////// Fonction prix total du panier ////////////////

function prixTotalDuPanier() {
  productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));
  let sousTotalPanier = [];
  for (let product in productSavedInLocalStorage) {
    let prixTotalParProduit =
      productSavedInLocalStorage[product].price *
      productSavedInLocalStorage[product].quantity;
    sousTotalPanier.push(prixTotalParProduit);
  }

  let totalPanier = 0;
  for (let sousTotal in sousTotalPanier) {
    totalPanier += sousTotalPanier[sousTotal];
    document.getElementById("totalPrice").innerHTML = totalPanier;
  }
}

////////// Modification et suppression éléments du panier /////////

quantitéDuPanier();
prixTotalDuPanier();
