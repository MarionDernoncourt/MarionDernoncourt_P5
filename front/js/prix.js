let products; // variable dans laquelle on va stocker TOUTES les infos produits (prix inclus)

async function main() {
  await getDetailsProduct();

  generateCardProduct();
  quantityEvent();
  deleteEvent();
  getTotal();
}

main();

// ------- fonction pour récupérer les infos produit via LocalStorage + prix du produit via l'api
async function getDetailsProduct() {
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product")); // donnée LS
  const productsApi = await getProduct(); // données de l'api
  products = [];

  for (let productLS of productSavedInLocalStorage) {
    let detailsProduct = {       
      id: productLS.id,
      name: productLS.name,
      description: productLS.description,
      imageUrl: productLS.imageUrl,
      imageTxt: productLS.altTxt,
      color: productLS.color,
      quantity: productLS.quantity,
      price: productsApi.find((product) => product._id === productLS.id).price, // récupération prix via l'api
    };
    products.push(detailsProduct);
  }
}

function getProduct() {
  // récupération des données de l'api
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      console.log("une erreur est survenue: ", err);
    });
}

// --------  fonction création cartes produits ---------- //
function generateCardProduct() {
  for (let product of products) {
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

// --------  fonction pour calculer quantité et prix total du panier ---------- //
function getTotal() {
  let totalPrice = 0; // prix total panier
  let totalQuantity = 0; // prix total quantité articles

  for (let product of products) {
    totalQuantity += parseInt(product.quantity);
    totalPrice += product.price * product.quantity;
  }
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

// -------- Modification de la quantité via le bouton QTT  ---------- //
function quantityEvent() {
  document.querySelectorAll(".itemQuantity").forEach((element, index) => {
    element.addEventListener("change", function (e) {
      if (e.target.value < 0) {
        // si l'utilisateur entre manuellement une qtt inférieur à 0 --> afficher 0
        e.target.value = 0;
      }
      if (e.target.value > 100) {
        // si l'utilisateur entre manuellement une qtt supérieur à 100 --> afficher 100
        e.target.value = 100;
      }
      products[index].quantity = e.target.value; // récupération de la donnée via l'évent et mise à jour de la qtt dans products
      getTotal();
    });
  });
}

// --------  Suppression d'un produit du panier ---------- //
function deleteEvent() {
  document.querySelectorAll(".deleteItem").forEach((element, index) => {
    element.addEventListener("click", function (e) {
      products.splice(index, 1); // supprime l'element du tableau products via l'index
      document.getElementById("cart__items").innerHTML = "";
      saveToLS();
      generateCardProduct();
      quantityEvent();
      deleteEvent();
      getTotal();
    });
  });
}

// --------  sauvegarde du panier modifié (sans le prix) dans le LS --- //
function saveToLS() {
  const newProductsLS = [];
  for (let product of products) {
    let newProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      imageTxt: product.altTxt,
      color: product.color,
      quantity: product.quantity,
    };
    newProductsLS.push(newProduct);
  }
  localStorage.setItem("product", JSON.stringify(newProductsLS));
}
