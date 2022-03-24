/////// Récupération id du produit /////////
const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");

///////////////////// Récupération des données produits ////////////////////
async function main() {
  const product = await getProduct();
  ///// Add product image /////
  let imageProduct = document.createElement("img");
  imageProduct.src = product.imageUrl;
  imageProduct.alt = product.altTxt;
  document.getElementsByClassName("item__img")[0].appendChild(imageProduct);

  ///// Add product name /////
  let nameProduct = document.getElementById("title");
  nameProduct.innerHTML = product.name;

  ///// Add product description /////
  let descriptionProduct = document.getElementById("description");
  descriptionProduct.innerHTML = product.description;

  ///// Add product price /////
  let priceProduct = document.getElementById("price");
  priceProduct.innerHTML = product.price;

  /////Pick color //////

  for (let colors of product.colors) {
    let colorOption = document.createElement("option");
    document.getElementById("colors").appendChild(colorOption);
    colorOption.value = colors;
    colorOption.innerHTML = colors;
  }
}
////// Récupération des données de l'API /////
function getProduct() {
  return fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      console.log("une erreur est survenue", err);
    });
}

////////////////////////////////////// Ajout au panier ///////////////////////////////////////////
async function addToCart() {
  /// ajout de l'événement
  const product = await getProduct();

  document.getElementById("addToCart").addEventListener("click", (event) => {
    event.preventDefault();

    const colorSelect = document.getElementById("colors"); // sélection de l'element Couleur
    const quantitySelect = document.getElementById("quantity"); // sélection de l'element Quantité
    let validColor = false;
    let validQuantity = false;

    if (colorSelect.value) {
      validColor = true; // si une couleur est sélectionnée on change la variable pour true
    } else {
      colorSelect.style.backgroundColor = "#fbbcbc"; // si pas de couleur sélectionnée variable reste false
    }
    if (quantitySelect.value > 0 && quantitySelect.value < 100) {
      validQuantity = true; // si la quantité est > 0 on change la variable pour true
    } else {
      quantitySelect.style.backgroundColor = "#fbbcbc"; // si la quantité = 0 variable reste false
    }

    if (validColor && validQuantity) {
      // si validColor et validQuantity true
      addLocalStorage(product);
      window.location.href = "index.html"; // renvoie vers la page d'accueil
    }
  });
}

////////////////////////////////////// Fonction pour l'ajout au local storage ///////////////////////////////////////////
function addLocalStorage(product) {
  // récupération des données du produit sélectionné //
  let SelectedProduct = {
    id: product._id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    imageTxt: product.altTxt,
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };

  //////////////////// Save to local storage ////////////////////////
  let productSavedInLocalStorage = JSON.parse(localStorage.getItem("product"));

  // quand il y a deja des produits dans le panier
  if (productSavedInLocalStorage) {
    //  -- si un des produit est identique dans le panier
    let indexMatch = productSavedInLocalStorage.findIndex(
      (product) =>
        product.id === SelectedProduct.id &&
        product.color === SelectedProduct.color
    );
    if (indexMatch === -1) {
      // aucun produit est identique
      productSavedInLocalStorage.push(SelectedProduct);
    } else {
      // sinon ajoute la nouvelle quantité à la quantité sauvegardée dans le LS
      let newQtt =
        parseInt(productSavedInLocalStorage[indexMatch].quantity) +
        parseInt(SelectedProduct.quantity);

      productSavedInLocalStorage[indexMatch].quantity = newQtt.toString();
    }
    localStorage.setItem("product", JSON.stringify(productSavedInLocalStorage));
  } else {
    // quand aucun produit saved dans le panier //
    productSavedInLocalStorage = [];
    productSavedInLocalStorage.push(SelectedProduct);
    localStorage.setItem("product", JSON.stringify(productSavedInLocalStorage));
  }
}

main();
addToCart();
